"use client"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { getAuthstatus } from "./actions"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

const Loading = () => (
    <div className="text-center mt-5 text-3xl pb-4">
        <Loader2 className=" pt-20 mx-auto h-8 w-8 animate-spin" />
        <h2>Loading...</h2>
    </div>
);

const AuthPage = async () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')
    // get acces to origin 

    const data = await getAuthstatus()

    // const { data } = useQuery({
    //     queryKey: ['auth-callback'],
    //     queryFn: async () => await getAuthstatus(),
    //     retry: true,
    //     retryDelay: 500,
    // })

    if(data?.success){
        router.push('/dashboard')
    } else {
        router.push('/')
    }


    return (
        <Loading />
    )
}
const Page = () => {
    <Suspense fallback={<Loading/>}>
        <AuthPage/>
    </Suspense>
}

export default Page