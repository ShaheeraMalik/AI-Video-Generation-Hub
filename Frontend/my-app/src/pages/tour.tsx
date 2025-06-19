"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { startTourVideo, getTourStatus, type StartJobResponse, type StatusResponse } from "../lib/api"
import type { TourStyle, TourVideoRequest } from "../lib/types"
import { VideoPlayer } from "../components/VideoPlayer"
import {
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Sparkles,
  Play,
  Download,
  Share2,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Star,
  Globe,
  Building,
} from "lucide-react"
import Link from "next/link"

const LISTING: Omit<TourVideoRequest, "style"> = {
  address: "12012 Crest Ct, Beverly Hills, CA 90210",
  price: 10183985,
  beds: 5,
  baths: 6.5,
  sqft: 6100,
  features: [
    "Luxury estate",
    "three-car garage",
    "landscaped grounds",
    "elegant entrance with grand staircase",
    "modern design",
    "prime Beverly Hills location",
  ],
}

export default function TourPage() {
  const [style, setStyle] = useState<TourStyle>("luxury")
  const [jobId, setJobId] = useState<string>("")
  const [status, setStatus] = useState<"pending" | "complete" | "failed" | "">("")
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  // AI visualization
  const [showAIVisualization, setShowAIVisualization] = useState(false)
  const [localVideoUrl, setLocalVideoUrl] = useState<string>("")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Poll status - ORIGINAL FUNCTIONALITY
  useEffect(() => {
    if (!jobId) return
    setStatus("pending")
    setError("")
    const interval = setInterval(async () => {
      try {
        const res: StatusResponse = await getTourStatus(jobId)
        setStatus(res.status)
        setMessage(res.message)

        if (res.status === "complete" && res.videoUrl) {
          setVideoUrl(res.videoUrl)
          clearInterval(interval)
        }
        if (res.status === "failed") {
          clearInterval(interval)
          setError(res.message)
        }
      } catch {
        clearInterval(interval)
        setError("Failed to fetch tour status.")
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [jobId])

  // Kick off tour job - ORIGINAL FUNCTIONALITY + AI visualization
  const handleGenerate = async () => {
    setError("")
    setMessage("")
    setVideoUrl("")
    setJobId("")

    // Start AI visualization
    setShowAIVisualization(true)
    setLocalVideoUrl("")

    // Show local video as preview after 3 seconds
    setTimeout(() => {
      setLocalVideoUrl("/assets/tour.mp4")
    }, 3000)

    // Hide AI visualization after 8 seconds
    setTimeout(() => {
      setShowAIVisualization(false)
    }, 8000)

    try {
      const payload: TourVideoRequest = { ...LISTING, style }
      const res: StartJobResponse = await startTourVideo(payload)
      setJobId(res.jobId)
      setMessage(res.message)
    } catch {
      setError("Something went wrong. Try again.")
      setShowAIVisualization(false) // Hide visualization on error
    }
  }

  const styleOptions = [
    {
      value: "luxury",
      label: "Luxury",
      icon: "💎",
      color: "from-yellow-500 to-orange-500",
      description: "Elegant and sophisticated presentation",
    },
    {
      value: "family-friendly",
      label: "Family-Friendly",
      icon: "👨‍👩‍👧‍👦",
      color: "from-green-500 to-emerald-500",
      description: "Warm and welcoming atmosphere",
    },
    {
      value: "modern minimalist",
      label: "Modern Minimalist",
      icon: "🏢",
      color: "from-blue-500 to-cyan-500",
      description: "Clean and contemporary style",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-bounce" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30">
              <Globe className="w-4 h-4 mr-2" />
              Real Estate Tours
            </Badge>
          </div>

          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Real Estate
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Tour Generator
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Create stunning virtual property tours that showcase your listings in the best light
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Property Details & Configuration */}
            <div className="space-y-6">
              {/* Property Details Card */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Home className="w-6 h-6 mr-3 text-blue-400" />
                    Property Details
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Beverly Hills luxury estate ready for tour generation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <Label className="text-white font-medium">Address</Label>
                      <p className="text-gray-300 text-lg">{LISTING.address}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <Label className="text-white font-medium">Price</Label>
                      <p className="text-gray-300 text-2xl font-bold">${LISTING.price.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <Bed className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{LISTING.beds}</div>
                      <div className="text-gray-400 text-sm">Bedrooms</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <Bath className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{LISTING.baths}</div>
                      <div className="text-gray-400 text-sm">Bathrooms</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <Square className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{LISTING.sqft.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">Sq Ft</div>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Features */}
                  <div>
                    <Label className="text-white font-medium flex items-center mb-3">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      Key Features
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {LISTING.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-white/10 text-gray-300 border-white/20 justify-start"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tour Style Selection */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Building className="w-5 h-5 mr-3 text-purple-400" />
                    Tour Style
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Choose the presentation style for your virtual tour
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {styleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setStyle(option.value as TourStyle)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left ${
                          style === option.value
                            ? "border-blue-500 bg-gradient-to-r " + option.color + " bg-opacity-20"
                            : "border-white/20 bg-white/5 hover:border-white/40"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{option.icon}</div>
                          <div className="flex-1">
                            <div className="text-white font-medium text-lg">{option.label}</div>
                            <div className="text-gray-400 text-sm">{option.description}</div>
                          </div>
                          {style === option.value && <CheckCircle className="w-6 h-6 text-blue-400" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Error Display */}
                  {error && (
                    <Alert className="border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={status === "pending"}
                    className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === "pending" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Generating Tour...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Generate Virtual Tour
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Status & Preview Section */}
            <div className="space-y-6">
              {/* AI Visualization */}
              {showAIVisualization && (
                <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      {/* Main AI Brain Animation */}
                      <div className="relative mx-auto w-32 h-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
                        <div className="absolute inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce"></div>
                        <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                          <Home className="w-8 h-8 text-blue-500 animate-spin" />
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="relative h-20">
                        <div className="absolute left-1/4 top-0 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="absolute right-1/4 top-2 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                        <div className="absolute left-1/3 bottom-0 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                        <div className="absolute right-1/3 bottom-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-400"></div>
                        <div className="absolute left-1/2 top-1 w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-500"></div>
                      </div>

                      {/* AI Status Text */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">🏠 AI Creating Your Tour</h3>
                        <p className="text-gray-300">Our AI is crafting a stunning virtual property tour...</p>
                      </div>

                      {/* Animated Progress Dots */}
                      <div className="flex justify-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                        <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status Card */}
              {(message || status) && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Globe className="w-5 h-5 mr-3 text-green-400" />
                      Generation Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {status === "pending" && (
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                        <span className="text-white">Creating your virtual tour...</span>
                      </div>
                    )}

                    {status === "complete" && (
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white">Virtual tour generated successfully!</span>
                      </div>
                    )}

                    {status === "failed" && (
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">Generation failed. Please try again.</span>
                      </div>
                    )}

                    {message && (
                      <Alert className="border-blue-500/50 bg-blue-500/10">
                        <AlertDescription className="text-blue-300">{message}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Local Video Preview */}
              {localVideoUrl && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Star className="w-5 h-5 mr-3 text-yellow-400" />
                      Tour Preview Sample
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Here's a sample of what your test video might look like!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <VideoPlayer
                      videoUrl={localVideoUrl}
                      downloadLabel="Download Preview"
                    />
                    <Badge className="w-full justify-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30">
                      Sample Preview - Your actual test video is being generated
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {/* Server Video Result */}
              {videoUrl && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Play className="w-5 h-5 mr-3 text-blue-400" />
                      Your Virtual Tour
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Your AI-generated property tour is ready to showcase!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-xl overflow-hidden bg-black/20">
                      <VideoPlayer videoUrl={videoUrl} />
                    </div>
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tips Card */}
              {!jobId && !showAIVisualization && (
                <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center">
                      <Sparkles className="w-5 h-5 mr-3 text-blue-400" />
                      Tour Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Luxury style works best for high-end properties and premium listings
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Family-friendly tours emphasize comfort and livability for potential buyers
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Modern minimalist style highlights clean lines and contemporary features
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
