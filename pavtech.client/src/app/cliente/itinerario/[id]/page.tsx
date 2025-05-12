import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Download, MapPin, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClienteShell } from "@/components/cliente/cliente-shell"
import { ItinerarioFrames } from "@/components/itinerario/itinerario-frames"
import { ItinerarioMap } from "@/components/itinerario/itinerario-map"

export default function ItinerarioDetailPage({ params }: { params: { id: string } }) {
  // En un caso real, aquí cargaríamos los datos del itinerario según el ID
  const itinerario = {
    id: Number.parseInt(params.id),
    titulo: `Ruta 5 Sur Km ${620 + Number.parseInt(params.id) * 20}-${640 + Number.parseInt(params.id) * 20}`,
    fecha: "15/04/2023",
    ubicacion: "Región del Biobío",
    proyecto: "Ruta 5 Sur",
    descripcion:
      "Itinerario fílmico que muestra el estado de la Ruta 5 Sur entre los kilómetros indicados. Se observan diversos puntos de interés y posibles deterioros en la calzada.",
    totalFotogramas: 42,
    distanciaTotal: "20 km",
    operador: "Juan Pérez",
    fechaCaptura: "12/04/2023",
    equipoUtilizado: "Cámara HD + GPS",
    imagen: "/placeholder.svg?key=o6ez6",
  }

  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/cliente/itinerario">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Contenido principal */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{itinerario.titulo}</h1>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {itinerario.ubicacion}
              </div>
            </div>

            <Tabs defaultValue="fotogramas" className="space-y-4">
              <TabsList>
                <TabsTrigger value="fotogramas">Fotogramas</TabsTrigger>
                <TabsTrigger value="mapa">Mapa</TabsTrigger>
                <TabsTrigger value="info">Información</TabsTrigger>
              </TabsList>

              <TabsContent value="fotogramas" className="space-y-4">
                <ItinerarioFrames itinerarioId={itinerario.id} />
              </TabsContent>

              <TabsContent value="mapa" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <ItinerarioMap itinerarioId={itinerario.id} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="info" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Itinerario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">Descripción</h3>
                      <p className="text-muted-foreground">{itinerario.descripcion}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium">Detalles del Proyecto</h3>
                        <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                          <li>
                            <span className="font-medium">Proyecto:</span> {itinerario.proyecto}
                          </li>
                          <li>
                            <span className="font-medium">Fecha de captura:</span> {itinerario.fechaCaptura}
                          </li>
                          <li>
                            <span className="font-medium">Operador:</span> {itinerario.operador}
                          </li>
                          <li>
                            <span className="font-medium">Equipo utilizado:</span> {itinerario.equipoUtilizado}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium">Estadísticas</h3>
                        <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                          <li>
                            <span className="font-medium">Total de fotogramas:</span> {itinerario.totalFotogramas}
                          </li>
                          <li>
                            <span className="font-medium">Distancia total:</span> {itinerario.distanciaTotal}
                          </li>
                          <li>
                            <span className="font-medium">Intervalo de captura:</span> 20 metros
                          </li>
                          <li>
                            <span className="font-medium">Fecha de procesamiento:</span> {itinerario.fecha}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Panel lateral */}
          <div className="w-full md:w-80 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Itinerario
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Itinerarios Relacionados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((id) => (
                  <Link href={`/cliente/itinerario/${id}`} key={id} className="block group">
                    <div className="flex items-start space-x-3">
                      <div className="relative h-14 w-20 rounded overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=56&width=80&query=road%20frame%20${id}`}
                          alt={`Itinerario relacionado ${id}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                          Ruta 5 Sur Km {600 + id * 20}-{620 + id * 20}
                        </h4>
                        <p className="text-xs text-muted-foreground">Región del Biobío</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClienteShell>
  )
}
