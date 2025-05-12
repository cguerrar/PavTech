import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RolesTable } from "@/components/mantenedores/roles/roles-table"

export default function RolesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Mantenedor de Roles" text="Configura los roles y permisos del sistema" />
      <RolesTable />
    </DashboardShell>
  )
}
