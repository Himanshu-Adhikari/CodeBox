
import {useState} from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const EnrolledCourses = () => {
    const [enrolledCourses, setenrolledCourses] = useState([])
  return (
    <div className='mt-4'>
        <h1 className='text-3xl font-game p-3 mb-3'>Your Enrolled Courses</h1>
        {enrolledCourses?.length==0?
        <div className='flex flex-col gap-3 items-center p-8 rounded-tr-none border rounded-2xl bg-zinc-800'>
            <Image src={'/book.gif'} alt='books' width={90} height={90}/>
            <h2 className='font-game text-xl'>You Don't have any enrolled Courses..</h2>
            <Link href={'/courses'}>
            <Button variant={'pixel'} size={'lg'} className='font-game text-3xl '>Browse all courses </Button>
            </Link>
                    </div>:
        <>not done</>}
    </div>
  )
}
 
export default EnrolledCourses