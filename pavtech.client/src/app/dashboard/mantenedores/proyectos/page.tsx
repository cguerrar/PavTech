import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProyectosTable } from "@/components/mantenedores/proyectos/proyectos-table"

export default function ProyectosPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Mantenedor de Proyectos" text="Gestiona los proyectos de auscultación del sistema" />
      <ProyectosTable />
    </DashboardShell>
  )
}
