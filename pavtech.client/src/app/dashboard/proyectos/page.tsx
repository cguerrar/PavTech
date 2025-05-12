import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProjectsStats } from "@/components/projects/projects-stats"
import { ProjectsFilters } from "@/components/projects/projects-filters"
import { ProjectsTable } from "@/components/projects/projects-table"

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Proyectos" text="Gestiona y visualiza todos los proyectos de auscultación vial">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </DashboardHeader>

      {/* Estadísticas de proyectos */}
      <ProjectsStats />

      {/* Filtros y búsqueda avanzada */}
      <ProjectsFilters />

      {/* Tabla de proyectos */}
      <ProjectsTable />
    </DashboardShell>
  )
}
