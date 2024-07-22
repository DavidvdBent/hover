import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Gem, GraduationCap, MegaphoneOff} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Page from "./pricing/page";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <div className="mt-28 mx-auto text-center">
          <h2 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">Expert Courses on <span className="text-blue-500">Developing</span></h2>
          <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg mx-auto">From zero to hero in no time</p>
          <Link href="/courses"><Button className="mt-4">Discover our Courses<ArrowRight className="ml-2 h-5 w-5"/></Button></Link>
        </div>
        <Image className="mt-28 rounded-2xl"height={1160} width={1160} quality={100} src='/maxresdefault.jpg' alt=""/>
        <div className="mt-24 grid md:grid-cols-2 grid-cols-1 gap-16">
          <div>
            <Gem className="text-blue-500 text-2xl mx-auto my-3"/>
            <h3 className="text-blue-500 border-b-2 border-gray-400 pb-4 text-xl sm:text-2xl w-[250px] mx-auto">High Quality Courses</h3>
            <p className=" text-gray-600 sm:text-lg mt-4 w-[250px] sm:w-[400px] mx-auto md:mx-0 md:w-auto">Our High Quality Courses are designed by top-tier professionals with extensive experience. We aim to provide unmatched learning experiences, ensuring you gain the best knowledge and skills in the industry.</p>
          </div>
          <div>
            <GraduationCap className="text-blue-500 text-2xl mx-auto my-3"/>
            <h3 className="text-blue-500 text-xl sm:text-2xl border-b-2 border-gray-400 pb-4 w-[250px] mx-auto">Taught by Experts</h3>
            <p className="text-gray-600 sm:text-lg mt-4 w-[250px] sm:w-[400px] mx-auto md:mx-0 md:w-auto">Our courses are Taught By Experts who are leaders in their fields. With years of experience, they provide you with comprehensive knowledge and practical skills, ensuring you receive the highest quality education available.</p>
          </div>
          <div>
            <MegaphoneOff className="text-blue-500 text-2xl mx-auto my-3"/>
            <h3 className="text-blue-500 text-xl sm:text-2xl border-b-2 border-gray-400 pb-4 w-[250px] mx-auto">Advertising Free</h3>
            <p className="text-gray-600 sm:text-lg mt-4 w-[250px] sm:w-[400px] mx-auto md:mx-0 md:w-auto">Our platform is entirely Advertising Free, focusing solely on delivering great content. Enjoy an uninterrupted learning experience, crafted by experts, ensuring you receive top-notch education without distractions.</p>
          </div>
          <div>
            <DollarSign className="text-blue-500 text-2xl mx-auto my-3"/>
            <h3 className="text-blue-500 text-xl sm:text-2xl border-b-2 border-gray-400 pb-4 w-[250px] mx-auto">Refund</h3>
            <p className="text-gray-600 sm:text-lg mt-4 w-[250px] sm:w-[400px] mx-auto md:mx-0 md:w-auto">Our Refund policy guarantees your satisfaction. If our courses don&apos;t meet your expectations, we offer a hassle-free refund process. We are committed to ensuring you receive the best value and learning experience, risk-free.</p>
          </div>
        </div>
        <Image className="mt-28 mb-10 rounded-2xl"height={1160} width={1160} quality={100} src='/max.jpg' alt=""/>
        <Page/>
        <h2 className="max-w-3xl text-3xl font-bold md:text-3xl lg:text-4xl">Start <span className="text-blue-500">learning</span> today</h2>
          <p className="mt-2 max-w-prose text-zinc-700 sm:text-lg mx-auto">with our Free &amp; Premium courses</p>
          <RegisterLink><Button className="mt-8 px-8">Register and enjoy!<ArrowRight className="ml-2 h-5 w-5"/></Button></RegisterLink>
      </MaxWidthWrapper>
    </>
  );
}
