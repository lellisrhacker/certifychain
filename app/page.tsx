import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Upload, Search, Users, CheckCircle, Lock, Globe } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "Certificates are secured on the blockchain with immutable verification",
    },
    {
      icon: CheckCircle,
      title: "Instant Verification",
      description: "Verify certificate authenticity in seconds with our advanced system",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access and verify certificates from anywhere in the world",
    },
  ]

  const quickActions = [
    {
      href: "/upload",
      icon: Upload,
      title: "Upload Certificate",
      description: "Securely upload and register new certificates",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      href: "/verify",
      icon: Search,
      title: "Verify Certificate",
      description: "Check certificate authenticity and validity",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      href: "/reputation",
      icon: Users,
      title: "Issuer Reputation",
      description: "View issuer reputation scores and statistics",
      gradient: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Web3 Certificate Verification
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Secure, transparent, and immutable certificate verification powered by blockchain technology
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/upload">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Upload Certificate
            </Button>
          </Link>
          <Link href="/verify">
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
              Verify Certificate
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card
              key={index}
              className="glassmorphism border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <Card className="glassmorphism border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
