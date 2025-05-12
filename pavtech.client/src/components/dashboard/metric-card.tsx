import type React from "react"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useCountry } from "@/contexts/country-context"
import type { CountryData } from "@/lib/types"

interface MetricCardProps {
  title: string
  metricKey: keyof CountryData["metrics"]
  description: string
  descriptionKey?: keyof CountryData["metrics"]
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
}

export function MetricCard({
  title,
  metricKey,
  description,
  descriptionKey,
  icon,
  trend = "neutral",
}: MetricCardProps) {
  const { data } = useCountry()

  const value = data.metrics[metricKey]
  const descriptionValue = descriptionKey ? data.metrics[descriptionKey] : description

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="flex items-center text-xs text-muted-foreground">
          {trend === "up" && <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />}
          {trend === "down" && <ArrowDown className="mr-1 h-3 w-3 text-red-500" />}
          {trend === "neutral" && <Minus className="mr-1 h-3 w-3 text-muted-foreground" />}
          <span className={cn(trend === "up" && "text-emerald-500", trend === "down" && "text-red-500")}>
            {descriptionKey ? `${descriptionValue} ${description}` : descriptionValue}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
