import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";

import dynamic from "next/dynamic";
import "react-splitter-layout/lib/index.css";
const SplitterLayout = dynamic(() => import("react-splitter-layout"), {
  ssr: false,
});
import { CourseExercise } from "../page";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
type props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};
const CodeEditorChildren = ({onCompeleteExercise,isCompleted}:any) => {
  const { sandpack } = useSandpack();
  // console.log("completed data",isCompleted)
  return (
    <div className="flex gap-3 absolute bottom-30 right-5 mb-25">
      <Button
        variant="pixel"
        className="text-xl font-game cursor-pointer"
        onClick={() => sandpack.runSandpack()}
      >
        Run Code
      </Button>

      <Button
        variant="pixel"
        className="bg-green-500 text-xl font-game cursor-pointer"
        disabled={isCompleted}
        onClick={()=>onCompeleteExercise()}
      >
       {isCompleted?"Already Completed":"Mark Completed"}
      </Button>
    </div>
  );
};

const CodeEditor = ({ courseExerciseData, loading }: props) => {
  const {exerciseslug}=useParams();
  const exerciseindex=courseExerciseData?.exercises?.findIndex(item=>item?.slug==exerciseslug);
  // console.log("codeeditor ",exerciseindex)
  const isCompleted=courseExerciseData?.completedExercise?.find(item=>item.exerciseId == Number(exerciseindex??0)+1);
  // console.log(isCompleted)
  const onCompeleteExercise=async ()=>{
    if(exerciseindex==undefined){
      return;
    }
    const result=await axios.post('/api/exercise/complete',{
      courseId:courseExerciseData?.courseId,
      chapterId:courseExerciseData?.chapterId,
      exerciseId:exerciseindex+1,
      xpEarned:courseExerciseData?.exercises[exerciseindex].xp
    })
    toast.success('Exercise Completed')
  }
  return (
    <div>
      <SandpackProvider
      theme={"dark"}
        template="static"
        style={{ height: "100vh" }}
        files={courseExerciseData?.exercisedata?.exerciseContent?.starterCode}
        options={{
          autorun: false,
          autoReload: false,
        }}
      >
        <SandpackLayout style={{ height: "100%" }}>
          <div style={{ height: "100%" }}>
            <SplitterLayout
              vertical={false}
              primaryIndex={0}
              primaryMinSize={400}
              secondaryMinSize={300}
              secondaryInitialSize={500}
              customClassName="splitter-root"
            >
              <div className="relative h-full">
                <SandpackCodeEditor showTabs style={{ height: "100%" }} />
                <CodeEditorChildren onCompeleteExercise={onCompeleteExercise} isCompleted={isCompleted}/>
              </div>

              <SandpackPreview
                showNavigator
                style={{ height: "100%" }}
                showOpenNewtab
                showOpenInCodeSandbox={false}
              />
            </SplitterLayout>
          </div>
        </SandpackLayout>
         
      </SandpackProvider>
    </div>
  );
};

export default CodeEditor;
