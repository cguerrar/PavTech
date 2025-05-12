import { PlusCircle, Search, Filter, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { VideosList } from "@/components/videos/videos-list"
import { VideosFilters } from "@/components/videos/videos-filters"

export default function VideosPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Videos" text="Gestiona y visualiza todos los videos de auscultación">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" asChild>
          <a href="/dashboard/videos/upload">
            <PlusCircle className="mr-2 h-4 w-4" />
            Subir Video
          </a>
        </Button>
      </DashboardHeader>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar videos por nombre, proyecto o camino..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline-block">Filtrar</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline-block">Opciones</span>
          </Button>
        </div>
      </div>

      {/* Filtros avanzados */}
      <VideosFilters />

      {/* Lista de videos */}
      <VideosList />
    </DashboardShell>
  )
}
