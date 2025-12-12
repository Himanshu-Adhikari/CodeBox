"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import { get, set } from "idb-keyval";
import Link from "next/link";
type exercise={
  difficulty:string;
  name:string;
  slug:string;
  xp:number;
}
type Chapters={
  chapterId:number;
  courseId: number;
  desc: string;
  name:string;
  id:number;
  exercises:exercise[];
}
type CourseEnrolledInfo={
  xpEarned:number;
  enrolled_date:any;
}
type CompletedExercise={
  chapterId:number;
  courseId:number;
  exerciseId:number;
}
export type Course = {
  id: number;
  courseId: number;
  title: string;
  desc: string;
  bannerImage: string;
  level: string;
  tags: string;
  chapters:Chapters[];
  user_enrolled?:boolean;
  course_enrolled_info?:CourseEnrolledInfo;
  exercises_complete?:CompletedExercise[];
};

const CourseList = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCachedCourses();
    fetchFreshCourses();
  }, []);

  // 1️⃣ Load from IndexedDB instantly (secure cache)
  const loadCachedCourses = async () => {
    const cached = await get("courses");

    if (cached) {
      setCourseList(cached);
      setIsLoading(false); // no loading flash
    }
  };

  // 2️⃣ Fetch fresh data & update UI + cache
  const fetchFreshCourses = async () => {
    try {
      const result = await axios.get("/api/course");

      setCourseList(result.data);
      set("courses", result.data); // update cache
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="font-game text-center p-8">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="grid mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 ml-3 mr-3">
      {courseList?.map((course) => (
        <Link href={'/courses/'+course?.courseId} key={course.id}>
        <div
          
          className="border-4 rounded-3xl hover:bg-slate-800 cursor-pointer"
          >
          <Image
            src={course.bannerImage}
            height={400}
            width={400}
            alt={course.title}
            className="w-full h-[200px] object-cover rounded-t-lg"
            />
          <div className="p-3">
            <h2 className="text-2xl font-game">{course.title}</h2>
            <p className="font-game text-xl text-slate-300 line-clamp-2">
              {course.desc}
            </p>
            <h2 className="bg-zinc-800 font-game px-4 mt-3 flex gap-2 w-fit items-center rounded-2xl p-2">
              <ChartNoAxesColumnIncreasingIcon />
              {course.level}
            </h2>
          </div>
        </div>
          </Link>
      ))}
    </div>
  );
};

export default CourseList;
