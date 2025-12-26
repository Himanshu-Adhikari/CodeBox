import { Progress } from "@/components/ui/progress";
import { EnrolledCourseInfo } from "./EnrolledCourses";
import Image from "next/image";
import Link from "next/link";
type Props = {
  course: EnrolledCourseInfo;
};
const CourseProgressCard = ({ course }: Props) => {
  return (
    <Link href={"/courses/"+course?.courseId}>
      <div className="bg-slate-900 rounded-2xl p-3 border-amber-700 border-2">
        <Image
          src={course?.bannerImage}
          height={500}
          width={500}
          alt="course"
          className="w-full h-[170px] rounded-t-2xl object-cover"
        ></Image>
        <div className="font-game p-3">
          <h2 className="text-lg">Course</h2>
          <h2 className="text-2xl">{course?.title}</h2>
          <h2 className="mt-3 text-lg text-gray-400">
            {course?.completedExercises} Exercise Completed out of{" "}
            {course?.totalExercises}
          </h2>
          <Progress
            value={(course?.completedExercises / course?.totalExercises) * 100}
          />
        </div>
      </div>
    </Link>
  );
};

export default CourseProgressCard;
