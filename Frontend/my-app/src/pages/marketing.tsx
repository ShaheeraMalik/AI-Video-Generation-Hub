"use client"

import type React from "react"
import { useState, type FormEvent, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Sparkles,
  Zap,
  Users,
  Palette,
  Play,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Star,
  Camera,
  X,
  TestTube,
} from "lucide-react"
import Link from "next/link"

export default function MarketingPage() {
  const [features, setFeatures] = useState("Boosts energy, Sugar-free")
  const [tone, setTone] = useState("energetic")
  const [audience, setAudience] = useState("athletes")
  const [style, setStyle] = useState("modern")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [videoUrl, setVideoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // AI visualization
  const [showAIVisualization, setShowAIVisualization] = useState(false)
  const [localVideoUrl, setLocalVideoUrl] = useState<string>("")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Start AI visualization
    setShowAIVisualization(true)
    setLocalVideoUrl("")
    setVideoUrl("")

    // Show local video as preview after 3 seconds
    setTimeout(() => {
      setLocalVideoUrl("/assets/video-m.mp4")
    }, 3000)

    // Hide AI visualization after 8 seconds
    setTimeout(() => {
      setShowAIVisualization(false)
    }, 8000)

    try {
      const form = new FormData()
      // features as JSON string
      form.append(
        "features",
        JSON.stringify(
          features
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f),
        ),
      )
      form.append("tone", tone)
      form.append("audience", audience)
      form.append("style", style)
      if (imageFile) {
      form.append("image", imageFile)
      }

      const res = await axios.post<{ videoUrl: string }>("http://localhost:4000/api/video/marketing", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setVideoUrl(res.data.videoUrl)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
      setShowAIVisualization(false) // Hide visualization on error
    } finally {
      setLoading(false)
    }
  }

  const toneOptions = [
    { value: "energetic", label: "Energetic", icon: "⚡", color: "from-orange-500 to-red-500" },
    { value: "calm", label: "Calm", icon: "🧘", color: "from-blue-500 to-indigo-500" },
    { value: "professional", label: "Professional", icon: "💼", color: "from-gray-500 to-slate-500" },
  ]

  const audienceOptions = [
    { value: "athletes", label: "Athletes", icon: "🏃", color: "from-green-500 to-emerald-500" },
    { value: "students", label: "Students", icon: "🎓", color: "from-blue-500 to-cyan-500" },
    { value: "professionals", label: "Professionals", icon: "👔", color: "from-purple-500 to-pink-500" },
  ]

  const styleOptions = [
    { value: "modern", label: "Modern", icon: "✨", color: "from-pink-500 to-rose-500" },
    { value: "playful", label: "Playful", icon: "🎉", color: "from-yellow-500 to-orange-500" },
    { value: "cinematic", label: "Cinematic", icon: "🎬", color: "from-indigo-500 to-purple-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-800 via-purple-800 to-pink-800">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-2xl animate-bounce" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30">
              <TestTube className="w-4 h-4 mr-2" />
              Marketing Studio
            </Badge>
          </div>

          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              Marketing
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Video Generator
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experiment and test your marketing video concepts with our advanced AI technology
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <TestTube className="w-6 h-6 mr-3 text-orange-400" />
                  Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your marketing video parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={submit} className="space-y-6">
                  {/* Features Input */}
                  <div className="space-y-3">
                    <Label htmlFor="features" className="text-white font-medium flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      Key Features
                    </Label>
                    <Input
                      id="features"
                      type="text"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-500 transition-colors"
                      placeholder="e.g. Boosts energy, Sugar-free"
                    />
                    <p className="text-sm text-gray-400">Separate multiple features with commas</p>
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium flex items-center">
                      <Camera className="w-4 h-4 mr-2 text-orange-400" />
                      Upload Image (Optional)
                    </Label>

                    {!imagePreview ? (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          id="image-upload"
                        />
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors bg-white/5 hover:bg-white/10">
                          <div className="space-y-3">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                              <Camera className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Upload Image</p>
                              <p className="text-gray-400 text-sm">Click to browse or drag and drop</p>
                              <p className="text-gray-500 text-xs mt-1">PNG, JPG, JPEG up to 10MB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-xl overflow-hidden bg-black/20">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Selected image"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            onClick={removeImage}
                            variant="destructive"
                            size="sm"
                            className="bg-red-500/80 hover:bg-red-600/80"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-orange-500/80 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ready
                        </Badge>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Tone Selection */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-purple-400" />
                      Video Tone
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {toneOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setTone(option.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            tone === option.value
                              ? "border-orange-500 bg-gradient-to-r " + option.color + " bg-opacity-20"
                              : "border-white/20 bg-white/5 hover:border-white/40"
                          }`}
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-white font-medium text-sm">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audience Selection */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      Target Audience
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {audienceOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setAudience(option.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            audience === option.value
                              ? "border-blue-500 bg-gradient-to-r " + option.color + " bg-opacity-20"
                              : "border-white/20 bg-white/5 hover:border-white/40"
                          }`}
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-white font-medium text-sm">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Selection */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium flex items-center">
                      <Palette className="w-4 h-4 mr-2 text-pink-400" />
                      Video Style
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {styleOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setStyle(option.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            style === option.value
                              ? "border-pink-500 bg-gradient-to-r " + option.color + " bg-opacity-20"
                              : "border-white/20 bg-white/5 hover:border-white/40"
                          }`}
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-white font-medium text-sm">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <Alert className="border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Generate Video
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Status & Preview Section */}
            <div className="space-y-6">
              {/* AI Visualization */}
              {showAIVisualization && (
                <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      {/* Main AI Brain Animation */}
                      <div className="relative mx-auto w-32 h-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping"></div>
                        <div className="absolute inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce"></div>
                        <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                          <TestTube className="w-8 h-8 text-purple-500 animate-spin" />
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="relative h-20">
                        <div className="absolute left-1/4 top-0 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                        <div className="absolute right-1/4 top-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                        <div className="absolute left-1/3 bottom-0 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                        <div className="absolute right-1/3 bottom-2 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-400"></div>
                        <div className="absolute left-1/2 top-1 w-2 h-2 bg-red-400 rounded-full animate-bounce delay-500"></div>
                      </div>

                      {/* AI Status Text */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">🧪 AI in Progress</h3>
                        <p className="text-gray-300">Our AI is experimenting with your video concept...</p>
                      </div>

                      {/* Animated Progress Dots */}
                      <div className="flex justify-center space-x-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-100"></div>
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                        <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Local Video Preview */}
              {localVideoUrl && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Star className="w-5 h-5 mr-3 text-yellow-400" />
                      Preview Sample
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Here's a sample of what your video might look like!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-xl overflow-hidden bg-black/20">
                      <video
                        src={localVideoUrl}
                        controls
                        className="w-full h-auto rounded-xl"
                        poster="/placeholder.svg?height=300&width=500"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        asChild
                        className="flex-1 h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 text-white"
                      >
                        <a href={localVideoUrl} download className="flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download Preview
                        </a>
                      </Button>
                    </div>
                    <Badge className="w-full justify-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30">
                      Sample Preview - Your actual video is being generated
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {/* Server Video Result */}
              {videoUrl && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Play className="w-5 h-5 mr-3 text-orange-400" />
                      Your Video
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Your AI-generated marketing video is ready!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-xl overflow-hidden bg-black/20">
                      <video src={videoUrl} controls className="w-full h-auto rounded-xl">
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        asChild
                        className="flex-1 h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 text-white"
                      >
                        <a href={videoUrl} download className="flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download Video
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tips Card */}
              {!loading && !videoUrl && (
                <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center">
                      <Sparkles className="w-5 h-5 mr-3 text-purple-400" />
                      Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Upload a high-quality image that represents your product or concept clearly
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Test different combinations of tone, audience, and style for optimal results
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Use specific, compelling features that highlight your product's unique benefits
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