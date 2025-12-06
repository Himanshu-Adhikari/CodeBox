"use-client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChartNoAxesColumn, ChartNoAxesColumnIncreasingIcon } from "lucide-react";
type Course = {
  id: number;
  courseId: number;
  title: string;
  desc: string;
  bannerImage: string;
  level: string;
  tags: string;
};


const CourseList = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);

  useEffect(() => {
    GetAllCourses();
  }, []);

  const GetAllCourses = async () => {
    try {
      const result = await axios.get("/api/course");
      console.log(result.data);
      setCourseList(result.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  return (
    <div className="grid mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 ml-3 mr-3">
       {courseList?.map((course,index) => (
            <div key={course?.id} className="border-4 rounded-3xl hover:bg-slate-800 cursor-pointer">
              <Image src={course?.bannerImage} height={400} width={400} alt={course?.title}
              className="w-full h-[200px] object-cover rounded-t-lg"/>
              <div className="p-3">
              <h2 className="text-2xl font-game">{course?.title}</h2>
              <p className="font-game text-xl text-slate-300 line-clamp-2">{course?.desc}</p>
              <h2 className="bg-zinc-800 font-game 
              px-4 mt-3 flex gap-2 w-fit items-center rounded-2xl p-2 ">
                <ChartNoAxesColumnIncreasingIcon/>
                {course?.level}
              </h2>
              </div>
            </div>
          ))}
        
    </div>
  );
};

export default CourseList;
