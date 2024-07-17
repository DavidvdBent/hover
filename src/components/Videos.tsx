"use client"
import { db } from "@/db"
import { addVideoDB, deleteVideo, getVideos } from "@/lib/data"
import { Chapter, Video } from "@prisma/client"
import { Cross, Dot, Plus, PlusIcon, TrashIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { formatDuration } from "@/lib/utils"
  

const Videos = ({chapter} : {chapter: Chapter}) => {
    const [videos, setVideos] = useState<Video[]>([])
    const [input, setInput] = useState(false)

    useEffect(() => {
        const fetchVideos = async () => {
            const fetchedVideos = await getVideos(chapter)
            if(fetchedVideos){
                setVideos(fetchedVideos)
            }
        }
        fetchVideos()
    },[chapter, chapter.id])

    const handleInput = () => {
        setInput(!input)
        console.log(input)
    }
    const handleDelete = async(video : Video) =>{
        const query = await deleteVideo(video)
        if(query.success) {
            // MAKE TOAST HERE
            setVideos(videos.filter(vid => vid.id !== video.id))
        }
    }
    const handleForm = async (event : any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const title = formData.get('title')
        const duration = Number(formData.get('duration'))
        const link = formData.get('link')
        const data = {
            title: title,
            duration: duration,
            link: link,
            chapterId : chapter.id
        }
        const query = await addVideoDB(data)
        if (query.success && query.video) {
            setVideos([...videos, query.video])
            setInput(!input)
        }


    }
    // const addChapter = async (event: any) => {
    //     event.preventDefault()
    //     const formData = new FormData(event.target)
    //     const title = formData.get('chapter')
    //     const data = {
    //         title: title,
    //         courseId : course.id,
    //     }
    //     const query = await addChapterDB(data)
    //     if (query.success && query.chapter) {
    //         setChapters([...chapters, query.chapter])
    //         setNewChapter('')
    //     }
    //     }

  return (
    <div>
      {videos.map((vid, index) =>  (
        <div key ={index} className='flex items-center gap-4 text-[14px] '>
            <h2 className="py-2 flex items-center"><Dot/>{vid.title}</h2>
            <h2>{formatDuration(vid.duration)}</h2>
            <button onClick={() => handleDelete(vid)}><TrashIcon className="h-3 w-3"/></button>              
        </div>
      ))}
        {
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex items-center gap-2 mt-2 mb-4'variant={'ghost'}><PlusIcon className="h-4 w-4"/>Add Video</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add A Video To {chapter.title} </DialogTitle>
                    <DialogDescription>By Filling out the form below you add a single video to this chapter. Please fill out all the information.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleForm}>
                <label>Video Title:</label>
                <Input className="my-4" placeholder="Title" name='title'/>
                <label>Video Duration:</label>
                <Input className="my-4" placeholder="Duration in Seconds" name='duration'/>
                <label>Video Link:</label>
                <Input className="my-4" placeholder="youtube.com/course/htmlhandling" name='link'/>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="my-4" type="submit"> Add Video</Button>
                    </DialogClose>
                </DialogFooter>
        </form>
            </DialogContent>
        </Dialog>
        
        }
    </div>
  )
}

export default Videos
