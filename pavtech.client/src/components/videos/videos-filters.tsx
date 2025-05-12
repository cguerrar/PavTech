"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronDown, MapPin } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo para los filtros
const estadosOptions = [
  { label: "Todos los estados", value: "all" },
  { label: "Pendiente", value: "pending" },
  { label: "Procesando", value: "processing" },
  { label: "Completado", value: "completed" },
  { label: "Error", value: "error" },
]

const proyectosOptions = [
  { label: "Todos los proyectos", value: "all" },
  { label: "Auscultación Ruta 68", value: "ruta68" },
  { label: "Medición IRI Autopista Central", value: "autopista-central" },
  { label: "Defectometría Ruta 5 Sur", value: "ruta5-sur" },
  { label: "Análisis de Fricción Ruta 78", value: "ruta78" },
  { label: "Deflectometría Ruta 5 Norte", value: "ruta5-norte" },
]

export function VideosFilters() {
  const [estado, setEstado] = useState("all")
  const [proyecto, setProyecto] = useState("all")
  const [openProyecto, setOpenProyecto] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Función para aplicar filtros
  const applyFilters = () => {
    const newFilters: string[] = []

    if (estado !== "all") {
      const estadoLabel = estadosOptions.find((option) => option.value === estado)?.label
      newFilters.push(`Estado: ${estadoLabel}`)
    }

    if (proyecto !== "all") {
      const proyectoLabel = proyectosOptions.find((option) => option.value === proyecto)?.label
      newFilters.push(`Proyecto: ${proyectoLabel}`)
    }

    if (dateRange.from) {
      const dateLabel = dateRange.to
        ? `Fecha: ${format(dateRange.from, "dd/MM/yyyy", { locale: es })} - ${format(dateRange.to || dateRange.from, "dd/MM/yyyy", { locale: es })}`
        : `Fecha: desde ${format(dateRange.from, "dd/MM/yyyy", { locale: es })}`
      newFilters.push(dateLabel)
    }

    setActiveFilters(newFilters)
  }

  // Función para limpiar filtros
  const clearFilters = () => {
    setEstado("all")
    setProyecto("all")
    setDateRange({ from: undefined, to: undefined })
    setActiveFilters([])
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Filtros */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Estado del video */}
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Estado del video" />
              </SelectTrigger>
              <SelectContent>
                {estadosOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Proyecto */}
            <Popover open={openProyecto} onOpenChange={setOpenProyecto}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProyecto}
                  className="justify-between w-full"
                >
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 shrink-0" />
                    {proyecto === "all"
                      ? "Proyecto"
                      : proyectosOptions.find((option) => option.value === proyecto)?.label}
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar proyecto..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {proyectosOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            setProyecto(currentValue === proyecto ? "all" : currentValue)
                            setOpenProyecto(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", proyecto === option.value ? "opacity-100" : "opacity-0")}
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

          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearFilters} size="sm">
                Limpiar
              </Button>
              <Button onClick={applyFilters} size="sm">
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
