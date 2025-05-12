import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileVideo, BarChart3, RouteIcon as Road } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para proyectos del cliente
const proyectosCliente = [
  {
    id: 1,
    nombre: "Ruta 5 Sur - Tramo Temuco",
    empresa: "Constructora Vial S.A.",
    fechaInicio: "15/03/2023",
    fechaFin: "30/11/2023",
    estado: "En progreso",
    progreso: 65,
    caminos: 3,
    videos: 12,
    auscultaciones: 8,
  },
  {
    id: 2,
    nombre: "Autopista Central - Mantenimiento",
    empresa: "Autopistas de Chile",
    fechaInicio: "10/01/2023",
    fechaFin: "10/01/2024",
    estado: "En progreso",
    progreso: 80,
    caminos: 2,
    videos: 24,
    auscultaciones: 18,
  },
  {
    id: 3,
    nombre: "Ruta 68 - Evaluación Anual",
    empresa: "Concesiones Viales",
    fechaInicio: "05/06/2023",
    fechaFin: "15/12/2023",
    estado: "En progreso",
    progreso: 45,
    caminos: 1,
    videos: 8,
    auscultaciones: 6,
  },
  {
    id: 4,
    nombre: "Camino La Pólvora - Valparaíso",
    empresa: "Constructora Vial S.A.",
    fechaInicio: "20/04/2023",
    fechaFin: "20/10/2023",
    estado: "Completado",
    progreso: 100,
    caminos: 1,
    videos: 6,
    auscultaciones: 6,
  },
]

export function ProyectosCliente() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {proyectosCliente.map((proyecto) => (
        <Card key={proyecto.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{proyecto.nombre}</CardTitle>
              <Badge
                variant={proyecto.estado === "Completado" ? "default" : "outline"}
                className={proyecto.estado === "Completado" ? "bg-green-500" : ""}
              >
                {proyecto.estado}
              </Badge>
            </div>
            <CardDescription>{proyecto.empresa}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2 flex-grow">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Período:</span>
                <span>
                  {proyecto.fechaInicio} - {proyecto.fechaFin}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progreso:</span>
                  <span>{proyecto.progreso}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${proyecto.progreso}%` }}></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                  <Road className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="text-xl font-semibold">{proyecto.caminos}</span>
                  <span className="text-xs text-muted-foreground">Caminos</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                  <FileVideo className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="text-xl font-semibold">{proyecto.videos}</span>
                  <span className="text-xs text-muted-foreground">Videos</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                  <BarChart3 className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="text-xl font-semibold">{proyecto.auscultaciones}</span>
                  <span className="text-xs text-muted-foreground">Análisis</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/cliente/videos?proyecto=${proyecto.id}`}>
                  <FileVideo className="h-4 w-4 mr-1" />
                  Videos
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/cliente/auscultacion?proyecto=${proyecto.id}`}>
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Análisis
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
