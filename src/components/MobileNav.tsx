"use client"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { ArrowRight, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const MobileNav = ({isAuth, userPremium} : {isAuth: boolean, userPremium: boolean}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => [
        setIsOpen((prev) => !prev)
    ]

    const path = usePathname()

    useEffect(() => {
        if (isOpen) toggleOpen()
    }, [path])

    const closeOnCurrent = (href: string) => {
        if (path === href){
            toggleOpen()
        }
    }
  return (
    <div className="sm:hidden">
        <Menu onClick={toggleOpen} className="relative z-50 h-5 w-5 text-zinc-700"/>
    
    {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
            <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
            {!isAuth ? (
                <>
                 <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/sign-up')
                    }
                    className='flex items-center w-full font-semibold text-blue-500'
                    href='/sign-up'>
                    Get started
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <Link
                    onClick={() =>
                      closeOnCurrent('/courses')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/courses'>
                    Courses
                  </Link>
                  <li className='my-3 h-px w-full bg-gray-300' />
                <Link
                    onClick={() =>
                      closeOnCurrent('/pricing')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/pricing'>
                    Pricing
                  </Link>
                  <li className='my-3 h-px w-full bg-gray-300' />
                <Link
                    onClick={() =>
                      closeOnCurrent('/sign-in')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/sign-in'>
                    Sign In
                  </Link>
                </>
            ): (
                <>
                <Link
                    onClick={() =>
                      closeOnCurrent('/dashboard')
                    }
                    className='flex items-center w-full font-semibold text-blue-500'
                    href='/dashboard'>
                    Dashboard
                  </Link>
                  <li className='my-3 h-px w-full bg-gray-300' />
                <Link
                    onClick={() =>
                      closeOnCurrent('/courses')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/courses'>
                    Courses
                  </Link>
                  <li className='my-3 h-px w-full bg-gray-300' />
                  {userPremium ? (
                     <Link
                     onClick={() =>
                       closeOnCurrent('/dashboard/billing')
                     }
                     className='flex items-center w-full font-semibold'
                     href='/dashboard/billing'>
                     Billing
                   </Link>
                  ): (
                    <Link
                    onClick={() =>
                      closeOnCurrent('/pricing')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/pricing'>
                    Pricing
                  </Link>
                  )}
                  <li className='my-3 h-px w-full bg-gray-300' />
                <LogoutLink
                    onClick={() =>
                      closeOnCurrent('/sign-out')
                    }
                    className='flex items-center w-full font-semibold'
                    >
                    Sign Out
                  </LogoutLink>
                </>
            )}

            </ul>

        </div>
    ) : null}
    
    
    </div>
  )
}

export default MobileNav
