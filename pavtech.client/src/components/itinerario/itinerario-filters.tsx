"use client"

import { useState } from "react"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CustomSelect } from "@/components/ui/custom-select"

export function ItinerarioFilters() {
  const [date, setDate] = useState<Date>()

  const proyectos = [
    { value: "todos", label: "Todos los proyectos" },
    { value: "ruta5", label: "Ruta 5 Sur" },
    { value: "rutacosta", label: "Ruta Costera" },
    { value: "rutainterior", label: "Ruta Interior" },
    { value: "autopista", label: "Autopista Central" },
  ]

  const ubicaciones = [
    { value: "todas", label: "Todas las ubicaciones" },
    { value: "santiago", label: "Santiago" },
    { value: "valparaiso", label: "Valparaíso" },
    { value: "concepcion", label: "Concepción" },
    { value: "temuco", label: "Temuco" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <CustomSelect options={proyectos} defaultValue="todos" label="Proyecto" placeholder="Seleccione un proyecto" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal h-10">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={es} />
        </PopoverContent>
      </Popover>

      <CustomSelect
        options={ubicaciones}
        defaultValue="todas"
        label="Ubicación"
        placeholder="Seleccione una ubicación"
        icon={<MapPinIcon className="h-4 w-4 opacity-50" />}
      />
    </div>
  )
}
