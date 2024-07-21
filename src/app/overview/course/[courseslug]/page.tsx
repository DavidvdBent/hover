import { Button } from "@/components/ui/button"
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper"
import OverviewVideoTable from "@/components/VideoTable"
import { db } from "@/db"
import { getKindeServerSession, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight, Clock, Link } from "lucide-react"
import Image from "next/image"

interface Props {
    params: {
      courseslug: string
    }
  }
  const page = async({params}: Props) => {
    const { courseslug } = params
    
  const { getUser } = getKindeServerSession()
  const user = await getUser()

       // make db call
    const course = await db.course.findFirst({
        where: {
            slug: courseslug,
        }
    })
  
    const chapters =  await db.chapter.findMany({
      where: {
          courseId: course?.id
      }
  })
  return (
    <MaxWidthWrapper>
      {course ?
      <>
      <h2 className="text-center mt-5 text-3xl pt-4 pb-4 lg:pb-12">{course.name}</h2>
          <div className=' rounded-2xl p-4 grid grid-cols-1 lg:grid-cols-2 mx-auto'>
            <div className="mx-auto">
            <Image src={course.url} alt=''width={600} height={600} className='rounded-2xl'></Image>
            </div>

          <div className=' ml-0 lg:ml-8 text-center lg:text-start mt-8 lg:mt-0'>
            <h3 className='pb-2 text-lg text-gray-600 text-semibold'>Information</h3>
            <p className=''>{course.info}...</p>
            <div className='flex items-center lg:items-start gap-2 mt-4'>
              <p className='py-2 text-lg text-gray-900 text-semibold mx-auto lg:mx-0 flex items-center'><Clock className='h-4 w-4 mr-1.5'/>{course.hours} Hours</p>
              </div>
          </div>
          </div>
      
      <h2 className="text-center mt-5 text-3xl pt-4 pb-12">Curriculum</h2>

      <OverviewVideoTable course = {course} chapters = {chapters} />
       </>
       : null}
      </MaxWidthWrapper>
  )
}

export default page
