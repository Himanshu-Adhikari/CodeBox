import { db } from "@/config/db";
import { Enrolled_Course} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req:NextResponse){
    const {courseId}=await req.json();
    const user=await currentUser();
    const result=await db.insert(Enrolled_Course)
    .values({
        courseId:courseId??0,
        userId:user?.primaryEmailAddress?.emailAddress??'',
        xpEarned:0,
    }).returning()
    return NextResponse.json(result)
}