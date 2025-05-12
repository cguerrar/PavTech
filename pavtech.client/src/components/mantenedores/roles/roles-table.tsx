"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/mantenedores/data-table"
import { RolForm } from "@/components/mantenedores/roles/rol-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { PermisosForm } from "@/components/mantenedores/roles/permisos-form"

// Tipo para los datos de rol
type Rol = {
  id: string
  nombre: string
  descripcion: string
  nivelAcceso: number
  usuariosAsignados: number
  permisos: string[]
  fechaCreacion: string
  fechaModificacion: string
  estado: string
}

// Datos de ejemplo
const data: Rol[] = [
  {
    id: "1",
    nombre: "Administrador",
    descripcion: "Acceso completo a todas las funcionalidades del sistema",
    nivelAcceso: 100,
    usuariosAsignados: 3,
    permisos: [
      "dashboard:view",
      "proyectos:create",
      "proyectos:edit",
      "proyectos:delete",
      "usuarios:create",
      "usuarios:edit",
      "usuarios:delete",
      "roles:create",
      "roles:edit",
      "roles:delete",
      "caminos:create",
      "caminos:edit",
      "caminos:delete",
      "empresas:create",
      "empresas:edit",
      "empresas:delete",
      "tipos_auscultacion:create",
      "tipos_auscultacion:edit",
      "tipos_auscultacion:delete",
    ],
    fechaCreacion: "2023-01-01",
    fechaModificacion: "2023-01-01",
    estado: "Activo",
  },
  {
    id: "2",
    nombre: "Supervisor",
    descripcion: "Acceso a gestión de proyectos y visualización de datos",
    nivelAcceso: 80,
    usuariosAsignados: 5,
    permisos: [
      "dashboard:view",
      "proyectos:create",
      "proyectos:edit",
      "proyectos:view",
      "usuarios:view",
      "caminos:view",
      "empresas:view",
      "tipos_auscultacion:view",
    ],
    fechaCreacion: "2023-01-01",
    fechaModificacion: "2023-03-15",
    estado: "Activo",
  },
  {
    id: "3",
    nombre: "Técnico",
    descripcion: "Acceso a operaciones técnicas y registro de datos",
    nivelAcceso: 60,
    usuariosAsignados: 8,
    permisos: ["dashboard:view", "proyectos:view", "caminos:view", "tipos_auscultacion:view"],
    fechaCreacion: "2023-01-01",
    fechaModificacion: "2023-02-10",
    estado: "Activo",
  },
  {
    id: "4",
    nombre: "Analista",
    descripcion: "Acceso a visualización y análisis de datos",
    nivelAcceso: 50,
    usuariosAsignados: 4,
    permisos: ["dashboard:view", "proyectos:view", "caminos:view"],
    fechaCreacion: "2023-01-01",
    fechaModificacion: "2023-04-20",
    estado: "Activo",
  },
  {
    id: "5",
    nombre: "Visualizador",
    descripcion: "Acceso de solo lectura a datos seleccionados",
    nivelAcceso: 20,
    usuariosAsignados: 12,
    permisos: ["dashboard:view", "proyectos:view"],
    fechaCreacion: "2023-01-01",
    fechaModificacion: "2023-01-01",
    estado: "Activo",
  },
]

export function RolesTable() {
  const [editingRol, setEditingRol] = useState<Rol | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPermisosDialogOpen, setIsPermisosDialogOpen] = useState(false)
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null)

  const columns: ColumnDef<Rol>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("descripcion")}</div>,
    },
    {
      accessorKey: "nivelAcceso",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nivel de Acceso
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("nivelAcceso")}</div>,
    },
    {
      accessorKey: "usuariosAsignados",
      header: "Usuarios",
      cell: ({ row }) => <div>{row.getValue("usuariosAsignados")}</div>,
    },
    {
      accessorKey: "permisos",
      header: "Permisos",
      cell: ({ row }) => {
        const permisos = row.original.permisos
        return <div>{permisos.length} permisos</div>
      },
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string
        return <Badge variant={estado === "Activo" ? "default" : "secondary"}>{estado}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const rol = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEditingRol(rol)
                  setIsEditDialogOpen(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRol(rol)
                  setIsPermisosDialogOpen(true)
                }}
              >
                <Shield className="mr-2 h-4 w-4" />
                Configurar permisos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // Aquí iría la lógica para eliminar
                  alert(`Eliminar rol: ${rol.nombre}`)
                }}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchColumn="nombre"
        createFormTitle="Crear Nuevo Rol"
        createFormDescription="Completa los campos para agregar un nuevo rol al sistema."
        createForm={<RolForm />}
      />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Rol</DialogTitle>
            <DialogDescription>Modifica los datos del rol seleccionado.</DialogDescription>
          </DialogHeader>
          {editingRol && <RolForm initialData={editingRol} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isPermisosDialogOpen} onOpenChange={setIsPermisosDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Configurar Permisos</DialogTitle>
            <DialogDescription>Configura los permisos para el rol {selectedRol?.nombre}</DialogDescription>
          </DialogHeader>
          {selectedRol && <PermisosForm rol={selectedRol} onClose={() => setIsPermisosDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
