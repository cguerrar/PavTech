"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/mantenedores/data-table"
import { TipoAuscultacionForm } from "@/components/mantenedores/tipos-auscultacion/tipo-auscultacion-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Tipo para los datos de tipo de auscultacion
type TipoAuscultacion = {
  id: string
  nombre: string
  descripcion: string
  estado: string
}

// Datos de ejemplo
const data: TipoAuscultacion[] = [
  {
    id: "1",
    nombre: "Estructural",
    descripcion: "Evaluación de la capacidad estructural del pavimento",
    estado: "Activo",
  },
  {
    id: "2",
    nombre: "Superficial",
    descripcion: "Evaluación de las características superficiales del pavimento",
    estado: "Activo",
  },
  {
    id: "3",
    nombre: "Integral",
    descripcion: "Evaluación completa del pavimento",
    estado: "Activo",
  },
  {
    id: "4",
    nombre: "Funcional",
    descripcion: "Evaluación de las características funcionales del pavimento",
    estado: "Inactivo",
  },
  {
    id: "5",
    nombre: "Geométrica",
    descripcion: "Evaluación de las características geométricas del pavimento",
    estado: "Activo",
  },
]

export function TiposAuscultacionTable() {
  const [editingTipoAuscultacion, setEditingTipoAuscultacion] = useState<TipoAuscultacion | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const columns: ColumnDef<TipoAuscultacion>[] = [
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
      cell: ({ row }) => <div className="max-w-[400px] truncate">{row.getValue("descripcion")}</div>,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string
        return <div className={`${estado === "Activo" ? "text-green-600" : "text-red-600"} font-medium`}>{estado}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const tipoAuscultacion = row.original

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
                  setEditingTipoAuscultacion(tipoAuscultacion)
                  setIsEditDialogOpen(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Aquí iría la lógica para eliminar
                  alert(`Eliminar tipo de auscultación: ${tipoAuscultacion.nombre}`)
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
        createFormTitle="Crear Nuevo Tipo de Auscultación"
        createFormDescription="Completa los campos para agregar un nuevo tipo de auscultación al sistema."
        createForm={<TipoAuscultacionForm />}
      />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Tipo de Auscultación</DialogTitle>
            <DialogDescription>Modifica los datos del tipo de auscultación seleccionado.</DialogDescription>
          </DialogHeader>
          {editingTipoAuscultacion && <TipoAuscultacionForm initialData={editingTipoAuscultacion} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
