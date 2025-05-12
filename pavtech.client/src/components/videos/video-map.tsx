"use client"

import { useEffect, useRef } from "react"

interface Coordinates {
  lat: number
  lng: number
}

interface Defect {
  distance: number
  type: string
  severity: string
}

interface VideoMapProps {
  startCoordinates: Coordinates
  endCoordinates: Coordinates
  currentDistance: number
  totalDistance: number
  defects: Defect[]
}

export function VideoMap({ startCoordinates, endCoordinates, currentDistance, totalDistance, defects }: VideoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // En una implementación real, aquí se integraría con una API de mapas como Google Maps, Mapbox o Leaflet
    // Por ahora, mostraremos un mapa simulado con un canvas

    const renderSimulatedMap = () => {
      if (!mapRef.current) return

      // Limpiar el contenido anterior
      mapRef.current.innerHTML = ""

      // Crear un canvas para simular el mapa
      const canvas = document.createElement("canvas")
      canvas.width = mapRef.current.clientWidth
      canvas.height = mapRef.current.clientHeight
      mapRef.current.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Dibujar fondo del mapa
      ctx.fillStyle = "#e2e8f0" // bg-slate-200
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar una cuadrícula para simular calles
      ctx.strokeStyle = "#cbd5e1" // border-slate-300
      ctx.lineWidth = 1

      // Líneas horizontales
      for (let y = 20; y < canvas.height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Líneas verticales
      for (let x = 20; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Calcular la ruta (una línea diagonal simple para la simulación)
      const padding = 50
      const startX = padding
      const startY = padding
      const endX = canvas.width - padding
      const endY = canvas.height - padding

      // Dibujar la ruta completa
      ctx.strokeStyle = "#94a3b8" // text-slate-400
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()

      // Dibujar la parte recorrida de la ruta
      const progressRatio = currentDistance / totalDistance
      const currentX = startX + (endX - startX) * progressRatio
      const currentY = startY + (endY - startY) * progressRatio

      ctx.strokeStyle = "#0ea5e9" // text-sky-500
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(currentX, currentY)
      ctx.stroke()

      // Dibujar defectos en la ruta
      defects.forEach((defect) => {
        const defectRatio = defect.distance / totalDistance
        const defectX = startX + (endX - startX) * defectRatio
        const defectY = startY + (endY - startY) * defectRatio

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
        ctx.arc(defectX, defectY, 6, 0, Math.PI * 2)
        ctx.fill()
      })

      // Dibujar punto de inicio
      ctx.fillStyle = "#22c55e" // text-green-500
      ctx.beginPath()
      ctx.arc(startX, startY, 8, 0, Math.PI * 2)
      ctx.fill()

      // Dibujar punto final
      ctx.fillStyle = "#ef4444" // text-red-500
      ctx.beginPath()
      ctx.arc(endX, endY, 8, 0, Math.PI * 2)
      ctx.fill()

      // Dibujar posición actual
      ctx.fillStyle = "#0ea5e9" // text-sky-500
      ctx.beginPath()
      ctx.arc(currentX, currentY, 10, 0, Math.PI * 2)
      ctx.fill()

      // Etiquetas
      ctx.fillStyle = "#0f172a" // text-slate-900
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Inicio", startX, startY - 15)
      ctx.fillText("Fin", endX, endY - 15)

      // Coordenadas actuales
      const currentLat = startCoordinates.lat + (endCoordinates.lat - startCoordinates.lat) * progressRatio
      const currentLng = startCoordinates.lng + (endCoordinates.lng - startCoordinates.lng) * progressRatio

      ctx.fillStyle = "#0f172a" // text-slate-900
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(
        `Posición actual: ${currentLat.toFixed(4)}, ${currentLng.toFixed(4)}`,
        canvas.width / 2,
        canvas.height - 20,
      )
    }

    renderSimulatedMap()

    // Actualizar el mapa cuando cambie la distancia actual
    const handleResize = () => renderSimulatedMap()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [startCoordinates, endCoordinates, currentDistance, totalDistance, defects])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full"></div>
      <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded-md text-xs">
        <p>
          <strong>Inicio:</strong> {startCoordinates.lat.toFixed(4)}, {startCoordinates.lng.toFixed(4)}
        </p>
        <p>
          <strong>Fin:</strong> {endCoordinates.lat.toFixed(4)}, {endCoordinates.lng.toFixed(4)}
        </p>
        <p>
          <strong>Distancia:</strong> {(currentDistance / 1000).toFixed(2)} / {(totalDistance / 1000).toFixed(2)} km
        </p>
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="bg-white/80 p-2 rounded-md flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-xs">Inicio</span>
        </div>
        <div className="bg-white/80 p-2 rounded-md flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-xs">Fin</span>
        </div>
        <div className="bg-white/80 p-2 rounded-md flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-sky-500"></span>
          <span className="text-xs">Posición actual</span>
        </div>
      </div>
    </div>
  )
}
