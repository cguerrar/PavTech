"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, FileText } from "lucide-react"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Tipo para los datos de proyecto
type Proyecto = {
  id: string
  codigo: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  empresaId: string
  empresaNombre: string
  caminoId: string
  caminoNombre: string
  tipoAuscultacionId: string
  tipoAuscultacionNombre: string
  presupuesto: number
  kmTotales: number
  estado: string
  prioridad: string
}

// Datos de ejemplo
const data: Proyecto[] = [
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

export function ProyectosTable() {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewingProyecto, setViewingProyecto] = useState<Proyecto | null>(null)

  const columns: ColumnDef<Proyecto>[] = [
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
      cell: ({ row }) => <div className="font-medium">{row.getValue("codigo")}</div>,
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
      cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "empresaNombre",
      header: "Empresa",
      cell: ({ row }) => <div>{row.getValue("empresaNombre")}</div>,
    },
    {
      accessorKey: "caminoNombre",
      header: "Camino",
      cell: ({ row }) => <div>{row.getValue("caminoNombre")}</div>,
    },
    {
      accessorKey: "fechaInicio",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Fecha Inicio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{new Date(row.getValue("fechaInicio")).toLocaleDateString()}</div>,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string
        let badgeVariant: "default" | "secondary" | "outline" | "destructive" = "default"

        switch (estado) {
          case "Completado":
            badgeVariant = "default"
            break
          case "En Progreso":
            badgeVariant = "secondary"
            break
          case "Planificado":
            badgeVariant = "outline"
            break
          case "Cancelado":
            badgeVariant = "destructive"
            break
        }

        return <Badge variant={badgeVariant}>{estado}</Badge>
      },
    },
    {
      accessorKey: "prioridad",
      header: "Prioridad",
      cell: ({ row }) => {
        const prioridad = row.getValue("prioridad") as string
        let className = ""

        switch (prioridad) {
          case "Alta":
            className = "text-red-600 font-medium"
            break
          case "Media":
            className = "text-amber-600 font-medium"
            break
          case "Baja":
            className = "text-green-600 font-medium"
            break
        }

        return <div className={className}>{prioridad}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const proyecto = row.original

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
                  setViewingProyecto(proyecto)
                  setIsViewDialogOpen(true)
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/dashboard/mantenedores/proyectos/${proyecto.id}`} className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Aquí iría la lógica para eliminar
                  alert(`Eliminar proyecto: ${proyecto.nombre}`)
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
        createRoute="/dashboard/mantenedores/proyectos/nuevo"
      />

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles del Proyecto</DialogTitle>
            <DialogDescription>Información completa del proyecto seleccionado.</DialogDescription>
          </DialogHeader>
          {viewingProyecto && (
            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Código</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.codigo}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Estado</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.estado}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <h4 className="text-sm font-medium">Nombre</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.nombre}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <h4 className="text-sm font-medium">Descripción</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.descripcion}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Empresa</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.empresaNombre}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Camino</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.caminoNombre}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Tipo de Auscultación</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.tipoAuscultacionNombre}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Prioridad</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.prioridad}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Fecha de Inicio</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(viewingProyecto.fechaInicio).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Fecha de Fin</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(viewingProyecto.fechaFin).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Presupuesto</h4>
                <p className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  }).format(viewingProyecto.presupuesto)}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Kilómetros Totales</h4>
                <p className="text-sm text-muted-foreground">{viewingProyecto.kmTotales} km</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
