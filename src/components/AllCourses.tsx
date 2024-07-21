import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Award, Clock, Crown, Diamond, Edit, Euro, GraduationCap, LogIn, Star } from 'lucide-react'
import { fetchCourses } from '@/lib/data'
import CourseCheck from './CourseCheck'
import { getUserCourses, getUserFiles } from '@/app/dashboard/actions'
import { getKindeServerSession, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { cn } from '@/lib/utils'



const AllCourses = async({query, currentPage} : {
    query: string
    currentPage : number
}) => {
    const { isAuthenticated, getUser} = getKindeServerSession()
    const authenticated = await isAuthenticated();
    const user = await getUser()
    const allCourses = await fetchCourses(query, currentPage)
    const subscriptionPlan = await getUserSubscriptionPlan()
    const userPremium = subscriptionPlan.isSubscribed
    const {getRoles} = getKindeServerSession()
    const token = getRoles()
   
    if (authenticated) {
        const userCourses = await getUserFiles()
        return (
            <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
            {allCourses?.map((course  :any, index : any)=> (
            <div key={index} className={`border-2 m-auto  max-w-[500px] h-full rounded-lg p-8 shadow-md mb-8 ${course.premium ? `border-blue-200` : ``}`}>
                {course.premium ? 
            <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                       <p className=' flex justify-around items-center gap-4'>Premium <Crown className='h-4 w-4'/></p>
                      </div>
            
            : null}
                <Image src={course.url} height={500} width={500} alt='' className="rounded-lg mx-auto w-400 h-300 aspect-video"/>
                <h2 className="mt-4 font-semibold text-lg text-center">{course.name}</h2>
                <p className="mt-2">{course.info.substring(0,175)}...</p>
                <div className='flex gap-4 justify-center'>
                    {user && user.email === process.env.KINDE_ADMIN ? 
                    <></>
                    :
                    <CourseCheck userCourses = {userCourses} course = {course} userPremium = {userPremium}/>}
                    {/* <CourseCheck userCourses = {userCourses} course = {course}/> */}
                    {user && user.email === process.env.KINDE_ADMIN ? 
                    <Link href={`/admin/edit/${course.slug}`}><Button className=" my-6 bg-gray-700 px-14">Edit<Edit className="h-4 w-4 ml-2"/></Button></Link>
                    : 
                    <Button className=" my-6 bg-gray-700 px-14">Explore <ArrowRight className="h-4 w-4 ml-2"/></Button>
                    }
                </div>
                <div className="flex justify-between mt-10">
                    <div className=" flex gap-2 items-center">
                        <Clock className="text-gray-500 h-5 w-5"/>
                        <p className="text-gray-500"> {course.hours} Hours</p>
                    </div>
                    <div className=" flex gap-2 items-center">
                        <GraduationCap className="text-gray-500 h-6 w-6"/>
                        {/* Make THis DYNMIC! */}
                        <p className="text-gray-500 capitalize">{course.level}</p>
                    </div>
                    <div className=" flex gap-[1px] items-center">
                        {course.premium ? 
                        <>
                        <Crown className="text-blue-500 h-5 w-5"/>
                        <p className="text-blue-500 pl-2">Premium</p>
                        </>
                        :
                        <>
                        <Star className="text-gray-500 h-5 w-5"/>
                        <p className="text-gray-500 pl-2">Free</p>
                        </>
                        }
                    </div>
                    
                </div>
            </div>
           
            
        ))} 
      </div>
        )
    }

    return (
        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
    {allCourses?.map((course  :any, index : any)=> (
        <div key={index} className={`relative border-2 m-auto  max-w-[500px] h-full rounded-lg p-8 shadow-md mb-8 ${course.premium ? `border-blue-200` : ``}`}>
            
            {course.premium ? 
            <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                       <p className=' flex justify-around items-center gap-4'>Premium <Crown className='h-4 w-4'/></p>
                      </div>
            
            : null}
            <Image src={course.url} height={500} width={500} alt='' className="rounded-lg mx-auto w-400 h-300 aspect-video object-cover"/>
            <h2 className="mt-4 font-semibold text-lg text-center">{course.name}</h2>
            <p className="mt-2 min-h-28">{course.info.substring(0,175)}...</p>
            <div className='flex gap-6 justify-center'>
                {/* <RegisterLink><Button className=" my-6  px-6 shadow-md" variant={'ghost'}>Register<LogIn className='h-4 w-4 ml-2'/></Button></RegisterLink> */}
                <Link href={`/overview/course/${course.slug}`}><Button className=" my-6 bg-gray-700 px-14">Explore <ArrowRight className="h-4 w-4 ml-2"/></Button></Link>
            </div>
            <div className="flex justify-between mt-10">
                <div className=" flex gap-2 items-center">
                    <Clock className="text-gray-500 h-5 w-5"/>
                    <p className="text-gray-500"> {course.hours} Hours</p>
                </div>
                <div className=" flex gap-2 items-center">
                    <GraduationCap className="text-gray-500 h-6 w-6"/>
                    {/* Make THis DYNMIC! */}
                    <p className="text-gray-500 capitalize">{course.level}</p>
                </div>
                <div className=" flex gap-[1px] items-center">
                    {course.premium ? 
                    <>
                    <Crown className="text-blue-500 h-5 w-5"/>
                    <p className="text-blue-500 pl-2">Premium</p>
                    </>
                    :
                    <>
                    <Star className="text-gray-500 h-5 w-5"/>
                    <p className="text-gray-500 pl-2">Free</p>
                    </>
                    }
                </div>
                
            </div>
        </div>
       
        
    ))} 
  </div>
    )
}

export default AllCourses
