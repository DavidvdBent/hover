"use client"
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Clock, GraduationCap, Loader2, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import MaxWidthWrapper from './ui/MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import { Progress } from './ui/progress'
import { getUserFiles } from '@/app/dashboard/actions'

const Dashboard = () => {
    const { data: courses, isLoading } = useQuery({
        queryKey: ['getFiles'],
        queryFn: async () => await getUserFiles(),
    })

    if (isLoading) {
        return (
        <div className='mt-20'>
            <Loader2 className='h-8 w-8 mx-auto animate-spin'/>
            <p className='text-center'>Loading Courses...</p>
        </div>
        )
    }
  return (
    <MaxWidthWrapper>
       <h2 className="text-center mt-5 text-3xl pb-4">My Dashboard</h2>
       {courses && courses?.length < 1 ? (<div className='text-center mt-4'>
        <p className='mt-5'>No courses found in your account</p>
        <Link href='/courses'><Button className='mt-4'>Enroll in our courses <ArrowRight className='ml-2 h-2 w-2'></ArrowRight></Button></Link>
       </div>): null }
       <div className="grid grid-cols-2 gap-8 pt-8 mx-6 justify-around">
       {courses?.map((course : any, index : any)=> (
        <div key={index} className="border-2 m-auto  max-w-[500px] rounded-lg p-8 shadow-md mb-8">
        <Image src={course.url} height={500} width={500} alt='' className="rounded-lg mx-auto w-400 h-300"/>
        <h2 className="mt-4 font-semibold text-lg text-center">{course.name}</h2>
        <p className="mt-2">{course.info.substring(0,175)}...</p>
        <div className='flex gap-4 justify-center'>
            <Link href={`/course/${course.slug}`}><Button className=" my-6 bg-gray-700 px-14">Go To Course <ArrowRight className="h-4 w-4 ml-2"/></Button></Link>
        </div>
        <div className="flex justify-between mt-10">
            <div className=" flex gap-2 items-center">
                <Clock className="text-gray-500 h-5 w-5"/>
                <p className="text-gray-500"> {course.hours} Hours</p>
            </div>
            <div className=" flex gap-2 items-center">
                <GraduationCap className="text-gray-500 h-6 w-6"/>
                {/* Make THis DYNMIC! */}
                <p className="text-gray-500">Beginner</p>
            </div>
            <div className=" flex gap-[1px] items-center">
                <Star className="text-gray-500 h-5 w-5"/>
                {/* Make THis DYNMIC! */}
                <p className="text-gray-500 pl-2"> 4.5 / 5 </p>
            </div>
            
        </div>
    </div>
       ))}
       </div>
    </MaxWidthWrapper>
  )
}

export default Dashboard
