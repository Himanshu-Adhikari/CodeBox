import { Button } from "@/components/ui/button"
import CourseList from "../../courses/_components/CourseList"
import Link from "next/link"

const ExploreMoreCourses = () => {
  return (
    <div >
        <div className="mt-7 flex justify-between items-center">
      <h1 className="text-3xl font-game p-3 mb-3">Other Courses</h1>
      <Link href={'/courses'}>
      <Button className="font-game text-2xl" variant={"pixel"}>View All</Button>
      </Link>
        </div>
        <CourseList smallerCard={true} maxLimit={3}/>
    </div>
  )
}

export default ExploreMoreCourses