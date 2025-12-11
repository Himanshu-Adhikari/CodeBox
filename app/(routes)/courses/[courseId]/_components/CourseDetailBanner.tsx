"use client";

import { Course } from "../../_components/CourseList";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  loading: boolean;
  courseDetail: Course;
  refreshData: () => Promise<void>;
};

const CourseDetailBanner = ({ loading, courseDetail, refreshData }: Props) => {
  const [enrollLoader, setEnrollLoader] = useState(false);
  
  const enrollCourse = async () => {
    try {
      setEnrollLoader(true);
      
      await axios.post("/api/enroll-course", {
        courseId: courseDetail?.courseId,
      });
      
      // ✅ Wait for refresh to complete before showing success
      await refreshData();
      
      toast.success("Course Enrolled!");
      
    } catch (err) {
      toast.error("Failed to enroll");
      console.error("Enrollment error:", err);
    } finally {
      setEnrollLoader(false);
    }
  };

  return (
    <div className="p-5">
      <div className="
        flex flex-col gap-6 
        border-4 p-6 rounded-3xl bg-slate-900 font-game
        md:flex-row md:items-center
      ">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={courseDetail?.bannerImage || "/placeholder.jpg"}
            alt={courseDetail?.title}
            width={600}
            height={400}
            className="
              w-full max-w-[600px] rounded-3xl object-cover
              h-[220px] sm:h-[280px] md:h-[350px] lg:h-[420px]
            "
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            {courseDetail?.title}
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed">
            {courseDetail?.desc}
          </p>

          <div className="mt-2">
            {courseDetail?.chapters.length>0 ?(
            !(courseDetail?.user_enrolled) ? (
              <Button
                variant="pixel"
                size="lg"
                disabled={enrollLoader}
                onClick={enrollCourse}
                className="text-xl sm:text-2xl"
              >
                {enrollLoader ? "Enrolling..." : "Enroll now"}
              </Button>
            ) : (
              <Button 
                variant="pixel" 
                size="lg"
                className="text-xl sm:text-2xl"
              >
                Continue Learning...
              </Button>
            )):(<></>)}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetailBanner;