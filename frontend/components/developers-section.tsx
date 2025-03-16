import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { ChevronRight } from "lucide-react"

type Developer = {
  id: number
  name: string
  role: string
  image: string
  github?: string
  linkedin?: string
  twitter?: string
}

const developers: Developer[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Developer",
    image: "/placeholder.svg?height=300&width=300",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "UI/UX Designer",
    image: "/placeholder.svg?height=300&width=300",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Backend Developer",
    image: "/placeholder.svg?height=300&width=300",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
]

export default function DevelopersSection() {
  return (
    <section className="py-16 px-8 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#233352] mb-4">Our Developers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the talented team behind boots'4. Our developers bring years of experience and passion to every
            project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((developer) => (
            <div
              key={developer.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative h-80 w-full">
                <Image src={developer.image || "/placeholder.svg"} alt={developer.name} fill className="object-cover" />
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

        <div className="mt-16 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 bg-[#233352] text-white py-3 px-8 font-medium hover:bg-[#1a2640] transition-colors"
          >
            View Full Team <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

