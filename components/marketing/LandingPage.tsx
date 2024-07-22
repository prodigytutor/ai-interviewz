import EmailForm from "./EmailForm";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import  Script  from "next/script";


export default function LandingPage() {

return (
  <>
    <Toaster />

    <section className="w-screen h-dvh grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-black md:h-full h-80 bg-[#C9F9D1] relative overflow-hidden">
        <Image
          src="/ai-interviews-black.png" // Replace with your image
          alt="AI Mock Interview App"
          fill
          className=""
        />
      </div>

      <main className="flex flex-col gap-8 mt-8 justify-center px-6 pb-10">
        <div className="mb-4 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <h2 className="text-2xl">Ace Your Next Interview with</h2> <h1 className="text-4xl">AI Interviewz!</h1>
        </div>

        <h2 className="mb-4 text-xl text-primary font-extrabold tracking-tight leading-none text-gray-900 md:text-xl lg:text-xl dark:text-white">
          Stop worrying about interview jitters. 
        </h2>
        <h3 className="mb-4 text-lg text-primary font-extrabold tracking-tight leading-none text-gray-900 md:text-lg lg:text-lg dark:text-white">Get personalized feedback and practice your answers with our AI-powered mock interviews.</h3>
        <ul className="list-disc list-inside text-gray-500">
          <li>Practice with realistic interview questions tailored to your role.</li>
          <li>Get instant feedback on your answers, including tone, clarity, and confidence.</li>
          <li>Track your progress and identify areas for improvement.</li>
        </ul>
        <p> &nbsp; </p>
        <p className="mb-8 mt-15 bg-black text-white text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Ready to level up your interview skills? <br /> Sign up for early access today!
        </p>

        <EmailForm />
      </main>
    </section>
    <Script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=RidgQb"></Script>
  </>
);
}