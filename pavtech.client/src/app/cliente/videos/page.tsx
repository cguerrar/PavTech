import { ClienteShell } from "@/components/cliente/cliente-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, FileVideo, Clock, MapPin, RouteIcon as Road } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Datos de ejemplo para videos
const videos = [
  {
    id: 1,
    titulo: "Ruta 5 Sur - Km 650-655",
    proyecto: "Ruta 5 Sur - Tramo Temuco",
    fecha: "12/08/2023",
    duracion: "15:24",
    distancia: "5.2 km",
    camino: "Ruta 5 Sur",
    thumbnail: "/winding-mountain-road.png",
    estado: "Procesado",
  },
  {
    id: 2,
    titulo: "Ruta 5 Sur - Km 655-660",
    proyecto: "Ruta 5 Sur - Tramo Temuco",
    fecha: "12/08/2023",
    duracion: "14:52",
    distancia: "5.0 km",
    camino: "Ruta 5 Sur",
    thumbnail: "/placeholder.svg?key=stncr",
    estado: "Procesado",
  },
  {
    id: 3,
    titulo: "Autopista Central - Sector Norte",
    proyecto: "Autopista Central - Mantenimiento",
    fecha: "05/09/2023",
    duracion: "22:15",
    distancia: "8.7 km",
    camino: "Autopista Central",
    thumbnail: "/placeholder.svg?key=cos1r",
    estado: "Procesado",
  },
  {
    id: 4,
    titulo: "Autopista Central - Sector Centro",
    proyecto: "Autopista Central - Mantenimiento",
    fecha: "05/09/2023",
    duracion: "18:40",
    distancia: "7.3 km",
    camino: "Autopista Central",
    thumbnail: "/placeholder.svg?key=1pmfj",
    estado: "Procesado",
  },
  {
    id: 5,
    titulo: "Ruta 68 - Tramo Inicial",
    proyecto: "Ruta 68 - Evaluación Anual",
    fecha: "22/07/2023",
    duracion: "16:18",
    distancia: "6.5 km",
    camino: "Ruta 68",
    thumbnail: "/placeholder.svg?key=78an3",
    estado: "Procesado",
  },
  {
    id: 6,
    titulo: "Camino La Pólvora - Completo",
    proyecto: "Camino La Pólvora - Valparaíso",
    fecha: "15/06/2023",
    duracion: "25:42",
    distancia: "10.2 km",
    camino: "Camino La Pólvora",
    thumbnail: "/placeholder.svg?key=r34l3",
    estado: "Procesado",
  },
]

export default function VideosClientePage() {
  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Videos</h2>
            <p className="text-muted-foreground">Visualice todos los videos de sus proyectos</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar videos..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>
        </div>

        <Tabs defaultValue="todos">
          <TabsList>
            <TabsTrigger value="todos">Todos los Videos</TabsTrigger>
            <TabsTrigger value="ruta5">Ruta 5 Sur</TabsTrigger>
            <TabsTrigger value="autopista">Autopista Central</TabsTrigger>
            <TabsTrigger value="ruta68">Ruta 68</TabsTrigger>
            <TabsTrigger value="polvora">Camino La Pólvora</TabsTrigger>
          </TabsList>
          <TabsContent value="todos" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duracion}
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{video.titulo}</CardTitle>
                      <Badge variant="outline">{video.estado}</Badge>
                    </div>
                    <CardDescription>{video.proyecto}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{video.fecha}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Road className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{video.distancia}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{video.duracion}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{video.camino}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-2">
                    <Button className="w-full" asChild>
                      <Link href={`/cliente/videos/${video.id}`}>
                        <FileVideo className="h-4 w-4 mr-2" />
                        Ver Video
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ruta5" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos
                .filter((v) => v.camino === "Ruta 5 Sur")
                .map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    {/* Contenido similar al anterior */}
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.titulo}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duracion}
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{video.titulo}</CardTitle>
                      <CardDescription>{video.proyecto}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{video.fecha}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Road className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{video.distancia}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-2">
                      <Button className="w-full" asChild>
                        <Link href={`/cliente/videos/${video.id}`}>
                          <FileVideo className="h-4 w-4 mr-2" />
                          Ver Video
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          {/* Contenido similar para las otras pestañas */}
          <TabsContent value="autopista" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos
                .filter((v) => v.camino === "Autopista Central")
                .map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    {/* Contenido similar */}
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{video.titulo}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button className="w-full" asChild>
                        <Link href={`/cliente/videos/${video.id}`}>Ver Video</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="ruta68" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos
                .filter((v) => v.camino === "Ruta 68")
                .map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    {/* Contenido similar */}
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{video.titulo}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button className="w-full" asChild>
                        <Link href={`/cliente/videos/${video.id}`}>Ver Video</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="polvora" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos
                .filter((v) => v.camino === "Camino La Pólvora")
                .map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    {/* Contenido similar */}
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{video.titulo}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button className="w-full" asChild>
                        <Link href={`/cliente/videos/${video.id}`}>Ver Video</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClienteShell>
  )
}
