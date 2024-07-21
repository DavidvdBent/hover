import Link from "next/link"
import MaxWidthWrapper from "./ui/MaxWidthWrapper"

const Footer = () => {
  return (
    <div className=' h-14 w-full border-t left-0 bottom-0 border-gray-200 bg-white mt-16  '>
    <MaxWidthWrapper>
        <div className='flex h-14 items-center border-b border-zinc-200 text-center mx-auto'>
            <Link href='/' className=" mx-auto">
                <span className='font-semibold text-xl mx-auto'>Hover.</span>
            </Link>
        </div>
    </MaxWidthWrapper>
    </div>
  )
}

export default Footer
