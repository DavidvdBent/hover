import { db } from "@/db"
import { Chapter, Course } from "@prisma/client"
import Link from "next/link"

const VideoList = async ({chapter, course} : {chapter : Chapter, course : Course}) => {
    const videos =  await db.video.findMany({
        where: {
            chapterId: chapter.id
        }
    })
  return (
    <div>
      {videos?.map((video,index) => (
        <Link key={index} href={`/course/${course.slug}/${video.id}`}><h2>{video.title}</h2>
        </Link>
        
      ))}
    </div>
  )
}

export default VideoList
