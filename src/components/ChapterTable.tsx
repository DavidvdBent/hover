import { Chapter, Course } from "@prisma/client"
import { TableCell, TableRow } from "./ui/table"
import { db } from "@/db"
import { Checkbox } from "./ui/checkbox"
import { Check } from "lucide-react"
import { formatDuration } from "@/lib/utils"
import Link from "next/link"

const ChapterTable = async({chapter, chapterIndex, course} : {chapter: Chapter , chapterIndex: number, course : Course}) => {
    const videos =  await db.video.findMany({
        where: {
            chapterId: chapter.id
        }
    })
  return (
    <>
        {videos.map((video, index) => (
            <TableRow key={index} >
              <TableCell className="text-[14px]">{`${chapterIndex + 1}.${index + 1}`}</TableCell>
                <TableCell className="text-[14px]"><Link href={`/course/${course.slug}/${video.id}`} key={index}>{video.title}</Link></TableCell>
              <TableCell className="text-[14px]">{formatDuration(video.duration)}</TableCell>
              {/* TO DO: PROGRESS */}
              {/* <TableCell className="text-[14px] text-center ">{index % 2 != 0 ? <Check className="mx-auto text-green-500"/> : <></>}</TableCell> */}
            </TableRow>

        ))
    }
    </>
  )
}

export default ChapterTable
