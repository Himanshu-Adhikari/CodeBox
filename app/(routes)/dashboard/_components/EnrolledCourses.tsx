"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import CourseProgressCard from "./CourseProgressCard";


export type EnrolledCourseInfo = {
  courseId: number;
  title: string;
  bannerImage: string;
  totalExercises: number;
  completedExercises: number;
  xpEarned: number;
  level: string;
};

const EnrolledCourses = () => {
  const [enrolledCourses, setenrolledCourses] = useState<EnrolledCourseInfo[]>();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    UserEnrolledCourse();
  }, []);
  const UserEnrolledCourse = async () => {
    setloading(true);
    const result = await axios.get("/api/course?courseId=enrolled");
    console.log(result?.data);
    setenrolledCourses(result?.data);
    setloading(false);
  };
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-game p-3 mb-3">Your Enrolled Courses</h1>
      {loading? <Skeleton className="w-full rounded-2xl my-5 h-52 m-5" />:
      enrolledCourses?.length == 0 ? (
        <div className="flex flex-col gap-3 items-center p-8 rounded-tr-none border rounded-2xl bg-zinc-800">
          <Image src={"/book.gif"} alt="books" width={90} height={90} />
          <h2 className="font-game text-xl">
            You Don't have any enrolled Courses..
          </h2>
          <Link href={"/courses"}>
            <Button
              variant={"pixel"}
              size={"lg"}
              className="font-game text-3xl "
            >
              Browse all courses{" "}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5"> 
          {enrolledCourses?.map((course,index)=>{
            return (
              <div key={index}>
                  <CourseProgressCard course={course}/>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
