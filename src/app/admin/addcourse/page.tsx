import React from 'react'
import {CourseForm} from '@/components/AddCourse'
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper'
import { Card } from '@/components/ui/card'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const page = async() => {
  const {getUser} =  getKindeServerSession()
  const user = await getUser()
  if (user && user.email === process.env.KINDE_ADMIN)
  {
    return (
      <div>
        <h2 className='text-xl text-center mt-8 text-gray-700'>Add New Course</h2>
          <MaxWidthWrapper>
              <Card className='p-4 mt-6'>
               <CourseForm/>
              </Card>
          </MaxWidthWrapper>
      </div>
    )
  } else {
    return (
      <div>
        <h2 className='text-xl text-center mt-32 text-gray-700'>Oops this page is not for you!</h2>
          <MaxWidthWrapper>
              <Link href='/' className='mx-auto mt-8 flex justify-center'><Button>Go back</Button></Link>
          </MaxWidthWrapper>
      </div>
    )
  }
}

export default page
