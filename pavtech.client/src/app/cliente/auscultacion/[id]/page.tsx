import { ClienteShell } from "@/components/cliente/cliente-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { AuscultacionMap } from "@/components/auscultacion/auscultacion-map"
import { AuscultacionChart } from "@/components/auscultacion/auscultacion-chart"
import { AuscultacionTable } from "@/components/auscultacion/auscultacion-table"
import { AuscultacionInfo } from "@/components/auscultacion/auscultacion-info"

// Datos de ejemplo para la auscultación
const auscultacionesData = [
  {
    id: "1",
    titulo: "Análisis IRI - Ruta 5 Sur Km 650-655",
    proyecto: "Ruta 5 Sur - Tramo Temuco",
    fecha: "15/08/2023",
    tipo: "IRI",
    camino: "Ruta 5 Sur",
    distancia: "5.2 km",
    estado: "Completado",
    descripcion:
      "Análisis de regularidad superficial en el tramo Temuco de la Ruta 5 Sur, entre los kilómetros 650 y 655.",
    cliente: "Ministerio de Obras Públicas",
    responsable: "Juan Pérez",
    fechaInicio: "10/08/2023",
    fechaTermino: "15/08/2023",
    equipos: ["Perfilómetro láser", "GPS de alta precisión"],
    metodologia: "Medición continua con perfilómetro láser a 80 km/h",
    resultados: {
      promedio: 2.4,
      minimo: 1.2,
      maximo: 4.8,
      desviacion: 0.8,
      porcentajeCumplimiento: 87,
    },
    coordenadas: [
      { lat: -38.7382, lng: -72.5909, valor: 1.8 },
      { lat: -38.739, lng: -72.585, valor: 2.1 },
      { lat: -38.74, lng: -72.58, valor: 2.5 },
      { lat: -38.741, lng: -72.575, valor: 3.2 },
      { lat: -38.742, lng: -72.57, valor: 2.8 },
      { lat: -38.743, lng: -72.565, valor: 2.3 },
      { lat: -38.744, lng: -72.56, valor: 1.9 },
      { lat: -38.745, lng: -72.555, valor: 2.2 },
      { lat: -38.746, lng: -72.55, valor: 2.7 },
      { lat: -38.747, lng: -72.545, valor: 3.5 },
    ],
    datosTabla: [
      { km: "650.000", iri: 1.8, condicion: "Buena" },
      { km: "650.500", iri: 2.1, condicion: "Buena" },
      { km: "651.000", iri: 2.5, condicion: "Regular" },
      { km: "651.500", iri: 3.2, condicion: "Regular" },
      { km: "652.000", iri: 2.8, condicion: "Regular" },
      { km: "652.500", iri: 2.3, condicion: "Buena" },
      { km: "653.000", iri: 1.9, condicion: "Buena" },
      { km: "653.500", iri: 2.2, condicion: "Buena" },
      { km: "654.000", iri: 2.7, condicion: "Regular" },
      { km: "654.500", iri: 3.5, condicion: "Regular" },
      { km: "655.000", iri: 4.8, condicion: "Mala" },
    ],
    datosGrafico: [
      { km: 650.0, iri: 1.8 },
      { km: 650.5, iri: 2.1 },
      { km: 651.0, iri: 2.5 },
      { km: 651.5, iri: 3.2 },
      { km: 652.0, iri: 2.8 },
      { km: 652.5, iri: 2.3 },
      { km: 653.0, iri: 1.9 },
      { km: 653.5, iri: 2.2 },
      { km: 654.0, iri: 2.7 },
      { km: 654.5, iri: 3.5 },
      { km: 655.0, iri: 4.8 },
    ],
  },
  // Otros datos de auscultación...
]

export default function AuscultacionDetallePage({ params }: { params: { id: string } }) {
  // Buscar la auscultación por ID
  const auscultacion = auscultacionesData.find((a) => a.id === params.id) || auscultacionesData[0]

  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/cliente/auscultacion">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Link>
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">{auscultacion.titulo}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{auscultacion.proyecto}</span>
              <span>•</span>
              <span>{auscultacion.fecha}</span>
              <Badge
                variant="outline"
                className={
                  auscultacion.tipo === "IRI"
                    ? "ml-2 border-blue-500 text-blue-500"
                    : auscultacion.tipo === "Defectos"
                      ? "ml-2 border-red-500 text-red-500"
                      : auscultacion.tipo === "Fricción"
                        ? "ml-2 border-green-500 text-green-500"
                        : "ml-2 border-purple-500 text-purple-500"
                }
              >
                {auscultacion.tipo}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
              <span className="sr-only">Imprimir</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Compartir</span>
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">IRI Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auscultacion.resultados.promedio.toFixed(1)} m/km</div>
              <p className="text-xs text-muted-foreground">
                Rango: {auscultacion.resultados.minimo.toFixed(1)} - {auscultacion.resultados.maximo.toFixed(1)} m/km
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cumplimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auscultacion.resultados.porcentajeCumplimiento}%</div>
              <p className="text-xs text-muted-foreground">Porcentaje de tramos que cumplen con el estándar</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Distancia Analizada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auscultacion.distancia}</div>
              <p className="text-xs text-muted-foreground">Tramo: Km 650 - Km 655</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grafico">
          <TabsList>
            <TabsTrigger value="grafico">Gráfico</TabsTrigger>
            <TabsTrigger value="mapa">Mapa</TabsTrigger>
            <TabsTrigger value="tabla">Tabla</TabsTrigger>
            <TabsTrigger value="info">Información</TabsTrigger>
          </TabsList>
          <TabsContent value="grafico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gráfico de IRI</CardTitle>
                <CardDescription>Valores de IRI a lo largo del tramo analizado</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <AuscultacionChart data={auscultacion.datosGrafico} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mapa" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mapa de IRI</CardTitle>
                <CardDescription>Visualización geográfica de los valores de IRI</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <AuscultacionMap coordenadas={auscultacion.coordenadas} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tabla" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tabla de Datos</CardTitle>
                <CardDescription>Valores detallados por kilómetro</CardDescription>
              </CardHeader>
              <CardContent>
                <AuscultacionTable datos={auscultacion.datosTabla} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información del Análisis</CardTitle>
                <CardDescription>Detalles técnicos y metodología</CardDescription>
              </CardHeader>
              <CardContent>
                <AuscultacionInfo auscultacion={auscultacion} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClienteShell>
  )
}
