"use client"

import { useState } from "react"
import { UploadCard } from "@/components/upload-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Shield, Clock, Hash } from "lucide-react"

export default function UploadPage() {
  const [uploadedCertificate, setUploadedCertificate] = useState<{
    hash: string
    verificationLink: string
    studentName: string
    expiryDate: string
  } | null>(null)

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Your certificate is secured with cryptographic hashing",
    },
    {
      icon: Hash,
      title: "Unique Hash",
      description: "Each certificate gets a unique blockchain hash",
    },
    {
      icon: Clock,
      title: "Expiry Tracking",
      description: "Set expiry dates for time-sensitive certificates",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Upload Certificate
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Securely upload and register your certificate on the blockchain for permanent verification
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UploadCard onUploadSuccess={setUploadedCertificate} />
        </div>

        <div className="space-y-6">
          <Card className="glassmorphism border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Security Features
              </CardTitle>
              <CardDescription>Your certificate is protected by advanced security measures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {uploadedCertificate && (
            <Card className="glassmorphism border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-400">Upload Successful!</CardTitle>
                <CardDescription>Certificate for {uploadedCertificate.studentName} has been registered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Hash: </span>
                  <span className="font-mono text-xs">{uploadedCertificate.hash}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Expires: </span>
                  <span>{uploadedCertificate.expiryDate}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
