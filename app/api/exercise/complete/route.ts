import {
  Enrolled_Course,
  ExerciseCompleted,
  usersTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { eq, and, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .insert(ExerciseCompleted)
    .values({
      userId: user?.primaryEmailAddress?.emailAddress ?? "",
      courseId: Number(body.courseId),
      chapterId: Number(body.chapterId),
      exerciseId: Number(body.exerciseId),
    })
    .returning();

  //Course XP updation
  await db
    .update(Enrolled_Course)
    .set({
      xpEarned: sql`${Enrolled_Course.xpEarned} + ${body.xpEarned}`,
    })
    .where(
      and(
        eq(Enrolled_Course.userId, user?.primaryEmailAddress?.emailAddress ?? ""),
        eq(Enrolled_Course.courseId, Number(body.courseId))
      )
    );
  //user xp earned
  await db
    .update(usersTable)
    .set({ points: sql`${usersTable?.points} + ${body?.xpEarned}` })
    .where(
      eq(usersTable?.email, user?.primaryEmailAddress?.emailAddress ?? "")
    );

  return NextResponse.json(result);
}
