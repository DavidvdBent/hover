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
      <h2 className="text-center mt-5 text-3xl pt-4 pb-12">{course.name}</h2>
          <div className=' rounded-2xl p-4 grid grid-cols-2 mx-auto'>
            <div>
            <Image src={course.url} alt=''width={500} height={500} className='rounded-2xl'></Image>
            </div>

          <div className='ml-8'>
            <h3 className='pb-2 text-lg text-gray-600 text-semibold'>Information</h3>
            <p className=''>{course.info}...</p>
            <div className='flex items-center gap-2 mt-4'>
              <h3 className='py-2 text-lg text-gray-600 text-semibold'><Clock className='h-4 w-4'/></h3>
              <p className='py-2 text-lg text-gray-900 text-semibold'>{course.hours} Hours</p>
              {user ? 
                <Link href='/dashboard'><Button variant={'ghost'} className='ml-16 border-2'>Go To Dashboard<ArrowRight className='h-4 w-4 ml-4'/></Button></Link>
            :
                <LoginLink><Button variant={'ghost'} className='ml-16 border-2'>Log In <ArrowRight className='h-4 w-4 ml-4'/></Button></LoginLink>
            }
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
