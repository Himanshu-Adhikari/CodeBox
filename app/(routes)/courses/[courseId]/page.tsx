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
import CommunityHelpSection from "./_components/CommunityHelpSection";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!courseId) return;
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    
    loadCachedCourseDetail(courseId as string);
    fetchFreshCourseDetail(courseId as string);
  }, [courseId]);

  // 1️⃣ Load cached detail from IndexedDB (instant UI)
  const loadCachedCourseDetail = async (id: string) => {
    const cached = await get(`course-detail-${id}`);

    if (cached) {
      setCourseDetail(cached);
      setIsLoading(false);
    }
  };

  // 2️⃣ Fetch fresh API data (background update)
  const fetchFreshCourseDetail = async (id: string, skipCache = false) => {
    try {
      const result = await axios.get(`/api/course/?courseid=${id}`);

      // console.log("fresh:", result.data);
      
      // ✅ Update state immediately
      setCourseDetail(result.data);

      // Update IndexedDB only if not skipping cache
      if (!skipCache) {
        await set(`course-detail-${id}`, result.data);
      }

    } catch (err) {
      console.error("Failed to fetch course detail:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 3️⃣ Refresh after enrollment - fetch and update state
  const handleRefreshAfterEnroll = async (): Promise<void> => {
    if (!courseId) return;
    
    try {
      // 🔄 Fetch fresh data and update cache
      const result = await axios.get(`/api/course/?courseid=${courseId}`);
      
      console.log("Refreshed after enroll:", result.data);
      
      // ✅ Immediately update state - this triggers re-render
      setCourseDetail(result.data);
      
      // Update cache in background
      await set(`course-detail-${courseId}`, result.data);
    } catch (err) {
      console.error("Failed to refresh after enrollment:", err);
      throw err; // Re-throw so banner can handle error
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
        refreshData={handleRefreshAfterEnroll}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 p-10 md:px-24 lg:px-36 gap-7">
        <div className="lg:col-span-2">
          <CourseChapters 
            loading={isLoading}
            courseDetail={courseDetail}
          />
        </div>
        <div>
          <CourseStatus courseDetail={courseDetail}/>
          <UpgradeSub/>
          <CommunityHelpSection/>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;