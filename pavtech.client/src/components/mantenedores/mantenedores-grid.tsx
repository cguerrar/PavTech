import Link from "next/link"
import { RouteIcon as Road, Building2, FolderKanban, Users, UserCog, Activity } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const mantenedores = [
  {
    title: "Caminos",
    description: "Gestiona los caminos y rutas del sistema",
    icon: Road,
    href: "/dashboard/mantenedores/caminos",
  },
  {
    title: "Empresas",
    description: "Administra las empresas registradas",
    icon: Building2,
    href: "/dashboard/mantenedores/empresas",
  },
  {
    title: "Proyectos",
    description: "Gestiona los proyectos de auscultación",
    icon: FolderKanban,
    href: "/dashboard/mantenedores/proyectos",
  },
  {
    title: "Usuarios",
    description: "Administra los usuarios del sistema",
    icon: Users,
    href: "/dashboard/mantenedores/usuarios",
  },
  {
    title: "Roles de Usuario",
    description: "Configura los roles y permisos",
    icon: UserCog,
    href: "/dashboard/mantenedores/roles",
  },
  {
    title: "Tipos de Auscultación",
    description: "Gestiona los tipos de auscultación disponibles",
    icon: Activity,
    href: "/dashboard/mantenedores/tipos-auscultacion",
  },
]

export function MantenedoresGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mantenedores.map((item) => (
        <Link href={item.href} key={item.title}>
          <Card className="h-full transition-all hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
