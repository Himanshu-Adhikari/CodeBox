import { db } from "@/config/db";
import { CourseChapterTable, CourseTable, Enrolled_Course ,ExerciseCompleted } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { asc, eq ,and, desc} from "drizzle-orm";
import { NextResponse } from "next/server";

// Cache API response for 1 hour
export const revalidate = 3600;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseid");
    const user=await currentUser();
    if (courseId) {
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
      const chaptersResult=await db
      .select()
      .from(CourseChapterTable)
      .where(eq(CourseChapterTable.courseId, courseIdNum))
      .orderBy(asc(CourseChapterTable.chapterId));
      const email = user?.primaryEmailAddress?.emailAddress ?? "";;

      const enrolled_course=await db.select()
      .from(Enrolled_Course)
      .where(and(
        eq(Enrolled_Course.courseId, courseIdNum),
        eq(Enrolled_Course.userId, email)
      ))
      const exercises_complete=await db.select().
      from(ExerciseCompleted)
      .where(and(
        eq(ExerciseCompleted.courseId,courseIdNum),
        eq(ExerciseCompleted.userId ,user?.primaryEmailAddress?.emailAddress ?? "")
      ))
      .orderBy(desc(ExerciseCompleted?.courseId),desc(ExerciseCompleted?.exerciseId))
      const is_enrolled_course=enrolled_course.length  > 0;
        return NextResponse.json({
          ...result[0] ?? null,
          chapters:chaptersResult ?? null,
        user_enrolled:is_enrolled_course,
        course_enrolled_info:enrolled_course[0],
        exercises_complete:exercises_complete
      });
      
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
