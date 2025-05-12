import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmpresaForm } from "@/components/mantenedores/empresas/empresa-form"

export const metadata: Metadata = {
  title: "Nueva Empresa | CapturaVial",
  description: "Crear una nueva empresa en el sistema",
}

export default function NuevaEmpresaPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Nueva Empresa</h2>
          <p className="text-sm text-muted-foreground">
            Complete el formulario para crear una nueva empresa en el sistema.
          </p>
        </div>
        <Link href="/dashboard/mantenedores/empresas">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <EmpresaForm />
      </div>
    </div>
  )
}
