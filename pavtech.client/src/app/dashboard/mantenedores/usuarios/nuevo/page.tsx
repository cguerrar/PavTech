import { Button } from "@/components/ui/button"
import { UsuarioForm } from "@/components/mantenedores/usuarios/usuario-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NuevoUsuarioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Crear Nuevo Usuario</h1>
          <p className="text-muted-foreground">Completa el formulario para agregar un nuevo usuario al sistema.</p>
        </div>
        <Link href="/dashboard/mantenedores/usuarios">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg p-6 bg-card">
        <UsuarioForm />
      </div>
    </div>
  )
}
