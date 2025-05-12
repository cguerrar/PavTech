"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookmarkIcon, ExternalLinkIcon, MapPinIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Datos de ejemplo para los itinerarios
const itinerariosMock = [
  {
    id: 1,
    titulo: "Ruta 5 Sur Km 620-640",
    fecha: "15/04/2023",
    ubicacion: "Región del Biobío",
    proyecto: "Ruta 5 Sur",
    imagen: "/placeholder.svg?key=x0m8y",
    favorito: false,
  },
  {
    id: 2,
    titulo: "Autopista Central Km 10-30",
    fecha: "22/05/2023",
    ubicacion: "Región Metropolitana",
    proyecto: "Autopista Central",
    imagen: "/placeholder.svg?key=t99kv",
    favorito: true,
  },
  {
    id: 3,
    titulo: "Ruta Costera Km 45-65",
    fecha: "08/06/2023",
    ubicacion: "Región de Valparaíso",
    proyecto: "Ruta Costera",
    imagen: "/placeholder.svg?key=obtwp",
    favorito: false,
  },
  {
    id: 4,
    titulo: "Ruta Interior Km 120-140",
    fecha: "17/07/2023",
    ubicacion: "Región de La Araucanía",
    proyecto: "Ruta Interior",
    imagen: "/placeholder.svg?key=45g01",
    favorito: true,
  },
  {
    id: 5,
    titulo: "Ruta 5 Sur Km 700-720",
    fecha: "29/08/2023",
    ubicacion: "Región de Los Lagos",
    proyecto: "Ruta 5 Sur",
    imagen: "/placeholder.svg?key=vq9qc",
    favorito: false,
  },
  {
    id: 6,
    titulo: "Autopista Central Km 35-55",
    fecha: "10/09/2023",
    ubicacion: "Región Metropolitana",
    proyecto: "Autopista Central",
    imagen: "/placeholder.svg?height=200&width=400&query=urban%20highway%20frame",
    favorito: false,
  },
]

interface ItinerarioListProps {
  filter?: "recientes" | "favoritos"
}

export function ItinerarioList({ filter }: ItinerarioListProps) {
  const [favoritos, setFavoritos] = useState<number[]>(
    itinerariosMock.filter((item) => item.favorito).map((item) => item.id),
  )

  // Filtrar los itinerarios según el filtro seleccionado
  const itinerariosFiltered = itinerariosMock.filter((item) => {
    if (filter === "favoritos") {
      return favoritos.includes(item.id)
    }
    if (filter === "recientes") {
      // Para este ejemplo, consideramos los 3 primeros como recientes
      return [1, 2, 3].includes(item.id)
    }
    return true
  })

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {itinerariosFiltered.map((itinerario) => (
          <Card key={itinerario.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[200px] w-full">
                <Image
                  src={itinerario.imagen || "/placeholder.svg"}
                  alt={itinerario.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{itinerario.titulo}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                  {itinerario.ubicacion}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span className="mr-2">Fecha: {itinerario.fecha}</span>
                  <span>Proyecto: {itinerario.proyecto}</span>
                </div>
                <div className="flex justify-between">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/cliente/itinerario/${itinerario.id}`}>
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Ver Itinerario
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorito(itinerario.id)}
                    className={favoritos.includes(itinerario.id) ? "text-yellow-500" : ""}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
