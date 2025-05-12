import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmpresaForm } from "@/components/mantenedores/empresas/empresa-form"

export const metadata: Metadata = {
  title: "Editar Empresa | CapturaVial",
  description: "Modificar datos de una empresa existente",
}

// Función para simular la obtención de datos de una empresa según su ID
async function getEmpresaById(id: string) {
  // En un caso real, aquí se haría una llamada a la API o base de datos
  // Para este ejemplo, devolvemos datos simulados
  const empresas = {
    "1": {
      id: "1",
      rut: "76.123.456-7",
      nombre: "Constructora Vial S.A.",
      direccion: "Av. Apoquindo 4501, Las Condes, Santiago",
      telefono: "+56 2 2345 6789",
      email: "contacto@constructoravial.cl",
      sitioWeb: "www.constructoravial.cl",
      tipoEmpresa: "Constructora",
      estado: "Activo",
    },
    "2": {
      id: "2",
      rut: "96.789.012-3",
      nombre: "Ingeniería de Caminos Ltda.",
      direccion: "Los Leones 382, Providencia, Santiago",
      telefono: "+56 2 2987 6543",
      email: "info@ingenieriacaminos.cl",
      sitioWeb: "www.ingenieriacaminos.cl",
      tipoEmpresa: "Consultora",
      estado: "Activo",
    },
    "3": {
      id: "3",
      rut: "77.456.789-0",
      nombre: "Auscultación Vial SpA",
      direccion: "Av. Kennedy 5735, Las Condes, Santiago",
      telefono: "+56 2 2123 4567",
      email: "contacto@auscultacionvial.cl",
      sitioWeb: "www.auscultacionvial.cl",
      tipoEmpresa: "Especialista",
      estado: "Activo",
    },
  }

  return empresas[id as keyof typeof empresas] || null
}

export default async function EditarEmpresaPage({ params }: { params: { id: string } }) {
  const empresa = await getEmpresaById(params.id)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Editar Empresa: {empresa?.nombre || "No encontrada"}
          </h2>
          <p className="text-sm text-muted-foreground">Modifique los datos de la empresa seleccionada.</p>
        </div>
        <Link href="/dashboard/mantenedores/empresas">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        {empresa ? (
          <EmpresaForm initialData={empresa} />
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">Empresa no encontrada</h3>
            <p className="text-sm text-muted-foreground mt-2">
              La empresa que intenta editar no existe o ha sido eliminada.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
