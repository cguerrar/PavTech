"use client"

import { AlertTriangle, MapPin, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCountry } from "@/contexts/country-context"

export function AlertsList() {
  const { data } = useCountry()

  return (
    <div className="space-y-3">
      {data.alerts.map((alert, index) => (
        <div key={`alert-${index}`} className="flex flex-col space-y-2 rounded-md border p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`h-4 w-4 ${alert.severity === "high" ? "text-red-500" : "text-yellow-500"}`} />
              <span className="font-medium text-sm">{alert.issue}</span>
            </div>
            <Badge variant={alert.severity === "high" ? "destructive" : "outline"} className="text-xs">
              {alert.severity === "high" ? "Crítico" : "Atención"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>
              {alert.project} - {alert.location}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>
              Valor: <span className="font-medium">{alert.value}</span> (Umbral: {alert.threshold})
            </span>
            <Button variant="ghost" size="sm" className="h-6 gap-1 px-2">
              <span>Ver</span>
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
