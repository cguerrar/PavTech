"use client"

import { useEffect, useRef } from "react"

interface IriDataPoint {
  distance: number
  value: number
}

interface Defect {
  distance: number
  type: string
  severity: string
}

interface VideoMetricsProps {
  iriData: IriDataPoint[]
  defects: Defect[]
  currentDistance: number
}

export function VideoMetrics({ iriData, defects, currentDistance }: VideoMetricsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Dibujar el gráfico de IRI
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
        canvas.height = 200
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Configuración del gráfico
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Encontrar valores mínimos y máximos
    const maxDistance = Math.max(...iriData.map((d) => d.distance))
    const maxIri = Math.max(...iriData.map((d) => d.value))
    const minIri = Math.min(...iriData.map((d) => d.value))

    // Función para convertir valores a coordenadas del canvas
    const xScale = (distance: number) => padding.left + (distance / maxDistance) * chartWidth
    const yScale = (iri: number) => padding.top + chartHeight - ((iri - minIri) / (maxIri - minIri)) * chartHeight

    // Dibujar ejes
    ctx.strokeStyle = "#cbd5e1" // border-slate-300
    ctx.lineWidth = 1

    // Eje X
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top + chartHeight)
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
    ctx.stroke()

    // Eje Y
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, padding.top + chartHeight)
    ctx.stroke()

    // Dibujar líneas de cuadrícula horizontales
    ctx.strokeStyle = "#e2e8f0" // border-slate-200
    ctx.lineWidth = 0.5

    const iriStep = Math.ceil((maxIri - minIri) / 5)
    for (let i = Math.floor(minIri); i <= Math.ceil(maxIri); i += iriStep) {
      const y = yScale(i)

      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      // Etiquetas del eje Y
      ctx.fillStyle = "#64748b" // text-slate-500
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(i.toFixed(1), padding.left - 5, y + 3)
    }

    // Dibujar líneas de cuadrícula verticales (cada km)
    const kmStep = 1000 // 1 km
    for (let i = 0; i <= maxDistance; i += kmStep) {
      const x = xScale(i)

      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, padding.top + chartHeight)
      ctx.stroke()

      // Etiquetas del eje X
      ctx.fillStyle = "#64748b" // text-slate-500
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${(i / 1000).toFixed(0)} km`, x, padding.top + chartHeight + 15)
    }

    // Dibujar línea de IRI
    ctx.strokeStyle = "#0ea5e9" // text-sky-500
    ctx.lineWidth = 2
    ctx.beginPath()

    iriData.forEach((point, i) => {
      const x = xScale(point.distance)
      const y = yScale(point.value)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Dibujar puntos de datos
    iriData.forEach((point) => {
      const x = xScale(point.distance)
      const y = yScale(point.value)

      ctx.fillStyle = "#0ea5e9" // text-sky-500
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Dibujar defectos en el gráfico
    defects.forEach((defect) => {
      const x = xScale(defect.distance)

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
      ctx.arc(x, padding.top, 8, 0, Math.PI * 2)
      ctx.fill()
    })

    // Dibujar línea vertical para la posición actual
    const currentX = xScale(currentDistance)
    ctx.strokeStyle = "#0f172a" // text-slate-900
    ctx.lineWidth = 2
    ctx.setLineDash([5, 3])
    ctx.beginPath()
    ctx.moveTo(currentX, padding.top)
    ctx.lineTo(currentX, padding.top + chartHeight)
    ctx.stroke()
    ctx.setLineDash([])

    // Título del gráfico
    ctx.fillStyle = "#0f172a" // text-slate-900
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Índice de Rugosidad Internacional (IRI)", padding.left, padding.top - 5)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [iriData, defects, currentDistance])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Índice de Rugosidad Internacional (IRI)</h3>
        <div className="bg-slate-50 rounded-md p-2">
          <canvas ref={canvasRef} className="w-full" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Defectos Detectados</h3>
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Distancia</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Tipo</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Severidad</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {defects.map((defect, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-2 text-sm">{(defect.distance / 1000).toFixed(2)} km</td>
                  <td className="px-4 py-2 text-sm capitalize">{defect.type}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        defect.severity === "alta"
                          ? "bg-red-100 text-red-700"
                          : defect.severity === "media"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {defect.severity}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">{currentDistance >= defect.distance ? "Pasado" : "Pendiente"}</td>
                </tr>
              ))}
              {defects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-sm text-center text-muted-foreground">
                    No se han detectado defectos en este tramo
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
