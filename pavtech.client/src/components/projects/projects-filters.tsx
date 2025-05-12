"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronDown, ChevronsUpDown, Filter, MapPin, Search, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo para los filtros
const statusOptions = [
  { label: "Todos los estados", value: "all" },
  { label: "Activo", value: "active" },
  { label: "Completado", value: "completed" },
  { label: "En pausa", value: "paused" },
  { label: "Cancelado", value: "cancelled" },
]

const typeOptions = [
  { label: "Todos los tipos", value: "all" },
  { label: "Auscultación completa", value: "full" },
  { label: "IRI", value: "iri" },
  { label: "Defectometría", value: "defects" },
  { label: "Fricción", value: "friction" },
  { label: "Deflectometría", value: "deflection" },
]

const companyOptions = [
  { label: "Todas las empresas", value: "all" },
  { label: "Ministerio de Obras Públicas", value: "mop" },
  { label: "Dirección de Vialidad", value: "dv" },
  { label: "Autopistas del Norte", value: "adn" },
  { label: "Constructora Vial S.A.", value: "cvsa" },
  { label: "Ingeniería de Caminos", value: "ic" },
]

const regionOptions = [
  { label: "Todas las regiones", value: "all" },
  { label: "Región Metropolitana", value: "rm" },
  { label: "Valparaíso", value: "valpo" },
  { label: "Biobío", value: "biobio" },
  { label: "Coquimbo", value: "coquimbo" },
  { label: "Los Lagos", value: "lagos" },
]

export function ProjectsFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("all")
  const [projectType, setProjectType] = useState("all")
  const [company, setCompany] = useState("all")
  const [region, setRegion] = useState("all")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [openCompany, setOpenCompany] = useState(false)
  const [openRegion, setOpenRegion] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Función para manejar la aplicación de filtros
  const applyFilters = () => {
    const newFilters: string[] = []

    if (status !== "all") {
      const statusLabel = statusOptions.find((option) => option.value === status)?.label
      newFilters.push(`Estado: ${statusLabel}`)
    }

    if (projectType !== "all") {
      const typeLabel = typeOptions.find((option) => option.value === projectType)?.label
      newFilters.push(`Tipo: ${typeLabel}`)
    }

    if (company !== "all") {
      const companyLabel = companyOptions.find((option) => option.value === company)?.label
      newFilters.push(`Empresa: ${companyLabel}`)
    }

    if (region !== "all") {
      const regionLabel = regionOptions.find((option) => option.value === region)?.label
      newFilters.push(`Región: ${regionLabel}`)
    }

    if (dateRange.from) {
      const dateLabel = dateRange.to
        ? `Fecha: ${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to || dateRange.from, "dd/MM/yyyy")}`
        : `Fecha: desde ${format(dateRange.from, "dd/MM/yyyy")}`
      newFilters.push(dateLabel)
    }

    if (searchTerm) {
      newFilters.push(`Búsqueda: "${searchTerm}"`)
    }

    setActiveFilters(newFilters)
  }

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm("")
    setStatus("all")
    setProjectType("all")
    setCompany("all")
    setRegion("all")
    setDateRange({ from: undefined, to: undefined })
    setActiveFilters([])
  }

  // Función para eliminar un filtro específico
  const removeFilter = (filter: string) => {
    const filterType = filter.split(":")[0].trim()

    switch (filterType) {
      case "Estado":
        setStatus("all")
        break
      case "Tipo":
        setProjectType("all")
        break
      case "Empresa":
        setCompany("all")
        break
      case "Región":
        setRegion("all")
        break
      case "Fecha":
        setDateRange({ from: undefined, to: undefined })
        break
      case "Búsqueda":
        setSearchTerm("")
        break
    }

    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Barra de búsqueda principal */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, código o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => applyFilters()} className="gap-2">
                <Filter className="h-4 w-4" />
                Aplicar Filtros
              </Button>
              <Button variant="ghost" onClick={() => clearFilters()} className="gap-2">
                <X className="h-4 w-4" />
                Limpiar
              </Button>
            </div>
          </div>

          {/* Filtros avanzados */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Estado del proyecto */}
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Estado del proyecto" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tipo de proyecto */}
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de proyecto" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Empresa */}
            <Popover open={openCompany} onOpenChange={setOpenCompany}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCompany}
                  className="justify-between w-full"
                >
                  {company === "all" ? "Empresa" : companyOptions.find((option) => option.value === company)?.label}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar empresa..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {companyOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setCompany(currentValue === company ? "all" : currentValue)
                            setOpenCompany(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", company === option.value ? "opacity-100" : "opacity-0")}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Región */}
            <Popover open={openRegion} onOpenChange={setOpenRegion}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={openRegion} className="justify-between w-full">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 shrink-0" />
                    {region === "all" ? "Región" : regionOptions.find((option) => option.value === region)?.label}
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar región..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {regionOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setRegion(currentValue === region ? "all" : currentValue)
                            setOpenRegion(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", region === option.value ? "opacity-100" : "opacity-0")}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Rango de fechas */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full",
                    !dateRange.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yyyy", { locale: es })} -{" "}
                        {format(dateRange.to, "dd/MM/yyyy", { locale: es })}
                      </>
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy", { locale: es })
                    )
                  ) : (
                    "Rango de fechas"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Filtros activos */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
