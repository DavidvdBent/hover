"use client"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { getAuthstatus } from "./actions"
import { Loader2 } from "lucide-react"

const Loading = () => (
    <div className="text-center mt-5 text-3xl pb-4">
        <Loader2 className=" pt-20 mx-auto h-8 w-8 animate-spin" />
        <h2>Loading...</h2>
    </div>
);

const Page = () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')
    // get acces to origin 


    const { data, error, isLoading } = useQuery({
        queryKey: ['auth-callback'],
        queryFn: async () => await getAuthstatus(),
        retry: true,
        retryDelay: 300,
    })
    if (isLoading) return <Loading />
    if (error) {
        console.error(error)
        router.push('/')
        return null
    }
    if(data?.success){
        router.push('/dashboard')
    } else {
        router.push('/')
    }


    return null
}

export default Page