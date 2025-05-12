import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CaminoForm } from "@/components/mantenedores/caminos/camino-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function NuevoCaminoPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Crear Nuevo Camino"
          text="Ingresa la información para registrar un nuevo camino en el sistema"
        />
        <Link href="/dashboard/mantenedores/caminos">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border p-6 shadow-sm">
          <CaminoForm />
        </div>
      </div>
    </DashboardShell>
  )
}
