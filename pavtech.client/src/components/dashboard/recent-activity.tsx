"use client"

import { FileText, Upload, Video, Eye, AlertTriangle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCountry } from "@/contexts/country-context"

// Mapeo de acciones a iconos
const actionIcons = {
  "subió un nuevo video": { icon: Upload, color: "text-blue-500" },
  "generó un reporte": { icon: FileText, color: "text-emerald-500" },
  "completó el procesamiento": { icon: Video, color: "text-purple-500" },
  "visualizó el proyecto": { icon: Eye, color: "text-yellow-500" },
  "detectó un error en": { icon: AlertTriangle, color: "text-red-500" },
}

export function RecentActivity() {
  const { data } = useCountry()

  return (
    <div className="space-y-4">
      {data.activities.map((item, index) => {
        const actionData = actionIcons[item.action as keyof typeof actionIcons] || { icon: Eye, color: "text-gray-500" }

        return (
          <div key={`activity-${index}`} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
              <AvatarFallback>{item.user.initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{item.user.name}</span>
                <actionData.icon className={`h-3.5 w-3.5 ${actionData.color}`} />
              </div>
              <p className="text-sm text-muted-foreground">
                {item.action} <span className="font-medium text-foreground">{item.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{item.timestamp}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
