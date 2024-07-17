import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import  Dashboard  from '@/components/Dashboard';


const page = async () => {
    const { getUser} = getKindeServerSession()
    const user =  await getUser()
  
    
    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')  
    
    const existingUser = await db.user.findUnique({
        where: { id: user?.id}
      })
    
    if(!existingUser) redirect('/auth-callback?origin=dashboard')


  return (
    <Dashboard/>
  )
}

export default page
