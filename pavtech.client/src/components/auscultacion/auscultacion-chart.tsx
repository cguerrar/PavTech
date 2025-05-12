"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface AuscultacionChartProps {
  data: Array<{
    km: number
    iri: number
  }>
}

export function AuscultacionChart({ data }: AuscultacionChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Colores para los diferentes umbrales de IRI
  const colorBueno = "#22c55e" // verde
  const colorRegular = "#f59e0b" // amarillo
  const colorMalo = "#ef4444" // rojo

  // Función para determinar el color según el valor de IRI
  const getIRIColor = (iri: number) => {
    if (iri <= 2.5) return colorBueno
    if (iri <= 3.5) return colorRegular
    return colorMalo
  }

  // Personalizar el tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const iriValue = payload[0].value
      const condicion = iriValue <= 2.5 ? "Buena" : iriValue <= 3.5 ? "Regular" : "Mala"
      const color = getIRIColor(iriValue)

      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{`Km ${label.toFixed(1)}`}</p>
          <p className="text-sm">
            IRI: <span className="font-medium">{iriValue.toFixed(2)} m/km</span>
          </p>
          <p className="text-sm">
            Condición:{" "}
            <span style={{ color }} className="font-medium">
              {condicion}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
        <XAxis
          dataKey="km"
          label={{ value: "Kilómetro", position: "insideBottomRight", offset: -10 }}
          tickFormatter={(value) => value.toFixed(1)}
        />
        <YAxis label={{ value: "IRI (m/km)", angle: -90, position: "insideLeft" }} domain={[0, 6]} tickCount={7} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={2.5}
          stroke={colorBueno}
          strokeDasharray="3 3"
          label={{ value: "Bueno", position: "right" }}
        />
        <ReferenceLine
          y={3.5}
          stroke={colorRegular}
          strokeDasharray="3 3"
          label={{ value: "Regular", position: "right" }}
        />
        <Line
          type="monotone"
          dataKey="iri"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
