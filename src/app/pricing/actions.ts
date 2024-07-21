"use server"
import { PLANS } from "@/config/stripe"
import { db } from "@/db"
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const createStripeSession = async() => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    console.log('creating stripe session')

    if (!user?.id || !user.email) {
        throw new Error('Unauthorized')
    }
    const billingUrl = absoluteUrl("/dashboard/billing")

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })
    if (!dbUser){
        throw new Error('Unauthorized')
    }
    const subscriptionPlan = await getUserSubscriptionPlan()
    if(subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: dbUser.stripeCustomerId,
            return_url: billingUrl
        })

        return {url : stripeSession.url}
    }
    const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card", "paypal"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
            {
                price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
                quantity: 1
            }
        ],
        metadata: {
            userId: user.id
        }
    })
    return {url: stripeSession.url}
}