"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Maximize2, Minimize2, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { VideoPlayer } from "@/components/videos/video-player"
import { VideoMetrics } from "@/components/videos/video-metrics"
import { VideoInfo } from "@/components/videos/video-info"
import { VideoMap } from "@/components/videos/video-map"

// Datos de ejemplo para el video
const videoData = {
  id: "1",
  title: "Ruta 68 Km 25-30.mp4",
  project: "Auscultación Ruta 68 Tramo Santiago-Valparaíso",
  path: "Ruta 68 Km 25-30",
  date: "2025-04-28",
  duration: "12:45",
  size: "1.2 GB",
  url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // URL de ejemplo
  thumbnailUrl: "/placeholder.svg?key=video1",
  totalDistance: 5000, // 5 km en metros
  startCoordinates: { lat: -33.4513, lng: -70.6653 }, // Santiago
  endCoordinates: { lat: -33.0472, lng: -71.6127 }, // Valparaíso
  metrics: {
    iri: [
      { distance: 0, value: 2.1 },
      { distance: 500, value: 2.3 },
      { distance: 1000, value: 3.5 },
      { distance: 1500, value: 4.2 },
      { distance: 2000, value: 2.8 },
      { distance: 2500, value: 2.2 },
      { distance: 3000, value: 1.9 },
      { distance: 3500, value: 2.5 },
      { distance: 4000, value: 3.1 },
      { distance: 4500, value: 2.7 },
      { distance: 5000, value: 2.4 },
    ],
    deflectometria: [
      { distance: 0, value: 0.35 },
      { distance: 500, value: 0.42 },
      { distance: 1000, value: 0.38 },
      { distance: 1500, value: 0.45 },
      { distance: 2000, value: 0.52 },
      { distance: 2500, value: 0.48 },
      { distance: 3000, value: 0.41 },
      { distance: 3500, value: 0.39 },
      { distance: 4000, value: 0.44 },
      { distance: 4500, value: 0.47 },
      { distance: 5000, value: 0.43 },
    ],
    friccion: [
      { distance: 0, value: 0.65 },
      { distance: 500, value: 0.72 },
      { distance: 1000, value: 0.68 },
      { distance: 1500, value: 0.75 },
      { distance: 2000, value: 0.62 },
      { distance: 2500, value: 0.78 },
      { distance: 3000, value: 0.71 },
      { distance: 3500, value: 0.69 },
      { distance: 4000, value: 0.74 },
      { distance: 4500, value: 0.67 },
      { distance: 5000, value: 0.7 },
    ],
    defects: [
      { distance: 850, type: "bache", severity: "alta" },
      { distance: 1200, type: "grieta", severity: "media" },
      { distance: 2300, type: "ahuellamiento", severity: "baja" },
      { distance: 3700, type: "grieta", severity: "alta" },
      { distance: 4200, type: "bache", severity: "media" },
    ],
  },
}

// Tipos de auscultación disponibles
const auscultationTypes = [
  { id: "iri", name: "IRI", unit: "m/km" },
  { id: "deflectometria", name: "Deflectometría", unit: "mm" },
  { id: "friccion", name: "Fricción", unit: "coef." },
]

export default function VideoViewerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentDistance, setCurrentDistance] = useState(0)
  const [selectedAuscultation, setSelectedAuscultation] = useState("iri")
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  // Calcular la distancia actual basada en el tiempo del video
  useEffect(() => {
    if (duration > 0) {
      const distancePercentage = currentTime / duration
      setCurrentDistance(Math.floor(videoData.totalDistance * distancePercentage))
    }
  }, [currentTime, duration])

  // Manejar cambio a pantalla completa
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error al intentar entrar en modo pantalla completa: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Escuchar cambios en el estado de pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Manejar cambio en el odómetro
  const handleOdometerChange = (value: number[]) => {
    const newDistance = value[0]
    setCurrentDistance(newDistance)

    // Calcular el tiempo correspondiente a la distancia
    if (duration > 0 && videoRef) {
      const timePercentage = newDistance / videoData.totalDistance
      const newTime = timePercentage * duration
      videoRef.currentTime = newTime
    }
  }

  // Obtener los datos de la auscultación seleccionada
  const getSelectedAuscultationData = () => {
    switch (selectedAuscultation) {
      case "iri":
        return videoData.metrics.iri
      case "deflectometria":
        return videoData.metrics.deflectometria
      case "friccion":
        return videoData.metrics.friccion
      default:
        return videoData.metrics.iri
    }
  }

  // Obtener la unidad de medida de la auscultación seleccionada
  const getSelectedAuscultationUnit = () => {
    const type = auscultationTypes.find((type) => type.id === selectedAuscultation)
    return type ? type.unit : "m/km"
  }

  // Renderizar marcadores de defectos
  const renderDefectMarkers = () => {
    return videoData.metrics.defects.map((defect, index) => {
      // Calcular la posición del defecto como porcentaje
      const position = (defect.distance / videoData.totalDistance) * 100

      // Determinar el color según la severidad
      let bgColor = "bg-yellow-400" // baja por defecto
      if (defect.severity === "alta") bgColor = "bg-red-500"
      if (defect.severity === "media") bgColor = "bg-orange-500"

      return (
        <div
          key={index}
          className={`absolute w-4 h-4 rounded-full ${bgColor} -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
          style={{ left: `${position}%`, top: "50%" }}
          title={`${defect.type} (${defect.severity}) en ${(defect.distance / 1000).toFixed(2)} km`}
        />
      )
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={videoData.title} text={`Proyecto: ${videoData.project}`}>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Descargar</span>
          </Button>
          <Button variant="outline" className="gap-1">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compartir</span>
          </Button>
          <Button variant="outline" onClick={toggleFullscreen} className="gap-1">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{isFullscreen ? "Salir" : "Pantalla completa"}</span>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6">
        {/* Reproductor de video */}
        <Card>
          <CardContent className="p-0 overflow-hidden">
            <VideoPlayer
              videoUrl={videoData.url}
              onTimeUpdate={setCurrentTime}
              onDurationChange={setDuration}
              onVideoRef={setVideoRef}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </CardContent>
        </Card>

        {/* Odómetro interactivo */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Odómetro</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Posición actual:</span>
                  <span className="font-medium">{(currentDistance / 1000).toFixed(2)} km</span>
                </div>
              </div>

              {/* Control deslizable para el odómetro */}
              <div className="pt-4 relative">
                <Slider
                  value={[currentDistance]}
                  min={0}
                  max={videoData.totalDistance}
                  step={10}
                  onValueChange={handleOdometerChange}
                  className="w-full"
                />
                {/* Marcadores de defectos */}
                {renderDefectMarkers()}
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Inicio: 0 km</span>
                <span>Fin: {(videoData.totalDistance / 1000).toFixed(2)} km</span>
              </div>

              {/* Leyenda de defectos */}
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                  <span>Defecto grave</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
                  <span>Defecto medio</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span>Defecto leve</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pestañas con información adicional */}
        <Tabs defaultValue="metrics">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
          </TabsList>
          <TabsContent value="metrics">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Tipo de Auscultación</label>
                  <Select value={selectedAuscultation} onValueChange={setSelectedAuscultation}>
                    <SelectTrigger className="w-full sm:w-[250px]">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {auscultationTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <VideoMetrics
                  iriData={getSelectedAuscultationData()}
                  defects={videoData.metrics.defects}
                  currentDistance={currentDistance}
                  unit={getSelectedAuscultationUnit()}
                  metricName={auscultationTypes.find((t) => t.id === selectedAuscultation)?.name || "IRI"}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="info">
            <Card>
              <CardContent className="p-6">
                <VideoInfo videoData={videoData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="map">
            <Card>
              <CardContent className="p-0 h-[400px]">
                <VideoMap
                  startCoordinates={videoData.startCoordinates}
                  endCoordinates={videoData.endCoordinates}
                  currentDistance={currentDistance}
                  totalDistance={videoData.totalDistance}
                  defects={videoData.metrics.defects}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
