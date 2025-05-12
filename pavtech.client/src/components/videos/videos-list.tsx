"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Download, Eye, FileVideo, MoreHorizontal, Pencil, Play, Trash2, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo para la lista de videos
const videosEjemplo = [
  {
    id: "1",
    nombre: "Ruta 68 Km 25-30.mp4",
    proyecto: "Auscultación Ruta 68 Tramo Santiago-Valparaíso",
    camino: "Ruta 68 Km 25-30",
    fechaSubida: "2025-05-01",
    fechaGrabacion: "2025-04-28",
    estado: "completed",
    progreso: 100,
    duracion: "12:45",
    tamaño: "1.2 GB",
    thumbnail: "/placeholder.svg?key=video1",
  },
  {
    id: "2",
    nombre: "Autopista Central Tramo Norte.mp4",
    proyecto: "Medición IRI Autopista Central",
    camino: "Autopista Central Tramo Norte",
    fechaSubida: "2025-05-02",
    fechaGrabacion: "2025-04-30",
    estado: "processing",
    progreso: 68,
    duracion: "18:22",
    tamaño: "1.8 GB",
    thumbnail: "/placeholder.svg?key=video2",
  },
  {
    id: "3",
    nombre: "Ruta 5 Sur Km 120-135.mp4",
    proyecto: "Defectometría Ruta 5 Sur Tramo Chillán-Concepción",
    camino: "Ruta 5 Sur Km 120-135",
    fechaSubida: "2025-05-02",
    fechaGrabacion: "2025-04-29",
    estado: "processing",
    progreso: 34,
    duracion: "15:10",
    tamaño: "1.5 GB",
    thumbnail: "/placeholder.svg?key=video3",
  },
  {
    id: "4",
    nombre: "Costanera Norte Sector Oriente.mp4",
    proyecto: "Análisis de Fricción Ruta 78",
    camino: "Costanera Norte Sector Oriente",
    fechaSubida: "2025-05-03",
    fechaGrabacion: "2025-05-01",
    estado: "pending",
    progreso: 0,
    duracion: "20:05",
    tamaño: "2.0 GB",
    thumbnail: "/placeholder.svg?key=video4",
  },
  {
    id: "5",
    nombre: "Ruta 78 Sector Melipilla.mp4",
    proyecto: "Análisis de Fricción Ruta 78",
    camino: "Ruta 78 Sector Melipilla",
    fechaSubida: "2025-05-03",
    fechaGrabacion: "2025-05-02",
    estado: "error",
    progreso: 23,
    duracion: "14:30",
    tamaño: "1.4 GB",
    thumbnail: "/placeholder.svg?key=video5",
  },
]

export function VideosList() {
  const [videos] = useState(videosEjemplo)

  // Función para obtener el color del badge según el estado
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "pending":
        return "outline"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "processing":
        return "Procesando"
      case "pending":
        return "Pendiente"
      case "error":
        return "Error"
      default:
        return status
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="relative aspect-video bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <FileVideo className="h-12 w-12 text-muted-foreground opacity-50" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-sm font-medium text-white truncate">{video.nombre}</h3>
              <p className="text-xs text-white/70 truncate">{video.camino}</p>
            </div>
            {video.estado === "completed" && (
              <Link href={`/dashboard/videos/${video.id}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </Link>
            )}
            <Badge className="absolute top-2 right-2" variant={getStatusBadgeVariant(video.estado)}>
              {getStatusText(video.estado)}
            </Badge>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Subido: {new Date(video.fechaSubida).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Video className="h-3.5 w-3.5" />
                <span>{video.duracion}</span>
              </div>
            </div>

            {video.estado === "processing" && (
              <div className="mb-2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Procesando...</span>
                  <span>{video.progreso}%</span>
                </div>
                <Progress value={video.progreso} className="h-1" />
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium truncate">{video.proyecto}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  {video.estado === "completed" && (
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/videos/${video.id}`} className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Ver video</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Ver detalles</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Editar información</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Descargar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
