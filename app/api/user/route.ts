import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";   // ✅ FIX 1 (MISSING IMPORT)

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "No user" }, { status: 401 });

  // Clerk's correct way to get primary email
  const primaryEmail = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;  

  if (!primaryEmail)
    return NextResponse.json({ error: "User has no email" }, { status: 400 });

  // Check if user already exists
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, primaryEmail));  // SAFE

  // Create user in DB if not exists
  if (users.length === 0) {
    const newUser = {
      name: user.fullName ?? "",
      email: primaryEmail,
      points: 0,
    };

    const result = await db.insert(usersTable).values(newUser).returning();
    return NextResponse.json(result[0]);
  }

  return NextResponse.json(users[0]);
}
