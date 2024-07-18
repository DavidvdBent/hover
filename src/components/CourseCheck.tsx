"use client"
import { Check, Loader2, PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Course } from "@prisma/client"
import { Suspense, useCallback, useMemo, useState } from "react"
import { addCourse } from "@/lib/data"
import UpgradeButton from "./UpgradeButton"

const CourseCheck = ({userCourses, course, userPremium} : {userCourses : Course[], course : Course, userPremium : Boolean}) => {
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
    <div className="my-6 px-6">
            {inLibrary || updating ? (
            <Button className=" bg-green-400 text-black hover:bg-green-500">
                In Library
                <Check className="h-4 w-4 ml-2" />
            </Button>
            ) : !userPremium && course.premium ? (
            <UpgradeButton />
            ) : (
            <Button className=" bg-gray-300 text-black hover:text-white" onClick={handleAddCourse}>
                {loading ? (
                <Loader2 className="m-auto animate-spin" />
                ) : (
                <>
                    Enroll
                    <PlusIcon className="h-4 w-4 ml-2" />
                </>
                )}
            </Button>
            )}
            
    </div>
  )
}

export default CourseCheck
