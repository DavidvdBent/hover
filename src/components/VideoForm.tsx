"use client"
import { Chapter, Course, Video } from "@prisma/client"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { addChapterDB, deleteChapter } from "@/lib/data"
import { useState } from "react"
import { TrashIcon } from "lucide-react"
import Videos from "./Videos"

const VideoForm = ({course, chapter} : {course: Course, chapter: Chapter[]}) => {
    const [chapters, setChapters] = useState(chapter)
    const [newChapter, setNewChapter] = useState('')
    const addChapter = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const title = formData.get('chapter')
        const data = {
            title: title,
            courseId : course.id,
        }
        const query = await addChapterDB(data)
        if (query.success && query.chapter) {
            setChapters([...chapters, query.chapter])
            setNewChapter('')
        }
        }
    const handleDelete = async(chapter : Chapter) =>{
        const query = await deleteChapter(chapter)
        if(query.success) {
            // MAKE TOAST HERE
            setChapters(chapters.filter(chap => chap.id !== chapter.id))
        }
    }
  return (
    <div>
        <div className="pb-8">
            {chapters.map((chap, index) => (
                <div className="border-b-2" key={index} >
                <div className="flex gap-4 items-center py-4">
                    <h2 className="font-semibold text-[16px]">{chap.title}</h2>
                    <button onClick={() => handleDelete(chap)}><TrashIcon className="h-3 w-3"/></button>  
                    
                </div>
                <Videos chapter = {chap}/>
                </div>
            ))}
        </div>
        <form onSubmit={addChapter}>
        <label className="mb-4">Add Chapter</label>
        <div className="flex gap-4 mb-12">
            <Input name="chapter" value={newChapter}
            onChange={(e) => setNewChapter(e.target.value)}
            placeholder="Enter name of chapter"></Input>
            <Button type="submit">Add</Button>
        </div>
        </form>
    </div>
  )
}

export default VideoForm

