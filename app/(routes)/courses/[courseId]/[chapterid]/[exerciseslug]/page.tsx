"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-splitter-layout/lib/index.css";
import { useParams } from "next/navigation";
import axios from "axios";
import { CompletedExercise, exercise } from "../../../_components/CourseList";
import ContentSection from "./_components/ContentSection";
import CodeEditor from "./_components/CodeEditor";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SplitterLayout = dynamic(() => import("react-splitter-layout"), {
  ssr: false,
});
type ExerciseContent = {
  content: string;
  hint: string;
  hintXp: number;
  starterCode: any;
  task: string;
};
type ExerciseData = {
  courseId: number;
  chapterId: number;
  exerciseId: string;
  exerciseName: string;
  exerciseContent: ExerciseContent;
};

export type CourseExercise = {
  courseId: number;
  chapterId: number;
  desc: string;
  name: string;
  exercises: exercise[];
  exercisedata: ExerciseData;
  completedExercise: CompletedExercise[];
};

const SLuggggg = () => {
  const { courseId, chapterid, exerciseslug } = useParams();
  const [loading, setloading] = useState(false);
  const [exerciseinfo, setexerciseinfo] = useState<exercise>();
  const [nextbuttonRoute, setnextbuttonRoute] = useState<string>();
  const [prevbuttonRoute, setprevbuttonRoute] = useState<string>();

  const [courseExerciseData, setcourseExerciseData] =
    useState<CourseExercise>();
  useEffect(() => {
    get_exercise_course_detail();
  }, []);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const get_exercise_course_detail = async () => {
    setloading(true);
    const result = await axios.post("/api/exercise", {
      courseId: courseId,
      chapterId: chapterid,
      exerciseId: exerciseslug,
    });
    // console.log(result.data);
    setcourseExerciseData(result.data);
    setloading(false);
  };

  useEffect(() => {
    courseExerciseData && GetExerciseDetail();
  }, [courseExerciseData]);
  useEffect(() => {
    if (!courseExerciseData) return;
    GetPrevNextButtonRoute();
  }, [courseExerciseData, exerciseslug]);

  const GetExerciseDetail = () => {
    // console.log(exerciseslug)
    const exerciseinfo = courseExerciseData?.exercises?.find(
      (item) => item?.slug === exerciseslug
    );

    setexerciseinfo(exerciseinfo);
    // console.log(exerciseinfo)
  };

  const GetPrevNextButtonRoute = () => {
    if (!courseExerciseData?.exercises) return;

    const index = courseExerciseData.exercises.findIndex(
      (item) => item.slug === exerciseslug
    );
    if (index === -1) return;

    const next = courseExerciseData.exercises[index + 1]?.slug;
    const prev = courseExerciseData.exercises[index - 1]?.slug;
    setnextbuttonRoute(
      next ? "/courses/" + courseId + "/" + chapterid + "/" + next : undefined
    );
    setprevbuttonRoute(
      prev ? `/courses/${courseId}/${chapterid}/${prev}` : undefined
    );
    console.log("index:", index);
  };
  return (
    <div className="border-t-4 h-screen">
      {" "}
      {/* Add h-screen or fixed height */}
      <SplitterLayout
        percentage
        primaryMinSize={30}
        secondaryMinSize={50}
        customClassName="h-full" /* Add this */
      >
        <div className="rounded-tr-3x mr-1">
          <ContentSection
            courseExerciseData={courseExerciseData}
            loading={loading}
          />
        </div>
        <div className="rounded-tl-3xl">
          <CodeEditor
            courseExerciseData={courseExerciseData}
            loading={loading}
          />
        </div>
      </SplitterLayout>
      <div className="bottom-0 fixed font-game  bg-slate-900 w-full flex p-4 py-2 justify-between items-center">
        <Link href={prevbuttonRoute ?? "/courses/" + courseId}>
          <Button variant={"pixel"} className="text-xl">
            Prev
          </Button>
        </Link>
        <div className="flex gap-3 items-center">
          <Image src={"/star.gif"} height={40} width={40} alt="star" />
          <h1 className="mt-1.5 text-2xl">
            You can earn{" "}
            <span className="text-amber-300 text-4xl">{exerciseinfo?.xp}</span>{" "}
            xp
          </h1>
        </div>
        <Link href={nextbuttonRoute ?? "/courses/" + courseId}>
          <Button variant={"pixel"} className="text-xl">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SLuggggg;
