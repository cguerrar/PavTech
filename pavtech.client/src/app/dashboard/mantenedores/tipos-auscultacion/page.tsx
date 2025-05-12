import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TiposAuscultacionTable } from "@/components/mantenedores/tipos-auscultacion/tipos-auscultacion-table"

export default function TiposAuscultacionPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Mantenedor de Tipos de Auscultación"
        text="Gestiona los tipos de auscultación disponibles en el sistema"
      />
      <TiposAuscultacionTable />
    </DashboardShell>
  )
}
