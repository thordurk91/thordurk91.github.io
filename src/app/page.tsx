'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {LinkedinIcon, Play, Github} from "lucide-react"
import { Projects } from "@/components/projects";
import Banner from "@/components/banner";
import { useState, useEffect } from "react";

export default function Home() {

  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);
  useEffect(() => {
    // Function to check screen width
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 968);
    };

    // Check initial screen width
    checkScreenWidth();

    // Add event listener to check on resize
    window.addEventListener("resize", checkScreenWidth);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);
  return (
  <>
    {isWideScreen && <Banner />}
    {!isWideScreen && <div className="fixed w-screen h-screen" style={{backgroundImage:"url('/mobile-bg.png')", backgroundSize: "contain"}}/>}
    <div className="z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      
      <main className="max-w-screen-sm flex flex-col gap-4 row-start-2 items-center sm:items-start backdrop-blur-md rounded-lg p-2 pt-10 pb-10 lg:pl-20 lg:pr-20 border-2 border-emerald-950">
      <div className="flex w-full justify-between">
      <a className="mx-auto my-0" href="https://github.com/thordurk91"><Button className="border-white border-2 bg-black text-white hover:bg-zinc-800 hover:text-white hover:shadow-sm">GitHub<Github size="15"/></Button></a>
      <a className="mx-auto my-0" href="https://www.linkedin.com/in/thordur-sigvaldason/"><Button className="border-white border-2 bg-black text-white hover:bg-zinc-800 hover:text-white hover:shadow-sm">LinkedIn<LinkedinIcon size="15"/></Button></a>
      </div>
        <Image
          src="/hunda.png"
          alt="hunda logo"
          width={100}
          height={100}
          priority
          className="mx-auto my-0 rounded"
        />
      <a className="mx-auto my-0 hidden lg:block" href="/carnage/index.html"><Button className="bg-white text-black hover:bg-zinc-800 hover:text-white hover:shadow-sm"><Image className="animate-spin" src="/rockBig.png" width="20" height="20" alt="rock" />Verbal Carnage<Play size="15"/></Button></a>
      
      <Projects/>
      </main>
    </div>
    </>
  );
}
