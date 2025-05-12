"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/mantenedores/data-table"
import { CaminoForm } from "@/components/mantenedores/caminos/camino-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Tipo para los datos de camino
type Camino = {
  id: string
  codigo: string
  nombre: string
  region: string
  provincia: string
  comuna: string
  longitud: number
  estado: string
}

// Datos de ejemplo
const data: Camino[] = [
  {
    id: "1",
    codigo: "R-5",
    nombre: "Ruta 5 Sur",
    region: "Metropolitana",
    provincia: "Santiago",
    comuna: "Santiago",
    longitud: 120.5,
    estado: "Activo",
  },
  {
    id: "2",
    codigo: "R-68",
    nombre: "Ruta 68",
    region: "Valparaíso",
    provincia: "Valparaíso",
    comuna: "Casablanca",
    longitud: 85.2,
    estado: "Activo",
  },
  {
    id: "3",
    codigo: "R-78",
    nombre: "Autopista del Sol",
    region: "Metropolitana",
    provincia: "Melipilla",
    comuna: "Melipilla",
    longitud: 110.8,
    estado: "En mantención",
  },
  {
    id: "4",
    codigo: "R-57",
    nombre: "Autopista Los Libertadores",
    region: "Metropolitana",
    provincia: "Chacabuco",
    comuna: "Colina",
    longitud: 65.4,
    estado: "Activo",
  },
  {
    id: "5",
    codigo: "R-160",
    nombre: "Ruta 160",
    region: "Biobío",
    provincia: "Concepción",
    comuna: "Coronel",
    longitud: 95.7,
    estado: "Activo",
  },
]

export function CaminosTable() {
  const [editingCamino, setEditingCamino] = useState<Camino | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const columns: ColumnDef<Camino>[] = [
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
      accessorKey: "codigo",
      header: "Código",
      cell: ({ row }) => <div>{row.getValue("codigo")}</div>,
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
      cell: ({ row }) => <div>{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "region",
      header: "Región",
      cell: ({ row }) => <div>{row.getValue("region")}</div>,
    },
    {
      accessorKey: "provincia",
      header: "Provincia",
      cell: ({ row }) => <div>{row.getValue("provincia")}</div>,
    },
    {
      accessorKey: "comuna",
      header: "Comuna",
      cell: ({ row }) => <div>{row.getValue("comuna")}</div>,
    },
    {
      accessorKey: "longitud",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Longitud (km)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("longitud")} km</div>,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string
        return (
          <div className={`${estado === "Activo" ? "text-green-600" : "text-amber-600"} font-medium`}>{estado}</div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const camino = row.original

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
                  setEditingCamino(camino)
                  setIsEditDialogOpen(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Aquí iría la lógica para eliminar
                  alert(`Eliminar camino: ${camino.nombre}`)
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
        createRoute="/dashboard/mantenedores/caminos/nuevo"
        createFormTitle="Crear Nuevo Camino"
        createFormDescription="Completa los campos para agregar un nuevo camino al sistema."
        createForm={<CaminoForm />}
      />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Camino</DialogTitle>
            <DialogDescription>Modifica los datos del camino seleccionado.</DialogDescription>
          </DialogHeader>
          {editingCamino && <CaminoForm initialData={editingCamino} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
