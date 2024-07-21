import { getUserCourse } from '@/app/dashboard/actions'
import { Button } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper'
import { Progress } from '@/components/ui/progress'
import VideoList from '@/components/VideoList'
import VideoTable from '@/components/VideoTable'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    courseslug: string
  }
}
const page = async({params}: Props) => {
  const { courseslug } = params
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user?.id ) redirect('/courses')

     // make db call
  const course = await db.course.findFirst({
      where: {
          slug: courseslug,
      }
  })
  if (course) {
    const check = await getUserCourse(course)
    if (!check.success) {
      redirect('/courses')
    }
  }

  const chapters =  await db.chapter.findMany({
    where: {
        courseId: course?.id
    }
})
  return (
    <>
      <MaxWidthWrapper>
      {course ?
      <>
      <h2 className="text-center mt-12 text-5xl pt-4 pb-4 lg:pb-12">{course.name}</h2>
      <div className=' rounded-2xl p-4 grid grid-cols-1 lg:grid-cols-2 mx-auto'>
      <div>
            <Image src={course.url} alt=''width={600} height={600} className='rounded-2xl mx-auto'></Image>
            {/* TO DO : PROGRESS */}
            {/* <div className='flex items-center pr-12 gap-4 mt-4'>
            <h3 className='py-2 text-lg text-gray-600 text-semibold'>Progress</h3>
            <Progress value={30} />
            </div> */}
            </div>

            <div className=' ml-0 lg:ml-8 text-center lg:text-start mt-8 lg:mt-0'>
            <h3 className='pb-2 text-lg text-gray-600 text-semibold'>Information</h3>
            <p className=''>{course.info}...</p>
            <div className=' grid grid-cols-1 lg:grid-cols-2 items-center gap-2 mt-4'>
              <div className='flex items-center mx-auto lg:mx-0'>
                <h3 className='py-2 text-lg text-gray-600 text-semibold mr-2'><Clock className='h-4 w-4'/></h3>
                <p className='py-2 text-lg text-gray-900 text-semibold'>{course.hours} Hours</p>
              </div>
            <Button variant={'ghost'} className='lg:ml-0 ml-0 border-2 w-[200px] mx-auto mt-6 lg:mt-0'>Start The Course <ArrowRight className='h-4 w-4 ml-4'/></Button>
            </div>
          </div>
          </div>
      
      <h2 className="text-center mt-5 text-3xl pt-4 pb-12">Curriculum</h2>

      <VideoTable course = {course} chapters = {chapters} />
       </>
       : null}
      </MaxWidthWrapper>
    </> 
  )
}

export default page


