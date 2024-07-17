import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <div className="mt-28 mx-auto text-center">
          <h2 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">Expert Courses on Developing</h2>
          <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg mx-auto">From zero to hero in no time</p>
          <Link href="/courses"><Button className="mt-4">Discover our Courses<ArrowRight className="ml-2 h-5 w-5"/></Button></Link>
        </div>
        <Image className="mt-28 rounded-2xl"height={1160} width={1160} quality={100} src='/maxresdefault.jpg' alt=""/>
        <div className="mt-28 mx-auto text-center">
          <h3>Taught by Experts</h3>
          <p>Our Courses are given and manufactured by handpicked experts in this field. We thrive to give you the best of the best when it comes to knowledge and expertise</p>
        </div>

      </MaxWidthWrapper>
    </>
  );
}
