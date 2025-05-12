"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DatoTabla {
  km: string
  iri: number
  condicion: string
}

interface AuscultacionTableProps {
  datos: DatoTabla[]
}

export function AuscultacionTable({ datos }: AuscultacionTableProps) {
  const [filtro, setFiltro] = useState("")

  // Filtrar datos según el término de búsqueda
  const datosFiltrados = datos.filter(
    (dato) =>
      dato.km.toLowerCase().includes(filtro.toLowerCase()) ||
      dato.condicion.toLowerCase().includes(filtro.toLowerCase()) ||
      dato.iri.toString().includes(filtro),
  )

  // Función para determinar el color según la condición
  const getCondicionColor = (condicion: string) => {
    switch (condicion.toLowerCase()) {
      case "buena":
        return "text-green-600"
      case "regular":
        return "text-amber-600"
      case "mala":
        return "text-red-600"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Filtrar datos..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kilómetro</TableHead>
              <TableHead>IRI (m/km)</TableHead>
              <TableHead>Condición</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datosFiltrados.map((dato, index) => (
              <TableRow key={index}>
                <TableCell>{dato.km}</TableCell>
                <TableCell>{dato.iri.toFixed(1)}</TableCell>
                <TableCell className={getCondicionColor(dato.condicion)}>{dato.condicion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        Mostrando {datosFiltrados.length} de {datos.length} registros
      </div>
    </div>
  )
}
