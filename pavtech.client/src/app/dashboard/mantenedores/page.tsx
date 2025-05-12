import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MantenedoresGrid } from "@/components/mantenedores/mantenedores-grid"

export default function MantenedoresPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Mantenedores" text="Administra las entidades principales del sistema" />
      <MantenedoresGrid />
    </DashboardShell>
  )
}
