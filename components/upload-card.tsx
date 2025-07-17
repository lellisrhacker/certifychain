"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/useToast"
import { Upload, File, Calendar, User, Copy, QrCode, CheckCircle } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UploadCardProps {
  onUploadSuccess: (data: {
    hash: string
    verificationLink: string
    studentName: string
    expiryDate: string
  }) => void
}

export function UploadCard({ onUploadSuccess }: UploadCardProps) {
  const [studentName, setStudentName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [expiryDate, setExpiryDate] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{
    hash: string
    verificationLink: string
  } | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const generateHash = (input: string) => {
    // Simple hash generation for demo purposes
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, "0")
  }

  const handleUpload = async () => {
    if (!studentName.trim()) {
      toast({
        title: "Student name required",
        description: "Please enter the student's name",
        variant: "destructive",
      })
      return
    }

    if (!file) {
      toast({
        title: "File required",
        description: "Please select a certificate file",
        variant: "destructive",
      })
      return
    }

    if (!expiryDate) {
      toast({
        title: "Expiry date required",
        description: "Please select an expiry date",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 20
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval)
      setUploadProgress(100)

      const hash = generateHash(studentName + file.name + expiryDate + Date.now())
      const verificationLink = `${window.location.origin}/verify?hash=${hash}`

      const result = {
        hash,
        verificationLink,
        studentName,
        expiryDate,
      }

      setUploadResult(result)
      onUploadSuccess(result)
      setIsUploading(false)

      toast({
        title: "Upload successful!",
        description: "Certificate has been registered on the blockchain",
      })
    }, 2000)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
  }

  const resetForm = () => {
    setStudentName("")
    setFile(null)
    setExpiryDate("")
    setUploadResult(null)
    setUploadProgress(0)
  }

  return (
    <Card className="glassmorphism border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-400" />
          Upload Certificate
        </CardTitle>
        <CardDescription>Fill in the details and upload your certificate file</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!uploadResult ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="studentName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Student Name
              </Label>
              <Input
                id="studentName"
                placeholder="Enter student's full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificate" className="flex items-center gap-2">
                <File className="w-4 h-4" />
                Certificate File
              </Label>
              <div className="relative">
                <Input
                  id="certificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                disabled={isUploading}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading to blockchain...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {isUploading ? "Uploading..." : "Upload Certificate"}
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Certificate uploaded successfully!</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Certificate Hash</Label>
                <div className="flex items-center gap-2">
                  <Input value={uploadResult.hash} readOnly className="font-mono text-sm" />
                  <Button size="icon" variant="outline" onClick={() => copyToClipboard(uploadResult.hash, "Hash")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Verification Link</Label>
                <div className="flex items-center gap-2">
                  <Input value={uploadResult.verificationLink} readOnly className="text-sm" />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(uploadResult.verificationLink, "Link")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <QrCode className="w-4 h-4" />
                      Show QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Verification QR Code</DialogTitle>
                      <DialogDescription>Scan this QR code to verify the certificate</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-6">
                      <QRCodeSVG
                        value={uploadResult.verificationLink}
                        size={200}
                        bgColor="transparent"
                        fgColor="currentColor"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Button onClick={resetForm} variant="outline" className="w-full bg-transparent">
              Upload Another Certificate
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
