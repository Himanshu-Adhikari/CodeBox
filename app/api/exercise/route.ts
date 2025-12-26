import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { CourseChapterTable,ExerciseCompleted, ExerciseTable } from "@/config/schema";
import { eq ,and} from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:NextRequest){
    const {courseId,chapterId,exerciseId}=await req.json();

    const course_result=await db.select()
    .from(CourseChapterTable).where(and(eq(CourseChapterTable?.courseId,courseId),
    eq(CourseChapterTable?.chapterId,chapterId)))
    const user=await currentUser();
    const exercisedata=await db.select()
    .from(ExerciseTable)
    .where(and(eq(courseId,ExerciseTable?.courseId),eq(exerciseId,ExerciseTable?.exerciseId)))

    //Completed Exercise in that Course
    const completedExercise=await db.select()
    .from(ExerciseCompleted)
    .where(and(eq( ExerciseCompleted?.userId,user?.primaryEmailAddress?.emailAddress ?? "")
    ,eq(ExerciseCompleted?.chapterId,chapterId),eq(ExerciseCompleted?.chapterId,chapterId)))

    return NextResponse.json({
        ...course_result[0],
        exercisedata:exercisedata[0],
        completedExercise:completedExercise
    })
}