import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { ChevronRight } from "lucide-react"

import HarshitaImage from "@/components/images/Harshita.png"
import MayankImage from "@/components/images/Mayank.jpg"

type Developer = {
  id: number
  name: string
  role: string
  image: string | StaticImageData
  github?: string
  linkedin?: string
  twitter?: string
}

const developers: Developer[] = [
  {
    id: 1,
    name: "Harshita Khare",
    role: "Developer",
    image: HarshitaImage,
    github: "https://github.com/HarshitaKhare28",
    linkedin: "https://www.linkedin.com/in/harshita-khare-a5152625a/",
  },
  {
    id: 2,
    name: "Mayank Jaiswal",
    role: "Developer",
    image: MayankImage,
    github: "https://github.com/mayankjaiswal27",
    linkedin: "https://www.linkedin.com/in/mayank-jaiswal-2479a9248/",
    twitter: "https://x.com/jaiswalmayank27",
  },
]

export default function DevelopersSection() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 py-16 px-8 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#233352] mb-4">Developers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the talented developers
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-14">
            {developers.map((developer) => (
              <div
                key={developer.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)]"
              >
                <div className="relative w-full" style={{ height: "320px" }}>
                  <Image
                    src={developer.image || "/placeholder.svg"}
                    alt={developer.name}
                    fill
                    className="object-cover"
                    priority
                    suppressHydrationWarning
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#233352]">{developer.name}</h3>
                  <p className="text-gray-600 mb-4">{developer.role}</p>

                  <div className="flex space-x-4">
                    {developer.github && (
                      <Link href={developer.github} className="text-gray-600 hover:text-[#233352]">
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                    {developer.linkedin && (
                      <Link href={developer.linkedin} className="text-gray-600 hover:text-[#233352]">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                    {developer.twitter && (
                      <Link href={developer.twitter} className="text-gray-600 hover:text-[#233352]">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white rounded-lg shadow-sm w-full mt-auto dark:bg-gray-800 text-center p-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          © 2025 Fake News Detector. All rights reserved.
        </span>
      </footer>
    </div>
  )
}