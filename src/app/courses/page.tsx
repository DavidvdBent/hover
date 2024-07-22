import Search from "@/components/Search"
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper"
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
