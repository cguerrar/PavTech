import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CaminoForm } from "@/components/mantenedores/caminos/camino-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// Datos de ejemplo para simular la obtención de datos de un camino específico
const getCaminoById = (id: string) => {
  // En una aplicación real, aquí se haría una llamada a la API
  return {
    codigo: "R-5",
    nombre: "Ruta 5 Sur",
    region: "Metropolitana",
    provincia: "Santiago",
    comuna: "Santiago",
    longitud: 120,
    estado: "Activo",
  }
}

export default function EditarCaminoPage({ params }: { params: { id: string } }) {
  // Obtener los datos del camino según el ID
  const caminoData = getCaminoById(params.id)

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading={`Editar Camino: ${caminoData.nombre}`}
          text="Modifica la información del camino seleccionado"
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
          <CaminoForm initialData={caminoData} />
        </div>
      </div>
    </DashboardShell>
  )
}
