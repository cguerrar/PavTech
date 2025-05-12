"use client"

import { useState } from "react"
import { ArrowUpDown, Download, Eye, FileText, MoreHorizontal, Pencil, Trash2, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo para la tabla de proyectos
const projectsData = [
  {
    id: "PRJ-2023-001",
    name: "Auscultación Ruta 68 Tramo Santiago-Valparaíso",
    client: "Ministerio de Obras Públicas",
    region: "Valparaíso",
    type: "Auscultación completa",
    status: "active",
    progress: 75,
    startDate: "2023-10-15",
    endDate: "2024-03-30",
    videos: 24,
    reports: 8,
  },
  {
    id: "PRJ-2023-002",
    name: "Medición IRI Autopista Central",
    client: "Autopistas del Norte",
    region: "Metropolitana",
    type: "IRI",
    status: "active",
    progress: 90,
    startDate: "2023-11-05",
    endDate: "2024-01-15",
    videos: 18,
    reports: 12,
  },
  {
    id: "PRJ-2023-003",
    name: "Defectometría Ruta 5 Sur Tramo Chillán-Concepción",
    client: "Dirección de Vialidad",
    region: "Biobío",
    type: "Defectometría",
    status: "completed",
    progress: 100,
    startDate: "2023-08-20",
    endDate: "2023-12-10",
    videos: 32,
    reports: 16,
  },
  {
    id: "PRJ-2023-004",
    name: "Análisis de Fricción Ruta 78",
    client: "Constructora Vial S.A.",
    region: "Metropolitana",
    type: "Fricción",
    status: "paused",
    progress: 45,
    startDate: "2023-09-12",
    endDate: "2024-02-28",
    videos: 14,
    reports: 4,
  },
  {
    id: "PRJ-2023-005",
    name: "Deflectometría Ruta 5 Norte Tramo La Serena-Vallenar",
    client: "Ingeniería de Caminos",
    region: "Coquimbo",
    type: "Deflectometría",
    status: "active",
    progress: 60,
    startDate: "2023-10-30",
    endDate: "2024-04-15",
    videos: 28,
    reports: 10,
  },
  {
    id: "PRJ-2023-006",
    name: "Auscultación Completa Ruta 160 Concepción-Arauco",
    client: "Dirección de Vialidad",
    region: "Biobío",
    type: "Auscultación completa",
    status: "completed",
    progress: 100,
    startDate: "2023-07-05",
    endDate: "2023-11-20",
    videos: 36,
    reports: 18,
  },
  {
    id: "PRJ-2023-007",
    name: "Medición IRI Ruta 7 Carretera Austral",
    client: "Ministerio de Obras Públicas",
    region: "Los Lagos",
    type: "IRI",
    status: "active",
    progress: 30,
    startDate: "2023-12-01",
    endDate: "2024-05-30",
    videos: 12,
    reports: 2,
  },
  {
    id: "PRJ-2023-008",
    name: "Análisis de Fricción Autopista del Sol",
    client: "Autopistas del Norte",
    region: "Valparaíso",
    type: "Fricción",
    status: "cancelled",
    progress: 15,
    startDate: "2023-11-15",
    endDate: "2024-03-15",
    videos: 6,
    reports: 0,
  },
]

export function ProjectsTable() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")

  // Función para manejar la selección de todos los proyectos
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProjects(projectsData.map((project) => project.id))
    } else {
      setSelectedProjects([])
    }
  }

  // Función para manejar la selección de un proyecto individual
  const handleSelectProject = (projectId: string, checked: boolean) => {
    if (checked) {
      setSelectedProjects([...selectedProjects, projectId])
    } else {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId))
    }
  }

  // Función para manejar el ordenamiento de columnas
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Función para obtener el color del badge según el estado
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "outline"
      case "paused":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "completed":
        return "Completado"
      case "paused":
        return "En pausa"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  // Calcular el número total de páginas
  const totalPages = Math.ceil(projectsData.length / Number.parseInt(itemsPerPage))

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProjects.length === projectsData.length}
                    onCheckedChange={handleSelectAll}
                    aria-label="Seleccionar todos"
                  />
                </TableHead>
                <TableHead className="w-[180px]">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" onClick={() => handleSort("id")} className="hover:bg-transparent">
                      Código
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" onClick={() => handleSort("name")} className="hover:bg-transparent">
                      Nombre del Proyecto
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Región</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" onClick={() => handleSort("status")} className="hover:bg-transparent">
                      Estado
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead className="text-right">Progreso</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={(checked) => handleSelectProject(project.id, !!checked)}
                      aria-label={`Seleccionar ${project.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.region}</TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(project.status)}>{getStatusText(project.status)}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-full max-w-[100px] bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver detalles</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Video className="mr-2 h-4 w-4" />
                          <span>Ver videos ({project.videos})</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Ver informes ({project.reports})</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Mostrar</span>
            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>por página</span>
          </div>
          <span className="mx-2">|</span>
          <span>
            {selectedProjects.length} de {projectsData.length} seleccionados
          </span>
          {selectedProjects.length > 0 && (
            <>
              <span className="mx-2">|</span>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Exportar seleccionados</span>
              </Button>
            </>
          )}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(pageNumber)
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            {totalPages > 5 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={totalPages === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(totalPages)
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}
