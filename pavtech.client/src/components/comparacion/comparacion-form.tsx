"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { FrameSeleccionado } from "@/app/dashboard/comparacion/page"
import { Loader2 } from "lucide-react"

// Datos de ejemplo para caminos
const caminos = [
  { id: "1", nombre: "Ruta 68 Santiago-Valparaíso" },
  { id: "2", nombre: "Ruta 5 Norte Tramo La Serena-Vallenar" },
  { id: "3", nombre: "Ruta 78 Santiago-San Antonio" },
]

// Esquema de validación del formulario
const formSchema = z.object({
  caminoId: z.string({ required_error: "Seleccione un camino" }),
  video1Id: z.string({ required_error: "Seleccione el primer video" }),
  video2Id: z.string({ required_error: "Seleccione el segundo video" }),
  kilometraje: z.number({ required_error: "Seleccione un punto kilométrico" }),
})

interface ComparacionFormProps {
  onFramesSelected: (frame1: FrameSeleccionado, frame2: FrameSeleccionado) => void
}

export function ComparacionForm({ onFramesSelected }: ComparacionFormProps) {
  const [videos1, setVideos1] = useState<any[]>([])
  const [videos2, setVideos2] = useState<any[]>([])
  const [rangoKilometraje, setRangoKilometraje] = useState<[number, number]>([0, 100])
  const [frames1, setFrames1] = useState<any[]>([])
  const [frames2, setFrames2] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Inicializar el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kilometraje: 0,
    },
  })

  // Manejar cambios en la selección de camino
  const handleCaminoChange = (caminoId: string) => {
    form.setValue("caminoId", caminoId)
    form.setValue("video1Id", "")
    form.setValue("video2Id", "")
    form.setValue("kilometraje", 0)

    // Simular carga de videos para el camino seleccionado
    setLoading(true)
    setTimeout(() => {
      const videosDelCamino = generarVideosEjemplo(caminoId)
      setVideos1(videosDelCamino)
      setVideos2(videosDelCamino)
      setLoading(false)
    }, 500)
  }

  // Manejar cambios en la selección del primer video
  const handleVideo1Change = (videoId: string) => {
    form.setValue("video1Id", videoId)

    // Simular carga de frames para el video seleccionado
    setLoading(true)
    setTimeout(() => {
      const framesDelVideo = generarFramesEjemplo(videoId, "1")
      setFrames1(framesDelVideo)

      // Actualizar el rango de kilometraje basado en los frames disponibles
      const minKm = Math.min(...framesDelVideo.map((f) => f.kilometraje))
      const maxKm = Math.max(...framesDelVideo.map((f) => f.kilometraje))

      // Solo actualizar si tenemos ambos videos seleccionados
      if (form.getValues("video2Id")) {
        const commonMin = Math.max(minKm, Math.min(...frames2.map((f) => f.kilometraje)))
        const commonMax = Math.min(maxKm, Math.max(...frames2.map((f) => f.kilometraje)))
        setRangoKilometraje([commonMin, commonMax])
        form.setValue("kilometraje", commonMin)
      }

      setLoading(false)
    }, 500)
  }

  // Manejar cambios en la selección del segundo video
  const handleVideo2Change = (videoId: string) => {
    form.setValue("video2Id", videoId)

    // Simular carga de frames para el video seleccionado
    setLoading(true)
    setTimeout(() => {
      const framesDelVideo = generarFramesEjemplo(videoId, "2")
      setFrames2(framesDelVideo)

      // Actualizar el rango de kilometraje basado en los frames disponibles
      const minKm = Math.min(...framesDelVideo.map((f) => f.kilometraje))
      const maxKm = Math.max(...framesDelVideo.map((f) => f.kilometraje))

      // Solo actualizar si tenemos ambos videos seleccionados
      if (form.getValues("video1Id")) {
        const commonMin = Math.max(minKm, Math.min(...frames1.map((f) => f.kilometraje)))
        const commonMax = Math.min(maxKm, Math.max(...frames1.map((f) => f.kilometraje)))
        setRangoKilometraje([commonMin, commonMax])
        form.setValue("kilometraje", commonMin)
      }

      setLoading(false)
    }, 500)
  }

  // Manejar el envío del formulario
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const km = values.kilometraje

    // Encontrar los frames más cercanos al kilometraje seleccionado
    const frame1 = encontrarFrameMasCercano(frames1, km)
    const frame2 = encontrarFrameMasCercano(frames2, km)

    if (frame1 && frame2) {
      onFramesSelected(frame1, frame2)
    }
  }

  // Función para encontrar el frame más cercano a un kilometraje dado
  const encontrarFrameMasCercano = (frames: any[], km: number): FrameSeleccionado | null => {
    if (!frames.length) return null

    // Ordenar por cercanía al kilometraje deseado
    const framesCercanos = [...frames].sort((a, b) => Math.abs(a.kilometraje - km) - Math.abs(b.kilometraje - km))

    return framesCercanos[0]
  }

  // Generar videos de ejemplo para un camino
  const generarVideosEjemplo = (caminoId: string) => {
    const camino = caminos.find((c) => c.id === caminoId)
    if (!camino) return []

    return Array(5)
      .fill(null)
      .map((_, index) => {
        const fecha = new Date()
        fecha.setMonth(fecha.getMonth() - index)

        return {
          id: `${caminoId}-video-${index + 1}`,
          nombre: `${camino.nombre} - Grabación ${index + 1}`,
          fecha: fecha.toLocaleDateString(),
          kilometrajeInicio: 10 * index,
          kilometrajeFin: 10 * index + 50,
        }
      })
  }

  // Generar frames de ejemplo para un video
  const generarFramesEjemplo = (videoId: string, suffix: string): FrameSeleccionado[] => {
    const video = [...videos1, ...videos2].find((v) => v.id === videoId)
    if (!video) return []

    return Array(20)
      .fill(null)
      .map((_, index) => {
        const km = video.kilometrajeInicio + index * 2.5
        return {
          id: `${videoId}-frame-${index}`,
          videoId: videoId,
          videoNombre: video.nombre,
          fecha: video.fecha,
          kilometraje: km,
          urlImagen: `/placeholder.svg?height=300&width=400&query=road frame ${suffix} km ${km}`,
          coordenadas: {
            lat: -33.45 - index * 0.01,
            lng: -70.67 + index * 0.01,
          },
        }
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Selección de camino */}
          <FormField
            control={form.control}
            name="caminoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camino</FormLabel>
                <Select onValueChange={(value) => handleCaminoChange(value)} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar camino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {caminos.map((camino) => (
                      <SelectItem key={camino.id} value={camino.id}>
                        {camino.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Seleccione el camino que desea comparar</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Selección del primer video */}
          <FormField
            control={form.control}
            name="video1Id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primera Toma</FormLabel>
                <Select
                  onValueChange={(value) => handleVideo1Change(value)}
                  defaultValue={field.value}
                  disabled={!form.getValues("caminoId") || loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar video" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {videos1.map((video) => (
                      <SelectItem key={video.id} value={video.id}>
                        {video.nombre} ({video.fecha})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Primera toma para comparación</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Selección del segundo video */}
          <FormField
            control={form.control}
            name="video2Id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segunda Toma</FormLabel>
                <Select
                  onValueChange={(value) => handleVideo2Change(value)}
                  defaultValue={field.value}
                  disabled={!form.getValues("caminoId") || loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar video" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {videos2
                      .filter((v) => v.id !== form.getValues("video1Id"))
                      .map((video) => (
                        <SelectItem key={video.id} value={video.id}>
                          {video.nombre} ({video.fecha})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>Segunda toma para comparación</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Selección de kilometraje */}
        {form.getValues("video1Id") && form.getValues("video2Id") && (
          <FormField
            control={form.control}
            name="kilometraje"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Punto Kilométrico</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Slider
                      value={[field.value]}
                      min={rangoKilometraje[0]}
                      max={rangoKilometraje[1]}
                      step={0.1}
                      onValueChange={(value) => field.onChange(value[0])}
                      disabled={loading}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Inicio: {rangoKilometraje[0].toFixed(1)} km</span>
                      <span className="font-medium">Seleccionado: {field.value.toFixed(1)} km</span>
                      <span className="text-sm text-muted-foreground">Fin: {rangoKilometraje[1].toFixed(1)} km</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Seleccione el punto kilométrico que desea comparar</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={loading || !form.getValues("video1Id") || !form.getValues("video2Id")}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cargando...
            </>
          ) : (
            "Comparar Fotogramas"
          )}
        </Button>
      </form>
    </Form>
  )
}
