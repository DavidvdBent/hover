"use client"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { createStripeSession } from "@/app/pricing/actions"
import { User } from "@prisma/client"

const BillingButton = () => {
    const handleClick = async () => {
       const {url} = await createStripeSession()
       if (url) {
           window.location.href = url ?? "dashboard/billing"
       }
    }
  return (
    <Button onClick={handleClick}
    >
     Manage Subscription  <ArrowRight className="h-5 w-5 ml-1.5"/>
    </Button>
  )
}

export default BillingButton
