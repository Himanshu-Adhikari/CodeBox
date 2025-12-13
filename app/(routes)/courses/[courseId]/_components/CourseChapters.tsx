import React from 'react'
import { Course } from '../../_components/CourseList';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  loading: boolean;
  courseDetail: Course ;
};




const CourseChapters = ({ loading, courseDetail }: Props) => {
  const EnableExercise = (
    chapterIndex: number,
    exerciseIndex: number,
    chapterExercisesLength: number
    ) => {
        const completed = courseDetail?.exercises_complete;

        // If nothing is completed, enable FIRST exercise ONLY
        // console.log("chapter index",exerciseIndex,courseDetail?.exercises_complete)
        if (!completed || completed.length === 0) {
            return chapterIndex === 0 && exerciseIndex === 0;
        }

        // last completed
        const last = completed[completed.length - 1];
        // Convert to  global exercise number
        const currentExerciseNumber =
            chapterIndex * chapterExercisesLength + exerciseIndex +1;
        // console.log("exr index is ",exerciseIndex," ",currentExerciseNumber);

        const lastCompletedNumber =
            (last.chapterId - 1) * chapterExercisesLength + last.exerciseId;

        return currentExerciseNumber === lastCompletedNumber + 2;
    };

    const isExercise_Complete=(chapterId: number,
    exerciseId: number,)=>{
      const Completed_Chapters=courseDetail?.exercises_complete;
      const completed_chapter=Completed_Chapters?.find(item=>(item.chapterId == chapterId && item.exerciseId==exerciseId));
      if(completed_chapter)return true;
      return false;
    }
  return (
    <div>
      <div className='p-5 rounded-2xl border-4'>
        {courseDetail?.chapters?.length ?<>
        { courseDetail?.chapters?.map((chapter,index)=>(
          <Accordion type="single" collapsible key={chapter.chapterId}>
            <AccordionItem value={`chapter-${chapter.chapterId}`}>
              <AccordionTrigger className='font-game p-3 hover:bg-slate-900 text-3xl'>
                <div className='flex gap-10'>

                <h2 className='rounded-full bg-slate-900 h-10 w-10 text-center'>
                  {chapter?.chapterId}
                  </h2>
                {chapter?.name}
                </div>
                
                </AccordionTrigger>
              <AccordionContent>
              <div className='p-2 bg-slate-900 rounded-2xl mt-3'>
                {chapter?.exercises.map((exc,ex_index)=>(
                  <div key={ex_index} className='font-game flex items-center justify-between p-3'>
                    <div className='flex gap-10 items-center'>
                    <h1 className='text-2xl'>Exercise {index*chapter?.exercises?.length+ex_index+1}</h1>
                    <h2 className='text-3xl'>{exc?.name}</h2>
                    </div>
                    
                    {EnableExercise(index,ex_index,chapter?.exercises?.length) ?
                     <Link href={'/courses/'+courseDetail?.courseId+'/'+chapter?.chapterId+'/'+exc?.slug}>
                     <Button variant={'pixel'}>{exc?.xp} xp</Button>
                     </Link>
                     :
                     isExercise_Complete(chapter?.chapterId,ex_index+1) ? 
                    <Button variant={'pixel'} className=' bg-green-300 shadow-green-900' >Done</Button>:
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'pixelDisabled'}>?</Button>
                    </TooltipTrigger>
                    <TooltipContent className='font-game '>
                      Please Enroll First
                    </TooltipContent>
                  </Tooltip>}
                  </div>
                ))}
              </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        </>:<div className='flex  text-center'>
          <Image src={'/developing.gif'} width={400} height={400} 
          alt='making' className='rounded-3xl'></Image>
          <div className='flex flex-col items-center'>
          <h2 className='font-game text-4xl'> Will get Courses Soon stay tuned... ☺️</h2>
          <Image src={'/goblin.gif'} alt='gob' height={100} width={100}></Image>
          </div>
          </div>}
      </div>
    </div>
  )
}

export default CourseChapters