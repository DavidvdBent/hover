import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Chapter, Course } from "@prisma/client"
  import OverviewChapterTable from "./ChapterTable"
  import { Checkbox } from "./ui/checkbox"
  import { Check } from "lucide-react"
  import React from "react"
  
  
  const VideoTable = async ({course, chapters}: {course: Course, chapters : Chapter[]}) => {
    return (
      <Table>
    <TableCaption>The course Curriculum.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Number</TableHead>
        <TableHead>Title</TableHead>
        <TableHead className="w-[200px]">Duration</TableHead>
        {/* TO DO: PROGRESS */}
        {/* <TableHead className="text-center w-[200px]">Done</TableHead> */}
      </TableRow>
    </TableHeader>
    <TableBody>
      {chapters.map((chapter,index) => (
      <React.Fragment key={index}>
      <TableRow className="border-b-[1px] border-gray-400">
        <TableCell className="font-semibold">{index + 1}</TableCell>
        <TableCell className="font-semibold">{chapter.title}</TableCell>
        <TableCell className="font-semibold"></TableCell>
        {/* TODO: PROGRESS */}
        {/* <TableCell className="text-right font-semibold">{index % 2 == 0 ? <Check className="mx-auto text-green-500"/> : <></>}</TableCell> */}
      </TableRow>
      <OverviewChapterTable chapter = {chapter} chapterIndex = {index} course = {course}/>
      </React.Fragment>
      ))}
    </TableBody>
  </Table>
    )
  }
  
  export default VideoTable
  