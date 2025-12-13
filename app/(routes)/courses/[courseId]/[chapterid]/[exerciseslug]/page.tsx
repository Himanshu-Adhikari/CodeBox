"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-splitter-layout/lib/index.css";
import { useParams } from "next/navigation";
import axios from "axios";
import { exercise } from "../../../_components/CourseList";
import ContentSection from "./_components/ContentSection";

const SplitterLayout = dynamic(() => import("react-splitter-layout"), {
  ssr: false,
});
type ExerciseContent={
  content:string;
  hint:string;
  hintXp:number;
  starterCode:any;
  task:string;
}
type ExerciseData={
  courseId:number;
  chapterId:number;
  exerciseId:string;
  exerciseName:string;
  exerciseContent:ExerciseContent;
}

export type CourseExercise={
  courseId:number;
  chapterId:number;
  desc:string;
  name:string;
  exercises:exercise[];
  exercisedata:ExerciseData;
}

const SLuggggg = () => {
    const {courseId,chapterid,exerciseslug}=useParams();
    const [loading,setloading]=useState(false);
    const [courseExerciseData,setcourseExerciseData]=useState<CourseExercise>();
    useEffect(()=>{
      get_exercise_course_detail();
    },[])
    const get_exercise_course_detail=async ()=>{
      setloading(true)
      const result=await axios.post('/api/exercise',{
        courseId:courseId,chapterId:chapterid,exerciseId:exerciseslug
      })
      console.log(result.data)
      setcourseExerciseData(result.data)
      setloading(false)
    }
  return (
  <div className="border-t-4 h-screen"> {/* Add h-screen or fixed height */}
    <SplitterLayout 
      percentage 
      primaryMinSize={30} 
      secondaryMinSize={50}
      customClassName="h-full" /* Add this */
    >
        <div className="rounded-tr-3x mr-1">
          <ContentSection courseExerciseData={courseExerciseData} loading={loading}/>
        </div>
        <div className="rounded-tl-3xl">Code Editor</div>
      </SplitterLayout>
    </div>
  );
};

export default SLuggggg;
