import { db } from "@/db"

 export const fetchCourses = async() => {
    await db.course.findMany()
 }