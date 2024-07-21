"use client"

import { createStripeSession } from "@/app/pricing/actions"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import MaxWidthWrapper from "./ui/MaxWidthWrapper"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { format } from 'date-fns'
import UpgradeButton from "./UpgradeButton"
import BillingButton from "./BillingButton"


interface BillingFormProps {
    subscriptionPlan : Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const BillingForm = ({subscriptionPlan} :  BillingFormProps) => {
  return (

    <MaxWidthWrapper className="max-w-5xl h-[76vh] pt-8">
        <div className="pt-16"/>
        <Card>
            <CardHeader>
                <CardTitle className="py-6">Subscription Plan</CardTitle>
                <CardDescription>You are currently on the <strong>{subscriptionPlan.name}</strong> plan.</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between space-x-0">
                <BillingButton></BillingButton>

                {subscriptionPlan.isSubscribed ? <p className="rounded-full text-xs font-medium">
                    {subscriptionPlan.isCanceled ? 'Your plan will be canceled on ' : 'Your plan renews on '}
                    {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}
                </p> : null}
            </CardFooter>
        </Card>
    </MaxWidthWrapper>

      
  )
}

export default BillingForm
