"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  downloadLabel?: string
}

export function VideoPlayer({ videoUrl, downloadLabel = "Download" }: VideoPlayerProps) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = videoUrl
    link.download = "video.mp4"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden bg-black/20">
        <video
          src={videoUrl}
          controls
          className="w-full h-auto rounded-xl"
          poster="/placeholder.svg?height=300&width=500"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <Button
        onClick={handleDownload}
        className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
      >
        <Download className="w-5 h-5 mr-3" />
        {downloadLabel}
      </Button>
    </div>
  )
}
