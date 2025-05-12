"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ComparacionForm } from "@/components/comparacion/comparacion-form"
import { ComparacionViewer } from "@/components/comparacion/comparacion-viewer"
import { CambiosDetectados } from "@/components/comparacion/cambios-detectados"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tipos para los fotogramas seleccionados
export interface FrameSeleccionado {
  id: string
  videoId: string
  videoNombre: string
  fecha: string
  kilometraje: number
  urlImagen: string
  coordenadas: { lat: number; lng: number }
}

export default function ComparacionPage() {
  const [framesSeleccionados, setFramesSeleccionados] = useState<{
    frame1: FrameSeleccionado | null
    frame2: FrameSeleccionado | null
  }>({
    frame1: null,
    frame2: null,
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Comparación de Fotogramas"
        text="Compara fotogramas del mismo punto kilométrico en diferentes fechas para analizar cambios en el estado del camino."
      />

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <ComparacionForm onFramesSelected={(frame1, frame2) => setFramesSeleccionados({ frame1, frame2 })} />
          </CardContent>
        </Card>

        {framesSeleccionados.frame1 && framesSeleccionados.frame2 && (
          <>
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <Tabs defaultValue="sideBySide" className="w-full">
                  <div className="px-6 pt-6">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                      <TabsTrigger value="sideBySide">Lado a Lado</TabsTrigger>
                      <TabsTrigger value="slider">Deslizador</TabsTrigger>
                      <TabsTrigger value="overlay">Superposición</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="sideBySide" className="p-6">
                    <ComparacionViewer
                      frame1={framesSeleccionados.frame1}
                      frame2={framesSeleccionados.frame2}
                      mode="sideBySide"
                    />
                  </TabsContent>
                  <TabsContent value="slider" className="p-6">
                    <ComparacionViewer
                      frame1={framesSeleccionados.frame1}
                      frame2={framesSeleccionados.frame2}
                      mode="slider"
                    />
                  </TabsContent>
                  <TabsContent value="overlay" className="p-6">
                    <ComparacionViewer
                      frame1={framesSeleccionados.frame1}
                      frame2={framesSeleccionados.frame2}
                      mode="overlay"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <CambiosDetectados frame1={framesSeleccionados.frame1} frame2={framesSeleccionados.frame2} />
          </>
        )}
      </div>
    </DashboardShell>
  )
}
