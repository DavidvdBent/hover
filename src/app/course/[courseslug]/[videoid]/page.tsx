import { getUserCourse } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import VideoTable from "@/components/VideoTable";
import { db } from "@/db";
import { formatDuration } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from 'react';

interface Props {
  params: {
    courseslug: string;
    videoid: string;
  }
}

const Page = async ({ params }: Props) => {
  const { courseslug, videoid } = params;
  
  // Fetch the video data from the database
  const video = await db.video.findUnique({
    where: {
      id: videoid,
    },
  });
  const course = await db.course.findFirst({
    where: {
        slug: courseslug,
    }
})  
  const chapters = await db.chapter.findMany({
  where: {
      courseId: course?.id,
  }
})
if (course) {
  const check = await getUserCourse(course)
  if (!check.success) {
    redirect('/courses')
  }
}
  if (!video) {
    return <h2>No Video Found</h2>;
  }

  return (
    <div>
      <MaxWidthWrapper>
      <h2 className="text-center mt-5 text-3xl pt-4 pb-12">{course?.name}</h2>
      <Link href={`/course/${course?.slug}`}><p className="flex items-center text-gray-600 mb-2"><ArrowLeft className="w-4 h-4"/>Back to Course</p></Link>
        <iframe className="h-[600px] w-full rounded-2xl mx-auto" src={video.url} />
        <div className="flex justify-between mt-4 items-center pb-12">
          <p className=" text-xl font-semibold"> {video.title}</p>
            <div className="flex gap-2 items-center">
              <Clock className="h-4 w-4" />
              <p>{formatDuration(video.duration)}</p>
            </div>
            {/* TODO : PROGRESS */}
          {/* <div className="flex gap-2 items-center">
            <p>Watched: </p>
            <Checkbox className="br-green-600 h-6 w-6"/>
              </div> */}
              <Button variant={'ghost'} className="bg-gray-100">
                <p className="flex gap-2 items-center">Next Video <ArrowRight/></p>
              </Button>
        </div>
        {course ?
          <VideoTable course = {course} chapters = {chapters} />
        : <></> }
      </MaxWidthWrapper>
    </div>
  );
}

export default Page;
