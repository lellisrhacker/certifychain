"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Award, ShieldCheck } from "lucide-react"

export function ReputationCard() {
  return (
    <Card className="glassmorphism border-white/10">
      <CardHeader>
        <CardTitle>Top Issuers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-base font-medium">Levi Corp</p>
            <p className="text-sm text-muted-foreground">Reputation: 97</p>
          </div>
          <Award className="ml-auto w-5 h-5 text-yellow-400" />
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-base font-medium">MetaCertify</p>
            <p className="text-sm text-muted-foreground">Reputation: 92</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
