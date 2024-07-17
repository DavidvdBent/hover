"use client"
import { Check, Loader2, PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Course } from "@prisma/client"
import { Suspense, useCallback, useMemo, useState } from "react"
import { addCourse } from "@/lib/data"

const CourseCheck = ({userCourses, course} : {userCourses : Course[], course : Course}) => {
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const inLibrary = useMemo(() => {
        return userCourses.some((userCourse) => userCourse.id === course.id)
    }, [userCourses, course.id])


    const handleAddCourse = async () => {
        if (!inLibrary) {
            setLoading(true)

            try {
                await addCourse(course)
                setUpdating(true);
                // Simulate a short delay before showing the "In Library" button
                setTimeout(() => {
                    setUpdating(false);
                }, 300);
            } finally {
                setLoading(false)
            }      
        }
    }
  return (
    <div>
            {inLibrary || updating ? 
            <Button className=" my-6 bg-green-400 px-6 text-black hover:bg-green-500">In Library <Check className="h-4 w-4 ml-2"/></Button>
            : 
            <Button className=" my-6 bg-gray-300 px-6 text-black hover:text-white" onClick={handleAddCourse}>
                {loading ?  <Loader2 className="m-auto animate-spin"/> : <>Add <PlusIcon className="h-4 w-4 ml-2"/></> }
            </Button> 
            }
            
    </div>
  )
}

export default CourseCheck
