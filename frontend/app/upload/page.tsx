"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, FileText, ImageIcon, Check, AlertCircle } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile)
        setUploadStatus("idle")
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (isValidFileType(droppedFile)) {
        setFile(droppedFile)
        setUploadStatus("idle")
      }
    }
  }

  const isValidFileType = (file: File) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg"]
    return validTypes.includes(file.type)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setUploadStatus(Math.random() > 0.2 ? "success" : "error")
    }, 2000)

    // In a real application, you would upload the file to your server:
    // const formData = new FormData()
    // formData.append('file', file)
    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   if (response.ok) {
    //     setUploadStatus('success')
    //   } else {
    //     setUploadStatus('error')
    //   }
    // } catch (error) {
    //   setUploadStatus('error')
    // } finally {
    //   setIsUploading(false)
    // }
  }

  const getFileIcon = () => {
    if (!file) return null

    if (file.type === "application/pdf") {
      return <FileText className="w-16 h-16 text-[#c41c1c]" />
    } else {
      return <ImageIcon className="w-16 h-16 text-[#0a7c2e]" />
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section */}
      <div className="relative bg-[#233352] text-white p-8 md:p-16 flex flex-col justify-center">
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-cover bg-center blur-md"></div>
        </div>
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-8 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Upload
            <br />
            Your File
          </h1>
          <p className="text-xl md:text-2xl text-[#d1d0d0] mb-12 max-w-md">
            We accept PDF and JPG files for processing. Simply drag and drop or select your file to get started.
          </p>
          <div className="space-y-4 text-[#d1d0d0]">
            <p className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" /> Fast and secure processing
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" /> Support for multiple file formats
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" /> Advanced analysis tools
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Upload Area */}
      <div className="bg-[#f5f5f5] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-[#233352] bg-[#233352]/10" : "border-gray-300"
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <Upload className="w-16 h-16 mx-auto mb-4 text-[#233352]" />
                <h2 className="text-2xl font-bold text-[#233352] mb-2">Drag & Drop</h2>
                <p className="text-gray-600 mb-6">or click to browse your files</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#233352] text-white py-3 px-6 rounded-md hover:bg-[#1a2640] transition-colors"
                >
                  Select File
                </button>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  {getFileIcon()}
                  <h3 className="text-xl font-semibold mt-4">{file.name}</h3>
                  <p className="text-gray-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>

                {uploadStatus === "idle" && (
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className={`w-full bg-[#233352] text-white py-3 px-6 rounded-md hover:bg-[#1a2640] transition-colors ${
                      isUploading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUploading ? "Uploading..." : "Upload File"}
                  </button>
                )}

                {uploadStatus === "success" && (
                  <div className="flex items-center justify-center gap-2 text-[#0a7c2e] font-medium">
                    <Check className="h-5 w-5" /> Upload successful!
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="flex items-center justify-center gap-2 text-[#c41c1c] font-medium">
                    <AlertCircle className="h-5 w-5" /> Upload failed. Please try again.
                  </div>
                )}

                <button
                  onClick={() => {
                    setFile(null)
                    setUploadStatus("idle")
                  }}
                  className="text-[#233352] underline"
                >
                  Choose a different file
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>Supported file types: PDF, JPG</p>
            <p className="mt-2">Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
    </main>
  )
}

