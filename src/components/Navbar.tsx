import React, { useState } from 'react'
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { LoginLink, LogoutLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LogOutIcon, Plus } from 'lucide-react'

const Navbar = async () => {
    const { getUser} = getKindeServerSession()
    const user =  await getUser()



  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper>
            <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                <Link href='/' className="flex items-end gap-2 z-40 ">
                    <span className='font-semibold text-xl'>Hover.</span>
                </Link>
                <div className='hidden items-center space-x-4 sm:flex text-nm'>
                {user && user.email === process.env.KINDE_ADMIN ? <>
                    <Link href='/admin/addcourse' className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                    })} >Add Course</Link>
                    <Link href='/courses' className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                    })} >Edit Courses</Link>
                </> : <Link href='/courses' className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                    })} >Courses</Link>}

                    {!user || !user.id ? (
                        <>
                        <LoginLink className={buttonVariants({
                            variant: 'ghost',
                            size: 'sm'})}>Sign in</LoginLink>
                        <LoginLink className={buttonVariants({
                            size: 'sm'})}>Register</LoginLink>
                            </>
                    ) : (
                        <>
                        <LoginLink className={buttonVariants({
                            variant: 'ghost',
                            size: 'sm'})}>Dashboard</LoginLink>
                        <LogoutLink className={buttonVariants({
                            variant: 'ghost',
                            size: 'sm'})}><LogOutIcon className='h-4 w-4 mr-[4px]'/>Log Out</LogoutLink> 
                        </>
                    )}
                </div>
            </div>
        </MaxWidthWrapper>

    </nav>
  )
}

export default Navbar
