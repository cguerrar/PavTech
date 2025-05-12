import { ClienteShell } from "@/components/cliente/cliente-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItinerarioList } from "@/components/itinerario/itinerario-list"
import { ItinerarioFilters } from "@/components/itinerario/itinerario-filters"

export default function ItinerarioPage() {
  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Itinerario Fílmico</h2>
            <p className="text-muted-foreground">Visualice fotogramas extraídos cada 20 metros de sus videos.</p>
          </div>
        </div>

        <Tabs defaultValue="todos" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="recientes">Recientes</TabsTrigger>
              <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="todos" className="space-y-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Filtre los itinerarios por proyecto, fecha o ubicación.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ItinerarioFilters />
              </CardContent>
            </Card>

            <ItinerarioList />
          </TabsContent>

          <TabsContent value="recientes" className="space-y-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Filtre los itinerarios por proyecto, fecha o ubicación.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ItinerarioFilters />
              </CardContent>
            </Card>

            <ItinerarioList filter="recientes" />
          </TabsContent>

          <TabsContent value="favoritos" className="space-y-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Filtre los itinerarios por proyecto, fecha o ubicación.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ItinerarioFilters />
              </CardContent>
            </Card>

            <ItinerarioList filter="favoritos" />
          </TabsContent>
        </Tabs>
      </div>
    </ClienteShell>
  )
}
