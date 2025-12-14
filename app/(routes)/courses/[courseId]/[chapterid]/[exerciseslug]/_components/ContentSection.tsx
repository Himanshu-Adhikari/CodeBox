import { Skeleton } from "@/components/ui/skeleton";
import { CourseExercise } from "../page"
import { Lightbulb } from "lucide-react";
type props={
    courseExerciseData:CourseExercise | undefined;
    loading:boolean;
}

const ContentSection = ({courseExerciseData,loading}:props) => {
    const contentInfo=courseExerciseData?.exercisedata
  return (
    <div className="p-10">
        {
            loading || !contentInfo?
            <Skeleton className="h-full w-full m-10 rounded-2xl"/>:
            <div className="p-3">
                <h2 className="font-game text-3xl my-3">{courseExerciseData?.exercisedata?.exerciseName}</h2>
            <div className="text-xl font-game" dangerouslySetInnerHTML={{__html:contentInfo?.exerciseContent?.content }}></div>
            <div>
                <h2 className="font-game text-3xl mt-4 p-3">
                    Task
                </h2>
                <div className="p-4 border-4 text-xl font-game rounded-2xl bg-slate-900" 
                 dangerouslySetInnerHTML={{__html:contentInfo?.exerciseContent?.task}}></div>
            </div>
            <div>
                <h2 className="font-game text-3xl mt-4 flex gap-2 items-center text-yellow-400">
                    <Lightbulb/>
                    Hint
                </h2>
                <div className="p-4 border-4 font-game rounded-2xl bg-slate-900" 
                 dangerouslySetInnerHTML={{__html:contentInfo?.exerciseContent?.hint}}></div>
            </div>
            </div>
        }
    </div>
  )
}

export default ContentSection