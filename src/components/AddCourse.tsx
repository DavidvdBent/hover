"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { adminAddCourse } from "@/lib/data"
import { UploadButton } from "@/lib/uploadthing"
import { useState } from "react"
import { useForm } from "react-hook-form"


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Course Name must be at least 2 characters.",
  }),
  slug: z.string().toLowerCase(),
  hours: z.string(),
  info: z.string(),
  url : z.string(),
  key : z.string(),
  // thumbnail: z.string(),

})

export function CourseForm() {
  const [uploadData, setUploadData] = useState({ url: "", key: "" })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      slug: "",
      hours: "",
      info: "",
      url: "",
      key: "",
      // thumbnail: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const finalData = {
      ...data,
      url: uploadData.url,
      key: uploadData.key,
    }
    adminAddCourse(finalData)
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Javascript for experts.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Javascript_for_experts" {...field} />
              </FormControl>
              <FormDescription>
                URL Friendly name (so no spaces)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Hours</FormLabel>
              <FormControl>
                <Input placeholder="20-30 Hours" {...field} />
              </FormControl>
              <FormDescription>
                Hours to complete the course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Information</FormLabel>
              <FormControl>
                <Textarea placeholder="This interactive course..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl className="flex start justify-start items-start">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    const { url, key } = res[0]
                    setUploadData({ url: url, key: key })
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`)
                }}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit Course</Button>
      </form>
    </Form>
  )
}