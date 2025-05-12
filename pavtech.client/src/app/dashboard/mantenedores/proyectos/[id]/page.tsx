"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProyectoForm } from "@/components/mantenedores/proyectos/proyecto-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Datos de ejemplo
const proyectos = [
  {
    id: "1",
    codigo: "PRY-2023-001",
    nombre: "Auscultación Ruta 5 Sur Tramo Santiago-Rancagua",
    descripcion: "Evaluación completa del estado del pavimento en la Ruta 5 Sur entre Santiago y Rancagua",
    fechaInicio: "2023-03-15",
    fechaFin: "2023-06-30",
    empresaId: "1",
    empresaNombre: "Constructora Vial S.A.",
    caminoId: "1",
    caminoNombre: "Ruta 5 Sur",
    tipoAuscultacionId: "1",
    tipoAuscultacionNombre: "Estructural",
    presupuesto: 120000000,
    kmTotales: 85.5,
    estado: "En Progreso",
    prioridad: "Alta",
  },
  {
    id: "2",
    codigo: "PRY-2023-002",
    nombre: "Evaluación Autopista del Sol",
    descripcion: "Medición de IRI y detección de grietas en la Autopista del Sol",
    fechaInicio: "2023-04-10",
    fechaFin: "2023-07-15",
    empresaId: "3",
    empresaNombre: "Auscultación Vial SpA",
    caminoId: "3",
    caminoNombre: "Autopista del Sol",
    tipoAuscultacionId: "2",
    tipoAuscultacionNombre: "Superficial",
    presupuesto: 95000000,
    kmTotales: 110.8,
    estado: "Completado",
    prioridad: "Media",
  },
  {
    id: "3",
    codigo: "PRY-2023-003",
    nombre: "Monitoreo Ruta 68",
    descripcion: "Monitoreo continuo del estado del pavimento en la Ruta 68",
    fechaInicio: "2023-05-20",
    fechaFin: "2023-08-30",
    empresaId: "2",
    empresaNombre: "Ingeniería de Caminos Ltda.",
    caminoId: "2",
    caminoNombre: "Ruta 68",
    tipoAuscultacionId: "3",
    tipoAuscultacionNombre: "Integral",
    presupuesto: 150000000,
    kmTotales: 85.2,
    estado: "En Progreso",
    prioridad: "Alta",
  },
  {
    id: "4",
    codigo: "PRY-2023-004",
    nombre: "Evaluación Autopista Los Libertadores",
    descripcion: "Evaluación de la condición estructural de la Autopista Los Libertadores",
    fechaInicio: "2023-06-05",
    fechaFin: "2023-09-15",
    empresaId: "5",
    empresaNombre: "Tecnología Vial SpA",
    caminoId: "4",
    caminoNombre: "Autopista Los Libertadores",
    tipoAuscultacionId: "1",
    tipoAuscultacionNombre: "Estructural",
    presupuesto: 85000000,
    kmTotales: 65.4,
    estado: "Planificado",
    prioridad: "Media",
  },
  {
    id: "5",
    codigo: "PRY-2023-005",
    nombre: "Auscultación Ruta 160",
    descripcion: "Auscultación integral de la Ruta 160 en la región del Biobío",
    fechaInicio: "2023-07-10",
    fechaFin: "2023-10-30",
    empresaId: "4",
    empresaNombre: "Mantención de Carreteras S.A.",
    caminoId: "5",
    caminoNombre: "Ruta 160",
    tipoAuscultacionId: "3",
    tipoAuscultacionNombre: "Integral",
    presupuesto: 130000000,
    kmTotales: 95.7,
    estado: "Planificado",
    prioridad: "Baja",
  },
]

export default function EditarProyectoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [proyecto, setProyecto] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulamos la obtención de datos del proyecto
    const fetchProyecto = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // En un caso real, aquí haríamos una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 500))

        const proyectoEncontrado = proyectos.find((p) => p.id === params.id)

        if (proyectoEncontrado) {
          setProyecto(proyectoEncontrado)
        } else {
          setError("Proyecto no encontrado")
        }
      } catch (err) {
        setError("Error al cargar los datos del proyecto")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProyecto()
  }, [params.id])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Aquí iría la lógica para actualizar el proyecto en la base de datos
    // Simulamos una petición con un timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/dashboard/mantenedores/proyectos")
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-2" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Cargando...</h1>
          </div>
        </div>
        <div className="border rounded-lg p-6 bg-white">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-2" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Error</h1>
          </div>
        </div>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/dashboard/mantenedores/proyectos")}>
            Volver a la lista de proyectos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Editar Proyecto</h1>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-white">
        <ProyectoForm initialData={proyecto} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}
