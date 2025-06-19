"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Sparkles,
  Zap,
  Camera,
  Film,
  Wand2,
  Rocket,
  Star,
  Users,
  TrendingUp,
  ChevronRight,
  Globe,
  Heart,
  Download,
  Share2,
  Eye,
  Building,
  ArrowRight,
  Flame,
  Crown,
} from "lucide-react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { label: "Videos Generated", value: "2.5M+", icon: Film },
    { label: "Happy Creators", value: "150K+", icon: Users },
    { label: "Processing Speed", value: "10x", icon: Zap },
    { label: "Success Rate", value: "99.9%", icon: TrendingUp },
  ]

  const features = [
    {
      title: "Text to Video Magic",
      description: "Transform your ideas into stunning videos with just a text prompt",
      icon: Wand2,
      color: "from-purple-500 to-pink-500",
      href: "/text-to-video",
    },
    {
      title: "Image to Video Pro",
      description: "Bring your static images to life with AI-powered animation",
      icon: Camera,
      color: "from-blue-500 to-cyan-500",
      href: "/image-to-video",
    },
    {
      title: "Marketing Mastery",
      description: "Create compelling marketing videos that convert viewers to customers",
      icon: Rocket,
      color: "from-orange-500 to-red-500",
      href: "/marketing",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "This platform revolutionized my content creation process. The quality is mind-blowing!",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Our conversion rates increased by 300% using these AI-generated videos.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Real Estate Agent",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Property tours have never looked this professional. Clients are amazed!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              VideoAI Pro
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Video Generation
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Create Stunning
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Videos
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your imagination into breathtaking videos with our cutting-edge AI technology. From text prompts
              to stunning visuals in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Creating Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4 rounded-full"
              >
                <Eye className="w-6 h-6 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Access Dashboard - MOVED UP */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Creative Path
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select your preferred video generation method and start creating magic
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Marketing Videos Button */}
            <Link href="/marketing">
              <div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 cursor-pointer"
                onMouseEnter={() => setHoveredButton("marketing")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-2xl animate-pulse group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-bounce group-hover:animate-pulse transition-all duration-500" />

                  {/* Floating particles */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60" />
                  <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-80" />
                  <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-70" />
                </div>

                <div className="relative p-8 md:p-12">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Rocket className="w-8 h-8 text-white" />
                        </div>
                        {hoveredButton === "marketing" && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                            <Flame className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/40 px-3 py-1">
                        <Crown className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                    <ArrowRight className="w-6 h-6 text-orange-400 group-hover:translate-x-2 group-hover:text-orange-300 transition-all duration-300" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-orange-100 transition-colors duration-300">
                    Marketing Videos
                  </h3>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    Create compelling marketing content that converts viewers into customers with AI-powered
                    storytelling
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-orange-300">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      <span>High Conversion</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-100" />
                      <span>Brand Focused</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200" />
                      <span>Fast Results</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
              </div>
            </Link>

            {/* Real Estate Tours Button */}
            <Link href="/tour">
              <div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer"
                onMouseEnter={() => setHoveredButton("realestate")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-2xl animate-pulse group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-bounce group-hover:animate-pulse transition-all duration-500" />

                  {/* Floating particles */}
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" />
                  <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-80" />
                  <div className="absolute bottom-1/3 right-2/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-70" />
                </div>

                <div className="relative p-8 md:p-12">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Building className="w-8 h-8 text-white" />
                        </div>
                        {hoveredButton === "realestate" && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center animate-bounce">
                            <Flame className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/40 px-3 py-1">
                        <Globe className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    <ArrowRight className="w-6 h-6 text-blue-400 group-hover:translate-x-2 group-hover:text-blue-300 transition-all duration-300" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                    Real Estate Tours
                  </h3>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    Showcase properties with stunning virtual tours that captivate potential buyers and close deals
                    faster
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-blue-300">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span>Virtual Tours</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100" />
                      <span>Property Focus</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200" />
                      <span>Professional</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`transform transition-all duration-700 delay-${index * 100} ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400 group-hover:text-pink-400 transition-colors" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Unleash Your Creativity
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose your preferred method and watch as our AI transforms your vision into reality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Link key={feature.title} href={feature.href}>
                <Card
                  className={`group cursor-pointer h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${activeCard === index ? "ring-2 ring-purple-500" : ""}`}
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-lg leading-relaxed mb-6">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center text-purple-400 group-hover:text-pink-400 transition-colors">
                      <span className="font-semibold">Explore Now</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Loved by Creators Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of creators who are already transforming their ideas into stunning videos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4 rounded-full"
              >
                <Heart className="w-6 h-6 mr-2" />
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              VideoAI Pro
            </span>
          </div>
          <p className="text-gray-400 mb-6">Transforming creativity with AI-powered video generation</p>
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
