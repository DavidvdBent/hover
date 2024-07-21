import { getUserSubscriptionPlan } from "@/lib/stripe"
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar } from "./ui/avatar"
import { Button } from "./ui/button"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Crown, Gem, UserIcon } from "lucide-react"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

interface UserAccountNavProps {
    email: string | undefined
    name: string
}

const UserAccountNav = async ({email, name} : UserAccountNavProps) => {
    const subscriptionPlan = await getUserSubscriptionPlan()
  
  
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
            <Button className="rounded-full h-8 w-8 aspect-square bg-slate-100">
                <Avatar className="relative w-8 h-8">
                    <AvatarFallback className="m-auto"><span className="sr-only">{name}</span>
                    <UserIcon className="h-5 w-5 text-zinc-900" />
                    </AvatarFallback>
                   
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white shadow-md' align='end'>
        <div className='flex items-center justify-start gap-2 p-2 mt-2 border-b-[1px]'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            {name && (
              <p className='font-medium text-sm text-black'>
                {name}
              </p>
            )}
            {email && (
                <p className='w-[200px] truncate text-xs text-zinc-700'>
                {email}
              </p>
            )}
            </div>
          </div>
       

        <DropdownMenuSeparator className="py-1"/>
        
        {/* <DropdownMenuItem asChild className="p-2">

            <Link href='/dashboard' className="flex items-center">
              Dashboard
            </Link>
        
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        <DropdownMenuItem asChild className="p-2">
          {subscriptionPlan?.isSubscribed ? (
            <Link href='/dashboard/billing' className="flex items-center">
              Manage Subscription
            </Link>
          ) : (
            <Link href='/pricing' className="flex items-center">
              Upgrade{' '}
              <Crown className='text-blue-600 h-4 w-4 ml-1.5' />
            </Link>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='cursor-pointer p-2'>
            <LogoutLink className="flex items-center">Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default UserAccountNav
