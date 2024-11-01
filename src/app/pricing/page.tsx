import UpgradeButton from '@/components/UpgradeButton'
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'
import Link from 'next/link'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'Curious about our content?',
      quota: 2,
      features: [
        {
          text: 'Free Starter Courses',
        },
        {
          text: 'Advertising Free',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'High-quality Premium Courses',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'Become A Pro in no Time',
      quota: 3,
      features: [
        {
          text: 'Free Starter Courses',
        },
        {
          text: 'Advertising Free',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'High-quality Premium Courses',
        },
        {
          text: 'Priority support',
        },
      ],
    },
  ]

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-10 text-center max-w-5xl pb-20'>
        <div className='mx-auto sm:max-w-lg'>
          <h2 className="text-center mt-5 text-5xl pb-4">Pricing</h2>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Whether you&apos;re just trying out our courses
            or you want to become a pro.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
            {pricingItems.map(
              ({ plan, tagline, quota, features }) => {
                const price =
                  PLANS.find(
                    (p) => p.slug === plan.toLowerCase()
                  )?.price.amount || 0

                return (
                  <div
                    key={plan}
                    className={cn(
                      'relative rounded-2xl bg-white shadow-lg',
                      {
                        'border-2 border-blue-600 shadow-blue-200':
                          plan === 'Pro',
                        'border border-gray-200':
                          plan !== 'Pro',
                      }
                    )}>
                    {plan === 'Pro' && (
                      <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                        Upgrade now
                      </div>
                    )}

                    <div className='p-5'>
                      <h3 className='my-3 text-center font-display text-3xl font-bold'>
                        {plan}
                      </h3>
                      <p className='text-gray-500'>
                        {tagline}
                      </p>
                      <p className='my-5 font-display text-6xl font-semibold'>
                        ${price}
                      </p>
                      <p className='text-gray-500'>
                        per month
                      </p>
                    </div>

                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                      <div className='flex items-center space-x-1'>
                        <p>
                          {quota.toLocaleString()} {plan} Courses
                        </p>

       
                      </div>
                    </div>

                    <ul className='my-10 space-y-5 px-8'>
                      {features.map(
                        ({ text, negative }) => (
                          <li
                            key={text}
                            className='flex space-x-5'>
                            <div className='flex-shrink-0'>
                              {negative ? (
                                <Minus className='h-6 w-6 text-gray-300' />
                              ) : (
                                <Check className='h-6 w-6 text-blue-500' />
                              )}
                            </div>
                            { (
                              <p
                                className={cn(
                                  'text-gray-600',
                                  {
                                    'text-gray-400':
                                      negative,
                                  }
                                )}>
                                {text}
                              </p>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                    <div className='border-t border-gray-200' />
                    <div className='p-5'>
                      {plan === 'Free' ? (
                        <Link
                          href={
                            user ? '/dashboard' : '/sign-up'
                          }
                          className={buttonVariants({
                            className: 'w-full',
                            variant: 'secondary',
                          })}>
                          {user ? 'Our Courses' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      ) : user ? (
                        <UpgradeButton/>
                      ) : (
                        <Link
                          href='/sign-up'
                          className={buttonVariants({
                            className: 'w-full',
                          })}>
                          {user ? 'Upgrade now' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              }
            )}
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Page