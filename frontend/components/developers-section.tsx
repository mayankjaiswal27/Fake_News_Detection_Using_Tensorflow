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
    <section className="py-16 px-8 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#233352] mb-4">Our Developers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the talented developers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((developer) => (
            <div
              key={developer.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              {/* ✅ Improved Image Container with Proper Height */}
              <div className="relative w-full" style={{ height: "320px" }}>
                <Image
                  src={developer.image || "/placeholder.svg"}
                  alt={developer.name}
                  fill
                  className="object-cover"
                  priority
                  suppressHydrationWarning // ✅ Fix for SSR/CSR mismatch
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

        {/* <div className="mt-16 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 bg-[#233352] text-white py-3 px-8 font-medium hover:bg-[#1a2640] transition-colors"
          >
            View Full Team <ChevronRight className="h-4 w-4" />
          </Link>
        </div> */}
      </div>
    </section>
  )
}
