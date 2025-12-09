import { db } from "@/config/db";
import { CourseChapterTable, CourseTable } from "@/config/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Cache API response for 1 hour
export const revalidate = 3600;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseid");

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

      return NextResponse.json({...result[0] ?? null
        ,
        chapters:chaptersResult ?? null
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
