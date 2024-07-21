"use server"

import { db } from "@/db"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Course } from "@prisma/client"

export const getUserFiles = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user?.id || !user.email) {
        throw new Error('Unauthorized')
    }

    try {
        const courses = await db.course.findMany({
            where: {
                User: {
                    some: {
                        id: user.id
                    }
                }
            }
        });
        // const subscriptionPlan = await getUserSubscriptionPlan()
        // const userPremium = subscriptionPlan.isSubscribed

        // if (!userPremium) {
        //     for (const course of courses) {
        //       if (course.premium) {
        //         await db.userCourse.delete({
        //           where: {
        //             User: user,
        //             courseId: course.id
        //           }
        //         });
        //       }
        //     }
        //   }
        return courses;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user files');
    }
}

export const getUserCourses = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user?.id) {
        return { success: false }
    }

    try {
        const courses = await db.course.findMany({
            where: {
                User: {
                    some: {
                        id: user.id
                    }
                }
            }
        });
        return courses;
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to fetch user courses' };
    }
}

export const getUserCourse = async (course : Course) => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user?.id) {
        return { success: false }
    }

    try {
        const check = await db.course.findFirst({
            where: {
                    id: course.id,
                    
                User: {
                    some: {
                        id: user.id
                    }
                }
            }
        });
        if (check) {
            return { success: true, course };
          } else {
            return { success: false, message: 'User is not enrolled in the course' };
          }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to fetch user courses' };
    }
}