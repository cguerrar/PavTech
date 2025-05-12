"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/mantenedores/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Tipo para los datos de empresa
type Empresa = {
  id: string
  rut: string
  nombre: string
  direccion: string
  telefono: string
  email: string
  sitioWeb: string
  tipoEmpresa: string
  estado: string
}

// Datos de ejemplo
const data: Empresa[] = [
  {
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
  {
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
  {
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
  {
    id: "4",
    rut: "96.234.567-8",
    nombre: "Mantención de Carreteras S.A.",
    direccion: "Av. Vitacura 2939, Vitacura, Santiago",
    telefono: "+56 2 2765 4321",
    email: "info@mantencioncarreteras.cl",
    sitioWeb: "www.mantencioncarreteras.cl",
    tipoEmpresa: "Mantenimiento",
    estado: "Inactivo",
  },
  {
    id: "5",
    rut: "77.890.123-4",
    nombre: "Tecnología Vial SpA",
    direccion: "Isidora Goyenechea 2800, Las Condes, Santiago",
    telefono: "+56 2 2345 6780",
    email: "contacto@tecnologiavial.cl",
    sitioWeb: "www.tecnologiavial.cl",
    tipoEmpresa: "Tecnología",
    estado: "Activo",
  },
]

export function EmpresasTable() {
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const columns: ColumnDef<Empresa>[] = [
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
      accessorKey: "rut",
      header: "RUT",
      cell: ({ row }) => <div>{row.getValue("rut")}</div>,
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
      accessorKey: "telefono",
      header: "Teléfono",
      cell: ({ row }) => <div>{row.getValue("telefono")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "tipoEmpresa",
      header: "Tipo",
      cell: ({ row }) => <div>{row.getValue("tipoEmpresa")}</div>,
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
        const empresa = row.original

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
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/mantenedores/empresas/${empresa.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Aquí iría la lógica para eliminar
                  alert(`Eliminar empresa: ${empresa.nombre}`)
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
    <DataTable
      columns={columns}
      data={data}
      searchColumn="nombre"
      createRoute="/dashboard/mantenedores/empresas/nuevo"
    />
  )
}
