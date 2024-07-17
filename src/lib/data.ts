"use server"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Chapter, Course, Video } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const itemsPerPage = 6;

export async function fetchCourses(query: string, currentPage: number) {
    const offset = (currentPage - 1) * itemsPerPage;

    try {
        const courses = await db.course.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        info: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            skip: offset,
            take: itemsPerPage
        });
        return courses;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchPages(query: string) {
    try {
        const count = await db.course.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        info: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
        });
        const totalPages = Math.ceil(Number(count) / itemsPerPage);
        return totalPages;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function addCourse(course: Course) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) {
        redirect('/login');
    }

    try {
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                Course: {
                    connect: {
                        id: course.id
                    },
                },
            },
        });
        revalidatePath('/courses');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add course' };
    }
}

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Course Name must be at least 2 characters.",
    }),
    slug: z.string().toLowerCase(),
    hours: z.string(),
    info: z.string(),
    url: z.string(),
    key: z.string()
});

export async function adminAddCourse(data: z.infer<typeof FormSchema>) {
    try {
        await db.course.create({
            data: {
                name: data.name,
                slug: data.slug,
                hours: data.hours,
                info: data.info,
                url: data.url,
                key: data.key
            }
        });
        redirect('/courses');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add course' };
    }
}

export async function addChapterDB (data : any) {
    try {
       const newChapter =  await db.chapter.create({
            data: {
                title: data.title,
                courseId : data.courseId,
            }
        })
        return {success: true, chapter: newChapter}
    }catch(error){
        console.log(error)
        return {success: false}
    }
}
export async function deleteChapter (chapter : Chapter) {
    try {
        await db.video.deleteMany({
            where: {
                chapterId: chapter.id
            }
        })
        await db.chapter.delete({
            where: {
                id : chapter.id
            }
        })
        return {success: true}
    }catch (error){
        console.log(error)
        return {success: false}
    }
}
export async function getVideos (chapter: Chapter) {

        return await db.video.findMany({
            where: {
                chapterId: chapter.id
            }
        })}


        export async function addVideoDB (data : any) {
            try {
               const newVideo =  await db.video.create({
                    data: {
                        title: data.title,
                        duration: data.duration,
                        url: data.link,
                        info: '',
                        chapterId : data.chapterId
                    }
                })
                return {success: true, video: newVideo}
            }catch(error){
                console.log(error)
                return {success: false}
            }
        }
export async function deleteVideo (video : Video) {
    try {
        await db.video.delete({
            where: {
                id: video.id
            }
        })
        return {success: true}
    }catch (error){
        console.log(error)
        return {success: false}
    }
}