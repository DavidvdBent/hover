"use client"

import { createStripeSession } from "@/app/pricing/actions"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import MaxWidthWrapper from "./ui/MaxWidthWrapper"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { format } from 'date-fns'


interface BillingFormProps {
    subscriptionPlan : Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const BillingForm = ({subscriptionPlan} :  BillingFormProps) => {
  return (
    <MaxWidthWrapper className="max-w-5xl h-[69vh]">
        <form className="mt-12" onSubmit={(e) => {
            e.preventDefault()
            createStripeSession()
        }}>
        <Card>
            <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>You are currently on the <strong>{subscriptionPlan.name}</strong> plan.</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between space-x-0">
                <Button type="submit">
                    {subscriptionPlan.isSubscribed ? "Manage Subscription" : "Upgrade to Premium"}
                </Button>

                {subscriptionPlan.isSubscribed ? <p className="rounded-full text-xs font-medium">
                    {subscriptionPlan.isCanceled ? 'Your plan will be canceled on ' : 'Your plan renews on '}
                    {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}
                </p> : null}
            </CardFooter>
        </Card>
        </form>
    </MaxWidthWrapper>

      
  )
}

export default BillingForm
