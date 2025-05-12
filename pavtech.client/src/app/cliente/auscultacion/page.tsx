import { ClienteShell } from "@/components/cliente/cliente-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, BarChart3, FileSpreadsheet, RouteIcon as Road } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Datos de ejemplo para auscultaciones
const auscultaciones = [
  {
    id: 1,
    titulo: "Análisis IRI - Ruta 5 Sur Km 650-655",
    proyecto: "Ruta 5 Sur - Tramo Temuco",
    fecha: "15/08/2023",
    tipo: "IRI",
    camino: "Ruta 5 Sur",
    distancia: "5.2 km",
    estado: "Completado",
  },
  {
    id: 2,
    titulo: "Análisis IRI - Ruta 5 Sur Km 655-660",
    proyecto: "Ruta 5 Sur - Tramo Temuco",
    fecha: "15/08/2023",
    tipo: "IRI",
    camino: "Ruta 5 Sur",
    distancia: "5.0 km",
    estado: "Completado",
  },
  {
    id: 3,
    titulo: "Análisis de Grietas - Ruta 5 Sur",
    proyecto: "Ruta 5 Sur - Tramo Temuco",
    fecha: "16/08/2023",
    tipo: "Defectos",
    camino: "Ruta 5 Sur",
    distancia: "10.2 km",
    estado: "Completado",
  },
  {
    id: 4,
    titulo: "Análisis IRI - Autopista Central Norte",
    proyecto: "Autopista Central - Mantenimiento",
    fecha: "10/09/2023",
    tipo: "IRI",
    camino: "Autopista Central",
    distancia: "8.7 km",
    estado: "Completado",
  },
  {
    id: 5,
    titulo: "Análisis de Fricción - Autopista Central",
    proyecto: "Autopista Central - Mantenimiento",
    fecha: "12/09/2023",
    tipo: "Fricción",
    camino: "Autopista Central",
    distancia: "16.0 km",
    estado: "Completado",
  },
  {
    id: 6,
    titulo: "Análisis IRI - Ruta 68 Inicial",
    proyecto: "Ruta 68 - Evaluación Anual",
    fecha: "25/07/2023",
    tipo: "IRI",
    camino: "Ruta 68",
    distancia: "6.5 km",
    estado: "Completado",
  },
  {
    id: 7,
    titulo: "Análisis Completo - Camino La Pólvora",
    proyecto: "Camino La Pólvora - Valparaíso",
    fecha: "20/06/2023",
    tipo: "Completo",
    camino: "Camino La Pólvora",
    distancia: "10.2 km",
    estado: "Completado",
  },
]

export default function AuscultacionClientePage() {
  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Auscultación</h2>
            <p className="text-muted-foreground">Visualice todos los análisis de auscultación de sus proyectos</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar análisis..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>
        </div>

        <Tabs defaultValue="todos">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="iri">IRI</TabsTrigger>
            <TabsTrigger value="defectos">Defectos</TabsTrigger>
            <TabsTrigger value="friccion">Fricción</TabsTrigger>
            <TabsTrigger value="completo">Completo</TabsTrigger>
          </TabsList>
          <TabsContent value="todos" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {auscultaciones.map((auscultacion) => (
                <Card key={auscultacion.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{auscultacion.titulo}</CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          auscultacion.tipo === "IRI"
                            ? "border-blue-500 text-blue-500"
                            : auscultacion.tipo === "Defectos"
                              ? "border-red-500 text-red-500"
                              : auscultacion.tipo === "Fricción"
                                ? "border-green-500 text-green-500"
                                : "border-purple-500 text-purple-500"
                        }
                      >
                        {auscultacion.tipo}
                      </Badge>
                    </div>
                    <CardDescription>{auscultacion.proyecto}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{auscultacion.fecha}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Road className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{auscultacion.distancia}</span>
                      </div>
                      <div className="flex items-center gap-1 col-span-2">
                        <Road className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{auscultacion.camino}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1" asChild>
                        <Link href={`/cliente/auscultacion/${auscultacion.id}`}>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Ver Análisis
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <FileSpreadsheet className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="iri" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {auscultaciones
                .filter((a) => a.tipo === "IRI")
                .map((auscultacion) => (
                  <Card key={auscultacion.id}>
                    {/* Contenido similar */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{auscultacion.titulo}</CardTitle>
                      <CardDescription>{auscultacion.proyecto}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mt-4 flex gap-2">
                        <Button className="flex-1" asChild>
                          <Link href={`/cliente/auscultacion/${auscultacion.id}`}>Ver Análisis</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          {/* Contenido similar para las otras pestañas */}
          <TabsContent value="defectos" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {auscultaciones
                .filter((a) => a.tipo === "Defectos")
                .map((auscultacion) => (
                  <Card key={auscultacion.id}>
                    {/* Contenido similar */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{auscultacion.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Button className="w-full" asChild>
                        <Link href={`/cliente/auscultacion/${auscultacion.id}`}>Ver Análisis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="friccion" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {auscultaciones
                .filter((a) => a.tipo === "Fricción")
                .map((auscultacion) => (
                  <Card key={auscultacion.id}>
                    {/* Contenido similar */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{auscultacion.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Button className="w-full" asChild>
                        <Link href={`/cliente/auscultacion/${auscultacion.id}`}>Ver Análisis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completo" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {auscultaciones
                .filter((a) => a.tipo === "Completo")
                .map((auscultacion) => (
                  <Card key={auscultacion.id}>
                    {/* Contenido similar */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{auscultacion.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Button className="w-full" asChild>
                        <Link href={`/cliente/auscultacion/${auscultacion.id}`}>Ver Análisis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClienteShell>
  )
}
