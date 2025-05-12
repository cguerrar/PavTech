"use client"

import { useEffect, useRef } from "react"

interface Defect {
  distance: number
  type: string
  severity: string
}

interface VideoOdometerProps {
  currentDistance: number
  totalDistance: number
  defects: Defect[]
}

export function VideoOdometer({ currentDistance, totalDistance, defects }: VideoOdometerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Dibujar el odómetro
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas al tamaño del contenedor
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = 80 // Altura fija
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar la barra principal
    const barHeight = 20
    const barY = canvas.height / 2 - barHeight / 2

    // Fondo de la barra
    ctx.fillStyle = "#f1f5f9" // bg-slate-100
    ctx.fillRect(0, barY, canvas.width, barHeight)

    // Barra de progreso
    const progressWidth = (currentDistance / totalDistance) * canvas.width
    ctx.fillStyle = "#fbbf24" // bg-yellow-400
    ctx.fillRect(0, barY, progressWidth, barHeight)

    // Dibujar marcas de kilómetros
    ctx.fillStyle = "#64748b" // text-slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    const kmMarks = Math.floor(totalDistance / 1000) + 1
    for (let i = 0; i <= kmMarks; i++) {
      const kmDistance = i * 1000
      const x = (kmDistance / totalDistance) * canvas.width

      // Dibujar línea de marca
      ctx.fillStyle = "#94a3b8" // text-slate-400
      ctx.fillRect(x, barY - 5, 1, barHeight + 10)

      // Dibujar texto de kilómetro
      ctx.fillStyle = "#64748b" // text-slate-500
      ctx.fillText(`${i} km`, x, barY + barHeight + 16)
    }

    // Dibujar defectos en la barra
    defects.forEach((defect) => {
      const x = (defect.distance / totalDistance) * canvas.width

      // Color según severidad
      let color
      switch (defect.severity) {
        case "alta":
          color = "#ef4444" // text-red-500
          break
        case "media":
          color = "#f97316" // text-orange-500
          break
        case "baja":
          color = "#eab308" // text-yellow-500
          break
        default:
          color = "#94a3b8" // text-slate-400
      }

      // Dibujar marca de defecto
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, barY - 10, 6, 0, Math.PI * 2)
      ctx.fill()
    })

    // Dibujar posición actual
    ctx.fillStyle = "#0ea5e9" // text-sky-500
    ctx.beginPath()
    ctx.arc(progressWidth, barY + barHeight / 2, 10, 0, Math.PI * 2)
    ctx.fill()

    // Dibujar texto de distancia actual
    ctx.fillStyle = "#0f172a" // text-slate-900
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    const distanceText = `${(currentDistance / 1000).toFixed(2)} km`
    ctx.fillText(distanceText, progressWidth, barY - 15)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [currentDistance, totalDistance, defects])

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Odómetro</h3>
      <div className="relative w-full h-20">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Inicio: 0 km</span>
        <span>Fin: {(totalDistance / 1000).toFixed(2)} km</span>
      </div>
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
          <span>Defecto grave</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
          <span>Defecto medio</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
          <span>Defecto leve</span>
        </div>
      </div>
    </div>
  )
}
