"use server"

import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

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
