import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CaminosTable } from "@/components/mantenedores/caminos/caminos-table"

export default function CaminosPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Mantenedor de Caminos" text="Gestiona los caminos y rutas del sistema" />
      <CaminosTable />
    </DashboardShell>
  )
}
