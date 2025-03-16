import Link from "next/link"
import { ChevronRight } from "lucide-react"
import DevelopersSection from "@/components/developers-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div className="relative bg-[#233352] text-white p-8 md:p-16 flex flex-col justify-center">
          <div className="absolute inset-0 opacity-30 overflow-hidden">
            <div className="w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-cover bg-center blur-md"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              FAKE NEWS DETECTOR
              <br />

            </h1>
            <p className="text-xl md:text-2xl text-[#d1d0d0] mb-12 max-w-md">
             Developed by Harshita Khare and Mayank Jaiswal
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* <Link
                href="#quote"
                className="border-2 border-white py-3 px-8 text-center font-medium hover:bg-white hover:text-[#233352] transition-colors"
              >
                GET STARTED
              </Link> */}
              <Link
                href="/upload"
                className="flex items-center justify-center gap-2 bg-white text-[#233352] py-3 px-8 font-medium hover:bg-opacity-90 transition-colors"
              >
                GET STARTED <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Hero Image */}
        {/* <div className="bg-gradient-to-b from-[#233352] to-[#1a2640] flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Upload Your Files</h2>
            <p className="text-xl text-[#d1d0d0] mb-8">
              Get started by uploading your PDF or JPG files for processing.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#233352] py-3 px-8 font-medium hover:bg-opacity-90 transition-colors"
            >
              GET STARTED <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div> */}
      </div>

      {/* Developers Section */}
      <DevelopersSection />
    </main>
  )
}
