// import { VideoForm } from '@/components/VideoForm'
import { Card } from '@/components/ui/card'
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper'
import VideoForm  from '@/components/VideoForm'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
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

  if (user?.email != process.env.KINDE_ADMIN ) redirect('/')

     // make db call
  const course = await db.course.findFirst({
      where: {
          slug: courseslug,
      }
  })
  const chapters = await db.chapter.findMany({
    where: {
        courseId: course?.id,
    }
})
  return (
    <div>
      {course ?
      <>
      <h2 className="text-center mt-5 text-3xl pb-4">{course.name}</h2>
      <MaxWidthWrapper>
              <Card className='p-4 mt-6'>
               <VideoForm course = {course} chapter = {chapters}/>
              </Card>
      </MaxWidthWrapper>
      </>
      : null}
    </div> 
  )
}

export default page


