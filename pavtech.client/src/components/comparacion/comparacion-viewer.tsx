"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import type { FrameSeleccionado } from "@/app/dashboard/comparacion/page"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ComparacionViewerProps {
  frame1: FrameSeleccionado
  frame2: FrameSeleccionado
  mode: "sideBySide" | "slider" | "overlay"
}

export function ComparacionViewer({ frame1, frame2, mode }: ComparacionViewerProps) {
  const [sliderValue, setSliderValue] = useState(50)
  const [opacityValue, setOpacityValue] = useState(50)

  // Renderizar información del frame
  const renderFrameInfo = (frame: FrameSeleccionado, position: "left" | "right" = "left") => (
    <div className={`space-y-2 ${position === "right" ? "text-right" : ""}`}>
      <h3 className="font-semibold text-lg">{frame.videoNombre}</h3>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        <span>Fecha: {frame.fecha}</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>Km: {frame.kilometraje.toFixed(1)}</span>
      </div>
      <Badge variant="outline" className="mt-1">
        {calcularDiferenciaTiempo(frame1.fecha, frame2.fecha)}
      </Badge>
    </div>
  )

  // Calcular diferencia de tiempo entre dos fechas
  const calcularDiferenciaTiempo = (fecha1: string, fecha2: string): string => {
    const date1 = new Date(fecha1)
    const date2 = new Date(fecha2)

    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) {
      return `${diffDays} días de diferencia`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} ${months === 1 ? "mes" : "meses"} de diferencia`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} ${years === 1 ? "año" : "años"} de diferencia`
    }
  }

  // Renderizar vista lado a lado
  const renderSideBySide = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {renderFrameInfo(frame1)}
          <div className="relative h-[300px] w-full overflow-hidden rounded-md">
            <Image
              src={frame1.urlImagen || "/placeholder.svg"}
              alt={`Fotograma ${frame1.kilometraje.toFixed(1)} km - ${frame1.fecha}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-4">
          {renderFrameInfo(frame2, "right")}
          <div className="relative h-[300px] w-full overflow-hidden rounded-md">
            <Image
              src={frame2.urlImagen || "/placeholder.svg"}
              alt={`Fotograma ${frame2.kilometraje.toFixed(1)} km - ${frame2.fecha}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button variant="outline">Exportar Comparación</Button>
        <Button variant="outline">Generar Reporte</Button>
      </div>
    </div>
  )

  // Renderizar vista con deslizador
  const renderSlider = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>{renderFrameInfo(frame1)}</div>
        <div className="text-right">{renderFrameInfo(frame2, "right")}</div>
      </div>

      <div className="relative h-[400px] w-full overflow-hidden rounded-md">
        <div className="absolute inset-0">
          <Image
            src={frame1.urlImagen || "/placeholder.svg"}
            alt={`Fotograma ${frame1.kilometraje.toFixed(1)} km - ${frame1.fecha}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderValue}%` }}>
          <Image
            src={frame2.urlImagen || "/placeholder.svg"}
            alt={`Fotograma ${frame2.kilometraje.toFixed(1)} km - ${frame2.fecha}`}
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            left: `${sliderValue}%`,
            width: "2px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      <div className="space-y-2">
        <Slider value={[sliderValue]} min={0} max={100} step={1} onValueChange={(value) => setSliderValue(value[0])} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{frame1.fecha}</span>
          <span>Deslice para comparar</span>
          <span>{frame2.fecha}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline">Exportar Comparación</Button>
        <Button variant="outline">Generar Reporte</Button>
      </div>
    </div>
  )

  // Renderizar vista con superposición
  const renderOverlay = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>{renderFrameInfo(frame1)}</div>
        <div className="text-right">{renderFrameInfo(frame2, "right")}</div>
      </div>

      <div className="relative h-[400px] w-full overflow-hidden rounded-md">
        <div className="absolute inset-0">
          <Image
            src={frame1.urlImagen || "/placeholder.svg"}
            alt={`Fotograma ${frame1.kilometraje.toFixed(1)} km - ${frame1.fecha}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0" style={{ opacity: opacityValue / 100 }}>
          <Image
            src={frame2.urlImagen || "/placeholder.svg"}
            alt={`Fotograma ${frame2.kilometraje.toFixed(1)} km - ${frame2.fecha}`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Slider
          value={[opacityValue]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setOpacityValue(value[0])}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{frame1.fecha} (100%)</span>
          <span>Ajuste la opacidad</span>
          <span>
            {frame2.fecha} ({opacityValue}%)
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline">Exportar Comparación</Button>
        <Button variant="outline">Generar Reporte</Button>
      </div>
    </div>
  )

  // Renderizar el modo seleccionado
  switch (mode) {
    case "sideBySide":
      return renderSideBySide()
    case "slider":
      return renderSlider()
    case "overlay":
      return renderOverlay()
    default:
      return renderSideBySide()
  }
}
