"use client"

import { ReputationCard } from "@/components/reputation-card"
import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, Award, AlertTriangle } from "lucide-react"

export default function ReputationPage() {
  const stats = [
    {
      icon: Users,
      title: "Total Issuers",
      value: "1,247",
      change: "+12%",
      color: "text-blue-400",
    },
    {
      icon: Award,
      title: "Top Rated Issuers",
      value: "892",
      change: "+8%",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      title: "Average Score",
      value: "87.5",
      change: "+3%",
      color: "text-purple-400",
    },
    {
      icon: AlertTriangle,
      title: "Under Review",
      value: "23",
      change: "-15%",
      color: "text-red-400",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Issuer Reputation
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          View reputation scores and statistics for certificate issuers on the blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="glassmorphism border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color} bg-opacity-20`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <ReputationCard />
    </div>
  )
}
