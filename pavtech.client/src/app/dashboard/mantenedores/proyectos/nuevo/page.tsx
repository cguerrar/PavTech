"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProyectoForm } from "@/components/mantenedores/proyectos/proyecto-form"

export default function NuevoProyectoPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Crear Nuevo Proyecto</h1>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <ProyectoForm />
      </div>
    </div>
  )
}
