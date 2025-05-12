import { ClienteShell } from "@/components/cliente/cliente-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, MapPin, RouteIcon as Road, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { VideoPlayer } from "@/components/videos/video-player"

// Datos de ejemplo para el video
const getVideoData = (id: string) => {
  return {
    id: Number.parseInt(id),
    titulo: "Ruta 5 Sur - Km 650-655",
    proyecto: "Ruta 5 Sur - Tramo Temuco",
    fecha: "12/08/2023",
    duracion: "15:24",
    distancia: "5.2 km",
    camino: "Ruta 5 Sur",
    thumbnail: "/winding-mountain-road.png",
    estado: "Procesado",
    descripcion:
      "Video de auscultación de la Ruta 5 Sur, tramo Temuco, kilómetros 650 a 655. Realizado el 12 de agosto de 2023.",
    videoUrl: "/placeholder.svg", // En un caso real, aquí iría la URL del video
    empresa: "Ministerio de Obras Públicas",
    equipamiento: "Cámara de alta definición, GPS, Acelerómetro",
    velocidad: "80 km/h",
    clima: "Despejado",
    temperatura: "22°C",
    operador: "Juan Pérez",
    vehiculo: "Toyota Land Cruiser 2022",
    coordenadas: {
      inicio: { lat: -38.7382, lng: -72.5909 },
      fin: { lat: -38.6982, lng: -72.5309 },
    },
    defectos: [
      { tipo: "Grieta longitudinal", cantidad: 12, severidad: "Media", km: "651.2" },
      { tipo: "Bache", cantidad: 3, severidad: "Alta", km: "652.8" },
      { tipo: "Ahuellamiento", cantidad: 1, severidad: "Baja", km: "654.1" },
    ],
  }
}

export default function VideoClienteDetallePage({ params }: { params: { id: string } }) {
  const video = getVideoData(params.id)

  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{video.titulo}</h2>
            <p className="text-muted-foreground">{video.proyecto}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/cliente/videos">Volver a Videos</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-0 overflow-hidden rounded-lg">
                <div className="aspect-video relative">
                  <VideoPlayer />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="informacion">
              <TabsList>
                <TabsTrigger value="informacion">Información</TabsTrigger>
                <TabsTrigger value="defectos">Defectos Detectados</TabsTrigger>
                <TabsTrigger value="mapa">Mapa</TabsTrigger>
              </TabsList>
              <TabsContent value="informacion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalles del Video</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Proyecto:</span>
                          <span className="font-medium">{video.proyecto}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha:</span>
                          <span className="font-medium">{video.fecha}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duración:</span>
                          <span className="font-medium">{video.duracion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Distancia:</span>
                          <span className="font-medium">{video.distancia}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Camino:</span>
                          <span className="font-medium">{video.camino}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Empresa:</span>
                          <span className="font-medium">{video.empresa}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Equipamiento:</span>
                          <span className="font-medium">{video.equipamiento}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Velocidad:</span>
                          <span className="font-medium">{video.velocidad}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Clima:</span>
                          <span className="font-medium">{video.clima}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Temperatura:</span>
                          <span className="font-medium">{video.temperatura}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Descripción</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{video.descripcion}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="defectos">
                <Card>
                  <CardHeader>
                    <CardTitle>Defectos Detectados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full caption-bottom text-sm">
                        <thead>
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Cantidad</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Severidad</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Kilómetro</th>
                          </tr>
                        </thead>
                        <tbody>
                          {video.defectos.map((defecto, index) => (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">{defecto.tipo}</td>
                              <td className="p-4 align-middle">{defecto.cantidad}</td>
                              <td className="p-4 align-middle">
                                <Badge
                                  variant={
                                    defecto.severidad === "Alta"
                                      ? "destructive"
                                      : defecto.severidad === "Media"
                                        ? "default"
                                        : "outline"
                                  }
                                >
                                  {defecto.severidad}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle">{defecto.km}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="mapa">
                <Card>
                  <CardHeader>
                    <CardTitle>Ubicación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] bg-muted rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        Mapa no disponible en la vista previa
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Coordenadas de inicio</h4>
                        <p className="text-sm text-muted-foreground">
                          Lat: {video.coordenadas.inicio.lat}, Lng: {video.coordenadas.inicio.lng}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Coordenadas de fin</h4>
                        <p className="text-sm text-muted-foreground">
                          Lat: {video.coordenadas.fin.lat}, Lng: {video.coordenadas.fin.lng}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información del Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Fecha: {video.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duración: {video.duracion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Road className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Distancia: {video.distancia}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Camino: {video.camino}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Badge className="w-full justify-center py-1">{video.estado}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">{video.operador.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{video.operador}</p>
                    <p className="text-sm text-muted-foreground">Técnico de Auscultación</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Videos Relacionados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="relative h-16 w-24 flex-none rounded-md overflow-hidden">
                      <Image src="/placeholder.svg?key=rel1" alt="Video relacionado" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Ruta 5 Sur - Km 645-650</h4>
                      <p className="text-xs text-muted-foreground">10/08/2023 • 14:35</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative h-16 w-24 flex-none rounded-md overflow-hidden">
                      <Image src="/placeholder.svg?key=rel2" alt="Video relacionado" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Ruta 5 Sur - Km 655-660</h4>
                      <p className="text-xs text-muted-foreground">12/08/2023 • 16:10</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Ver más videos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClienteShell>
  )
}
