"use client"
import { Search as Srch} from "lucide-react"
import { Input } from "./ui/input"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

const Search = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = (input : string) => {    
    const params = new URLSearchParams(searchParams)
    params.set('page', '1');
    if (input) {
        params.set('query',input)
    } else {
        params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
} 
    return (
    <div className="relative w-[400px]">
        <Srch className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
        <Input placeholder="All our Courses" className="pl-10" 
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(event) => {
            handleSearch(event.target.value)
        }}/>
    </div>
  )
}

export default Search
