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
type Props = {
  loading: boolean;
  courseDetail: Course ;
};



const CourseChapters = ({ loading, courseDetail }: Props) => {
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
                    {/* <Button variant={'pixel'}>{exc?.xp} xp</Button> */}
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'pixelDisabled'}>?</Button>
                    </TooltipTrigger>
                    <TooltipContent className='font-game '>
                      Please Enroll First
                    </TooltipContent>
                  </Tooltip>
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