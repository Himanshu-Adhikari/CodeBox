"use client"
import Image from "next/image"
import CourseList from './_components/CourseList'
const Courses = () => {
  return (
    <div>
      <Image src={'/courses_banr.gif'} alt="coursepage" 
        width={1400} height={300} 
        className="w-full lg:max-h-[300px] m-4  "/>
        <div className="flex flex-col items-center">

        <h2 className="font-game text-6xl underline">Explore All Courses</h2>
     <p className="text-lg text-muted-foreground font-game">
        Find what inspires you — and start mastering it today.
      </p>
        </div>
      <div>
        <CourseList/>
      </div>
    </div>
  )
}

export default Courses