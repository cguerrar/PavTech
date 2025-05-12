import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { EmpresasTable } from "@/components/mantenedores/empresas/empresas-table"

export default function EmpresasPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Mantenedor de Empresas" text="Administra las empresas registradas en el sistema" />
      <EmpresasTable />
    </DashboardShell>
  )
}
