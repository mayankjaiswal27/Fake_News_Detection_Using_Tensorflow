"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import DevelopersSection from "@/components/developers-section"
import { useEffect, useState } from "react"

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent hydration error

  return (
    <main className="min-h-screen">
      <div className="w-full bg-[#233352] text-white p-8 md:p-16 flex flex-col justify-center relative">
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-cover bg-center blur-md"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Fake News Detector
          </h1>
          <p className="text-xl md:text-2xl text-[#d1d0d0] mb-12 max-w-md mx-auto">
            AI-powered platform to detect misinformation and fake news.
          </p>
          <div className="flex justify-center">
            <Link
              href="/upload"
              className="flex items-center gap-2 bg-white text-[#233352] py-3 px-8 font-medium hover:bg-opacity-90 transition-colors"
            >
              GET STARTED <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Developers Section */}
      <DevelopersSection />
    </main>
  )
}