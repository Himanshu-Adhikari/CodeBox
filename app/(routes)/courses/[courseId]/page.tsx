"use client";

import { useParams } from "next/navigation";
import CourseDetailBanner from "./_components/CourseDetailBanner";
import CourseChapters from "./_components/CourseChapters";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { get, set } from "idb-keyval";
import { Course } from "../_components/CourseList";
import CourseStatus from "./_components/CourseStatus";
import UpgradeSub from "../../dashboard/_components/UpgradeSub";
import CommunityHelpSecition from "./_components/CommunityHelpSecition";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hasFetchedRef = useRef(false); // prevents double calls in React Strict Mode

  useEffect(() => {
    if (!courseId) return;

    // 🚫 Prevent double API calls
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    loadCachedCourseDetail(courseId as string);        // ✨ immediate UI load
    if(!courseDetail)fetchFreshCourseDetail(courseId as string);        // 🔄 background refresh
  }, [courseId]);

  // 1️⃣ Load cached detail from IndexedDB (instant UI)
  const loadCachedCourseDetail = async (id: string) => {
    const cached = await get(`course-detail-${id}`);

    if (cached) {
      setCourseDetail(cached);
      // console.log("cached one:", cached);

      // ✅ show cached data immediately (no loading)
      setIsLoading(false);
    }
  };

  // 2️⃣ Fetch fresh API data (background update)
  const fetchFreshCourseDetail = async (id: string) => {
    try {
      const result = await axios.get(`/api/course/?courseid=${id}`);

      console.log("fresh:", result.data);
      setCourseDetail(result.data);

      // update IndexedDB
      set(`course-detail-${id}`, result.data);

    } catch (err) {
      console.error("Failed to fetch course detail:", err);
    } finally {
      // Only hide loading if cached didn't already do it
      setIsLoading(false);
    }
  };

  if (isLoading || !courseDetail) {
    return (
      <div className="font-game text-center p-8">
        Loading course details...
      </div>
    );
  }

  return (
    <div>
      <CourseDetailBanner 
        loading={isLoading}
        courseDetail={courseDetail}
      />
      <div className="grid grid-cols-3 p-10 md:px-24 lg:px-36 gap-7">
        <div className="col-span-2">
      <CourseChapters loading={isLoading}
        courseDetail={courseDetail}/></div>
        <div >
          <CourseStatus courseDetail={courseDetail}/>
          <UpgradeSub/>
          <CommunityHelpSecition/>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
