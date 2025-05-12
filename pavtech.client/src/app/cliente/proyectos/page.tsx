import { ClienteShell } from "@/components/cliente/cliente-shell"
import { ProyectosCliente } from "@/components/cliente/proyectos-cliente"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ProyectosClientePage() {
  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mis Proyectos</h2>
            <p className="text-muted-foreground">Visualice todos los proyectos a los que tiene acceso</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar proyectos..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>
        </div>

        <ProyectosCliente />
      </div>
    </ClienteShell>
  )
}
