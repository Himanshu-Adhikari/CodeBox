"use client"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { Course } from "../../_components/CourseList";
import { useEffect, useState } from "react";
type Props = {
  courseDetail: Course | undefined;
};
const CourseStatus = ({courseDetail}:Props) => {

    const [cnts, set_cnt] = useState<{
        Total_exercise:number,
        Total_xp:number
    }>();
    const update_progress=(val:number,tot_val:number)=>{
        if(val && tot_val){
            return (val*100)/tot_val;
        }
        return 0
    }
    const total_Count_Cal=()=>{
            let total_exercises_cnt=0;
            let total_xp_cnt=0;

            courseDetail?.chapters?.forEach((chapter)=>{
                total_exercises_cnt += chapter.exercises?.length ?? 0
                chapter.exercises?.forEach((exc) => {
                    total_xp_cnt += exc.xp ?? 0
                    }) 
            })
            set_cnt({
                Total_exercise:total_exercises_cnt,
                Total_xp:total_xp_cnt,
            })
        }
    useEffect(()=>{
        courseDetail && total_Count_Cal()
    },[courseDetail])    
    
  return (
    <div className="font-game p-4 border-4 rounded-xl w-full">
        <h2 className="text-3xl">Course Progress</h2>
        <div className="flex items-center gap-5 mt-4">
            <Image src={'/book_mc.gif'} height={50} width={50} alt="minecraft_book"></Image>
            <div className="w-full">
                <h2 className="flex justify-between text-2xl">
                    Exercise
                <span className="text-gray-300">1/{cnts?.Total_exercise}</span>
                    </h2>
                <Progress value={37} className="mt-2"/>
            </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
            <Image src={'/star.gif'} height={50} width={50} alt="minecraft_book"></Image>
            <div className="w-full">
                <h2 className="flex justify-between text-2xl">
                    XP Earned
                <span className="text-gray-300">{courseDetail?.course_enrolled_info?.xpEarned}/{(cnts?.Total_xp)}</span>
                    </h2>
                <Progress value={update_progress(courseDetail?.course_enrolled_info?.xpEarned??40,cnts?.Total_xp??0)} className="mt-2"/>
            </div>
        </div>
    </div>
  )
}

export default CourseStatus