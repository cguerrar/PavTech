import { Button } from "@/components/ui/button"
import { UsuarioForm } from "@/components/mantenedores/usuarios/usuario-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

// Datos de ejemplo
const usuarios = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@constructoravial.cl",
    rut: "12.345.678-9",
    telefono: "+56 9 1234 5678",
    cargo: "Ingeniero de Proyectos",
    rolId: "1",
    rolNombre: "Administrador",
    empresaId: "1",
    empresaNombre: "Constructora Vial S.A.",
    fechaCreacion: "2023-01-15",
    ultimoAcceso: "2023-05-20T14:30:00",
    estado: "Activo",
    avatar: "/masculine-avatar.png",
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@ingenieriacaminos.cl",
    rut: "9.876.543-2",
    telefono: "+56 9 8765 4321",
    cargo: "Directora de Operaciones",
    rolId: "2",
    rolNombre: "Supervisor",
    empresaId: "2",
    empresaNombre: "Ingeniería de Caminos Ltda.",
    fechaCreacion: "2023-02-10",
    ultimoAcceso: "2023-05-19T09:15:00",
    estado: "Activo",
    avatar: "/generic-avatar-icon.png",
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "carlos.rodriguez@auscultacionvial.cl",
    rut: "15.678.901-2",
    telefono: "+56 9 2345 6789",
    cargo: "Técnico de Auscultación",
    rolId: "3",
    rolNombre: "Técnico",
    empresaId: "3",
    empresaNombre: "Auscultación Vial SpA",
    fechaCreacion: "2023-03-05",
    ultimoAcceso: "2023-05-18T16:45:00",
    estado: "Activo",
    avatar: "/masculine-avatar.png",
  },
]

export default function EditarUsuarioPage({ params }: { params: { id: string } }) {
  // En un caso real, aquí se cargarían los datos del usuario desde una API
  const usuario = usuarios.find((u) => u.id === params.id)

  if (!usuario) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar Usuario</h1>
          <p className="text-muted-foreground">
            Modifica los datos del usuario {usuario.nombre} {usuario.apellido}.
          </p>
        </div>
        <Link href="/dashboard/mantenedores/usuarios">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <UsuarioForm initialData={usuario} />
      </div>
    </div>
  )
}
