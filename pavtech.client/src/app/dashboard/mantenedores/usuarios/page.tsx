import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UsuariosTable } from "@/components/mantenedores/usuarios/usuarios-table"

export default function UsuariosPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Mantenedor de Usuarios" text="Administra los usuarios del sistema" />
      <UsuariosTable />
    </DashboardShell>
  )
}
