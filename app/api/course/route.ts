import { db } from "@/config/db";
import { CourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm"; 

export async function GET(req: NextRequest) {
    //Fetch all Courses 
    const result=await db.select().from(CourseTable);

    
    return NextResponse.json(result);
}
