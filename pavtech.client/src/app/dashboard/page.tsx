import { Activity, AlertTriangle, Clock, Layers, MapPin, RouteIcon as Road, Search, Upload, Video } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MetricCard } from "@/components/dashboard/metric-card"
import { MapView } from "@/components/dashboard/map-view"
import { ProcessingQueue } from "@/components/dashboard/processing-queue"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AnalysisCharts } from "@/components/dashboard/analysis-charts"
import { AlertsList } from "@/components/dashboard/alerts-list"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Bienvenido al sistema de auscultación vial CapturaVial">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline-block">Últimos 30 días</span>
          </Button>
          <Button className="h-8 gap-1 bg-yellow-500 hover:bg-yellow-600 text-black" asChild>
            <Link href="/dashboard/videos/upload">
              <Upload className="h-3.5 w-3.5" />
              <span>Subir Video</span>
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Kilómetros Analizados"
          metricKey="kilometersAnalyzed"
          description="respecto al mes anterior"
          descriptionKey="kilometersGrowth"
          icon={<Road className="h-4 w-4" />}
          trend="up"
        />
        <MetricCard
          title="Proyectos Activos"
          metricKey="activeProjects"
          description="proyectos completados este mes"
          descriptionKey="projectsCompleted"
          icon={<Layers className="h-4 w-4" />}
          trend="neutral"
        />
        <MetricCard
          title="Videos en Procesamiento"
          metricKey="processingVideos"
          description="Tiempo estimado:"
          descriptionKey="processingTime"
          icon={<Video className="h-4 w-4" />}
          trend="neutral"
        />
        <MetricCard
          title="Eficiencia del Sistema"
          metricKey="systemEfficiency"
          description="respecto al mes anterior"
          descriptionKey="efficiencyGrowth"
          icon={<Activity className="h-4 w-4" />}
          trend="up"
        />
      </div>

      {/* Contenido principal */}
      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-12">
        {/* Mapa interactivo - ocupa 8 columnas en pantallas grandes */}
        <Card className="md:col-span-7 lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Mapa de Proyectos</CardTitle>
              <CardDescription>Vista geográfica de todos los proyectos activos</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Search className="mr-1 h-3.5 w-3.5" />
                Buscar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video overflow-hidden rounded-md border">
              <MapView />
            </div>
          </CardContent>
          <CardFooter className="justify-between pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">Normal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-muted-foreground">Atención</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-muted-foreground">Crítico</span>
              </div>
            </div>
            <Button variant="link" size="sm" className="text-xs">
              Ver todos los proyectos
            </Button>
          </CardFooter>
        </Card>

        {/* Panel de estado de procesos - ocupa 4 columnas en pantallas grandes */}
        <Card className="md:col-span-7 lg:col-span-4">
          <CardHeader>
            <CardTitle>Estado de Procesos</CardTitle>
            <CardDescription>Videos en cola y estado de procesamiento</CardDescription>
          </CardHeader>
          <CardContent>
            <ProcessingQueue />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/videos">Ver todos los procesos</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Gráficos de análisis recientes - ocupa 8 columnas en pantallas grandes */}
        <Card className="md:col-span-7 lg:col-span-8">
          <Tabs defaultValue="charts">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Análisis Recientes</CardTitle>
                <CardDescription>Métricas y tendencias de los últimos proyectos</CardDescription>
              </div>
              <TabsList>
                <TabsTrigger value="charts">Gráficos</TabsTrigger>
                <TabsTrigger value="iri">IRI</TabsTrigger>
                <TabsTrigger value="defects">Defectos</TabsTrigger>
                <TabsTrigger value="friction">Fricción</TabsTrigger>
                <TabsTrigger value="comparative">Comparativa</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pl-2">
              <TabsContent value="charts" className="mt-0">
                <AnalysisCharts />
              </TabsContent>
              <TabsContent value="iri" className="mt-0">
                <div className="rounded-xl border p-4">
                  <h3 className="text-lg font-medium">Análisis de IRI</h3>
                  <p className="text-sm text-muted-foreground">Contenido del análisis de IRI</p>
                </div>
              </TabsContent>
              <TabsContent value="defects" className="mt-0">
                <div className="rounded-xl border p-4">
                  <h3 className="text-lg font-medium">Análisis de Defectos</h3>
                  <p className="text-sm text-muted-foreground">Contenido del análisis de defectos</p>
                </div>
              </TabsContent>
              <TabsContent value="friction" className="mt-0">
                <div className="rounded-xl border p-4">
                  <h3 className="text-lg font-medium">Análisis de Fricción</h3>
                  <p className="text-sm text-muted-foreground">Contenido del análisis de fricción</p>
                </div>
              </TabsContent>
              <TabsContent value="comparative" className="mt-0">
                <div className="rounded-xl border p-4">
                  <h3 className="text-lg font-medium">Análisis Comparativo</h3>
                  <p className="text-sm text-muted-foreground">Contenido del análisis comparativo</p>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Actividad reciente y alertas - ocupa 4 columnas en pantallas grandes */}
        <div className="space-y-4 md:col-span-7 lg:col-span-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones en el sistema</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Actualizar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </Button>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Ver todo el historial
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Alertas Críticas
                </CardTitle>
                <CardDescription>Puntos que exceden los umbrales establecidos</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <AlertsList />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Ver todas las alertas
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Atajos rápidos - ocupa todo el ancho */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Atajos Rápidos</CardTitle>
            <CardDescription>Acciones frecuentes para optimizar tu trabajo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <QuickActions />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
