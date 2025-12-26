import { db } from "@/config/db";
import {
  CourseChapterTable,
  CourseTable,
  Enrolled_Course,
  ExerciseCompleted,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { asc, eq, and, desc, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

// Cache API response for 1 hour
export const revalidate = 3600;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId =
      searchParams.get("courseId") ?? searchParams.get("courseid");
    const user = await currentUser();
    if (courseId && courseId != "enrolled") {
      const courseIdNum = Number(courseId);
      if (isNaN(courseIdNum)) {
        return NextResponse.json(
          { error: "Invalid course ID" },
          { status: 400 }
        );
      }

      const result = await db
        .select()
        .from(CourseTable)
        .where(eq(CourseTable.courseId, courseIdNum));

      if (result.length === 0) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }
      const chaptersResult = await db
        .select()
        .from(CourseChapterTable)
        .where(eq(CourseChapterTable.courseId, courseIdNum))
        .orderBy(asc(CourseChapterTable.chapterId));
      const email = user?.primaryEmailAddress?.emailAddress ?? "";

      const enrolled_course = await db
        .select()
        .from(Enrolled_Course)
        .where(
          and(
            eq(Enrolled_Course.courseId, courseIdNum),
            eq(Enrolled_Course.userId, email)
          )
        );
      const exercises_complete = await db
        .select()
        .from(ExerciseCompleted)
        .where(
          and(
            eq(ExerciseCompleted.courseId, courseIdNum),
            eq(
              ExerciseCompleted.userId,
              user?.primaryEmailAddress?.emailAddress ?? ""
            )
          )
        )
        .orderBy(
          desc(ExerciseCompleted?.courseId),
          desc(ExerciseCompleted?.exerciseId)
        );
      const is_enrolled_course = enrolled_course.length > 0;
      return NextResponse.json({
        ...(result[0] ?? null),
        chapters: chaptersResult ?? null,
        user_enrolled: is_enrolled_course,
        course_enrolled_info: enrolled_course[0],
        exercises_complete: exercises_complete,
      });
    } else if (courseId && courseId == "enrolled") {
      const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";
      // 1️⃣ Fetch all enrolled courses for the user
      const enrolledCourses = await db
        .select()
        .from(Enrolled_Course)
        .where(eq(Enrolled_Course?.userId, userEmail));

      if (enrolledCourses.length === 0) {
        return NextResponse.json([]);
      }

      // Extract courseIds
      const courseIds = enrolledCourses.map((c) => c.courseId);

      // 2️⃣ Fetch all course details in one go
      const courses = await db
        .select()
        .from(CourseTable)
        //@ts-ignore
        .where(inArray(CourseTable.courseId, courseIds));

      // 3️⃣ Fetch chapters for all courses
      const chapters = await db
        .select()
        .from(CourseChapterTable)
        //@ts-ignore
        .where(inArray(CourseChapterTable.courseId, courseIds))
        .orderBy(asc(CourseChapterTable.chapterId));

      // 4️⃣ Fetch completed exercises for all courses
      const completed = await db
        .select()
        .from(ExerciseCompleted)
        //@ts-ignore
        .where(
          and(
            inArray(ExerciseCompleted.courseId, courseIds),
            eq(ExerciseCompleted.userId, userEmail)
          )
        )
        .orderBy(
          desc(ExerciseCompleted.courseId),
          desc(ExerciseCompleted.exerciseId)
        );

      const finalResult = courses.map((course) => {
        const courseEnrollInfo = enrolledCourses.find(
          (e) => e.courseId === course.courseId
        );

        return {
          ...course,
          chapters: chapters.filter((ch) => ch.courseId === course.courseId),
          completedExercises: completed.filter(
            (cx) => cx.courseId === course.courseId
          ),
          courseEnrolledInfo: courseEnrollInfo,
          userEnrolled: true,
        };
      });

      // ⭐ Format output
      const formattedResult = finalResult.map((item) => {
        // Count total exercises by summing exercises arrays in all chapters
        const totalExercises = item.chapters.reduce((acc, chapter) => {
          // If exercises is stored as JSON/array
          const exercisesCount = Array.isArray(chapter.exercises)
            ? chapter.exercises.length
            : 0;
          return acc + exercisesCount;
        }, 0);

        const completedExercises = item.completedExercises.length;

        return {
          courseId: item.courseId,
          title: item.title,
          bannerImage: item?.bannerImage,
          totalExercises,
          completedExercises,
          xpEarned: item.courseEnrolledInfo?.xpEarned || 0,
          level: item.level,
        };
      });

      return NextResponse.json(formattedResult);
    }
    // ⬇️ ELSE CASE CORRECTLY PLACED
    const result = await db
      .select()
      .from(CourseTable)
      .orderBy(asc(CourseTable.courseId));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
