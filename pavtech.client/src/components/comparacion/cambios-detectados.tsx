"use client"

import { useState } from "react"
import type { FrameSeleccionado } from "@/app/dashboard/comparacion/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

interface CambiosDetectadosProps {
  frame1: FrameSeleccionado
  frame2: FrameSeleccionado
}

// Tipos de cambios que podemos detectar
type TipoCambio = "grieta" | "bache" | "desgaste" | "reparacion" | "vegetacion" | "señalizacion"

// Interfaz para un cambio detectado
interface CambioDetectado {
  tipo: TipoCambio
  descripcion: string
  severidad: "alta" | "media" | "baja"
  coordenadas: { x: number; y: number }
}

export function CambiosDetectados({ frame1, frame2 }: CambiosDetectadosProps) {
  // En un caso real, estos cambios vendrían de un análisis de imagen o serían proporcionados por la API
  const [cambiosDetectados] = useState<CambioDetectado[]>([
    {
      tipo: "grieta",
      descripcion: "Nueva grieta longitudinal detectada",
      severidad: "media",
      coordenadas: { x: 120, y: 150 },
    },
    {
      tipo: "bache",
      descripcion: "Bache existente ha aumentado de tamaño",
      severidad: "alta",
      coordenadas: { x: 250, y: 180 },
    },
    {
      tipo: "reparacion",
      descripcion: "Área reparada desde la última inspección",
      severidad: "baja",
      coordenadas: { x: 320, y: 210 },
    },
  ])

  // Obtener el color según la severidad
  const getSeverityColor = (severidad: string) => {
    switch (severidad) {
      case "alta":
        return "bg-red-500 hover:bg-red-600"
      case "media":
        return "bg-orange-500 hover:bg-orange-600"
      case "baja":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  // Obtener el icono según el tipo de cambio
  const getChangeIcon = (tipo: TipoCambio) => {
    switch (tipo) {
      case "grieta":
      case "bache":
      case "desgaste":
        return <AlertTriangle className="h-4 w-4" />
      case "reparacion":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambios Detectados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cambiosDetectados.length > 0 ? (
            cambiosDetectados.map((cambio, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className={`rounded-full p-1.5 text-white ${getSeverityColor(cambio.severidad)}`}>
                  {getChangeIcon(cambio.tipo)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{cambio.descripcion}</h4>
                    <Badge
                      variant={
                        cambio.severidad === "alta"
                          ? "destructive"
                          : cambio.severidad === "media"
                            ? "default"
                            : "outline"
                      }
                    >
                      {cambio.severidad.charAt(0).toUpperCase() + cambio.severidad.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tipo: {cambio.tipo.charAt(0).toUpperCase() + cambio.tipo.slice(1)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No se detectaron cambios significativos entre los fotogramas seleccionados.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
