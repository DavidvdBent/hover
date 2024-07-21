import Search from "@/components/Search"
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, Bold, Clock, Euro, GraduationCap, Italic, Underline } from "lucide-react"
import AllCourses from "@/components/AllCourses"
import { fetchPages } from "@/lib/data"
import Pagination from "@/components/Pagination"

const page = async ({searchParams} : {searchParams? : {
    query?: string
    page?: string
}}) => {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page || 1)
    const totalPages = await fetchPages(query);

  return (
    <div>
      <MaxWidthWrapper>
      <h2 className="text-center mt-14 text-5xl pb-4">Courses</h2>
      <div className="flex justify-between mt-8 pb-2 border-b-2">
            <Search />
        <div>
        {/* <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold" className="mx-4">
            <Bold className="h-4 w-4 text-gray-500" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic" className="mx-4">
            <Italic className="h-4 w-4 text-gray-500" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline" className="mx-4">
            <Underline className="h-4 w-4 text-gray-500" />
        </ToggleGroupItem>
        </ToggleGroup> */}
        </div>
      </div>
      <AllCourses query={query} currentPage={currentPage}/>
      <div className="mb-10 flex justify-end mr-7 ">
        <Pagination totalPages = {totalPages} />
      </div>

      </MaxWidthWrapper>
    </div>
  )
}

export default page
