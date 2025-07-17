"use client"

import { useState } from "react"
import { VerifyCard } from "@/components/verify-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function VerifyPage() {
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const searchParams = useSearchParams()
  const hashFromUrl = searchParams.get("hash")

  const stats = [
    {
      icon: CheckCircle,
      title: "Verified Today",
      value: "1,247",
      change: "+12%",
      color: "text-green-400",
    },
    {
      icon: Shield,
      title: "Total Certificates",
      value: "45,892",
      change: "+8%",
      color: "text-blue-400",
    },
    {
      icon: AlertTriangle,
      title: "Flagged as Forged",
      value: "23",
      change: "-5%",
      color: "text-red-400",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Verify Certificate
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enter a certificate hash or scan a QR code to verify authenticity and view details
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VerifyCard initialHash={hashFromUrl || ""} onVerificationResult={setVerificationResult} />
        </div>

        <div className="space-y-6">
          <Card className="glassmorphism border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Verification Stats
              </CardTitle>
              <CardDescription>Real-time verification statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{stat.title}</p>
                        <p className="text-xs text-muted-foreground">{stat.change} from yesterday</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{stat.value}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {verificationResult && (
            <Card
              className={`glassmorphism ${
                verificationResult.isValid ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
              }`}
            >
              <CardHeader>
                <CardTitle className={verificationResult.isValid ? "text-green-400" : "text-red-400"}>
                  {verificationResult.isValid ? "Certificate Valid" : "Certificate Invalid"}
                </CardTitle>
                <CardDescription>
                  {verificationResult.isValid
                    ? "This certificate has been verified successfully"
                    : "This certificate could not be verified"}
                </CardDescription>
              </CardHeader>
              {verificationResult.isValid && (
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Student: </span>
                    <span>{verificationResult.studentName}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Issued: </span>
                    <span>{verificationResult.uploadDate}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Expires: </span>
                    <span>{verificationResult.expiryDate}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
