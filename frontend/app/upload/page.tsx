"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, FileText, ImageIcon, Check, AlertCircle } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [processStatus, setProcessStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState<{ title: string; news: string; prediction?: string }>({
    title: "",
    news: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile)
        setProcessStatus("idle")
        setFormData({ title: "", news: "", prediction: undefined })
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
        setProcessStatus("idle")
        setFormData({ title: "", news: "", prediction: undefined })
      }
    }
  }

  const isValidFileType = (file: File) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    return validTypes.includes(file.type)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)

    try {
      const response = await fetch("https://fake-news-detection-using-tensorflow.onrender.com/upload", {
        method: "POST",
        body: formDataUpload,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()

      setFormData({ title: data.title, news: data.news, prediction: undefined })
      setProcessStatus("success")
    } catch (error) {
      setProcessStatus("error")
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false) // Reset upload state
    }
  }

  const handleAnalyze = async () => {
    if (!formData.title) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("https://fake-news-detection-using-tensorflow.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title, news: formData.news }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()
      setFormData({ ...formData, prediction: data.prediction })
      setProcessStatus("success")
    } catch (error) {
      setProcessStatus("error")
      console.error("Analysis error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getFileIcon = () => {
    if (!file) return null

    if (file.type === "application/pdf") {
      return <FileText className="w-16 h-16 text-[#c41c1c]" />
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return <FileText className="w-16 h-16 text-[#1e90ff]" />
    } else {
      return <ImageIcon className="w-16 h-16 text-[#0a7c2e]" />
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[30%_70%]">
      <div className="relative bg-[#233352] text-white p-8 md:p-12 flex flex-col justify-center">
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-cover bg-center blur-md"></div>
        </div>
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-8 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Upload
            <br />
            Your File
          </h1>
          <p className="text-lg md:text-xl text-[#d1d0d0] mb-12 max-w-xs">
            We accept PDF, JPG, TXT, and DOCX files, or type your content to check authenticity.
          </p>
          <div className="space-y-4 text-[#d1d0d0]">
            <p className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" /> Fast processing
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" /> Multiple formats
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-5 w-5 text-white" /> Advanced tools
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#f5f5f5] flex items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Enter title here"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={formData.news}
                onChange={(e) => setFormData({ ...formData, news: e.target.value })}
                className="w-full p-2 border rounded-md h-32"
                placeholder="Enter content here"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !formData.title}
              className={`w-full bg-[#233352] text-white py-3 px-6 rounded-md hover:bg-[#1a2640] transition-colors ${
                isAnalyzing || !formData.title ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Text"}
            </button>
            {formData.prediction && (
              <div className="text-center font-medium">
                <p className={formData.prediction === "This news is True" ? "text-[#0a7c2e]" : "text-[#c41c1c]"}>
                  {formData.prediction}
                </p>
              </div>
            )}
          </div>

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
                  accept=".pdf,.jpg,.jpeg,.txt,.docx"
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
                {processStatus === "idle" && (
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
                {processStatus === "success" && (
                  <div className="flex items-center justify-center gap-2 text-[#0a7c2e] font-medium">
                    <Check className="h-5 w-5" /> Upload successful!
                  </div>
                )}
                {processStatus === "error" && (
                  <div className="flex items-center justify-center gap-2 text-[#c41c1c] font-medium">
                    <AlertCircle className="h-5 w-5" /> Upload failed. Please try again.
                  </div>
                )}
                <button
                  onClick={() => {
                    setFile(null)
                    setProcessStatus("idle")
                    setFormData({ title: "", news: "", prediction: undefined })
                  }}
                  className="text-[#233352] underline"
                >
                  Choose a different file
                </button>
              </div>
            )}
          </div>

          <div className="text-center text-gray-600">
            <p>Supported file types: PDF, JPG, TXT, DOCX</p>
            <p className="mt-2">Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
    </main>
  )
}