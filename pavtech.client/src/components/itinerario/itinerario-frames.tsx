"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, ZoomIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Generar datos de ejemplo para los fotogramas
const generateFrames = (itinerarioId: number) => {
  return Array(12)
    .fill(null)
    .map((_, index) => {
      const km = 620 + itinerarioId * 20 + index * 1.6
      return {
        id: index + 1,
        km: km.toFixed(1),
        imagen: `/placeholder.svg?height=150&width=200&query=road%20frame%20${itinerarioId}%20${index}`,
        coordenadas: `${-36.5 - (index * 0.01).toFixed(3)}, ${-72.8 + (index * 0.01).toFixed(3)}`,
        fecha: "15/04/2023",
        hora: `${10 + Math.floor(index / 60)}:${(index % 60).toString().padStart(2, "0")}`,
        condicion: ["Buena", "Regular", "Mala"][Math.floor(Math.random() * 3)],
      }
    })
}

interface ItinerarioFramesProps {
  itinerarioId: number
}

export function ItinerarioFrames({ itinerarioId }: ItinerarioFramesProps) {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null)
  const frames = generateFrames(itinerarioId)

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {frames.map((frame) => (
              <div key={frame.id} className="space-y-2">
                <div className="relative group">
                  <div className="relative h-[150px] w-full overflow-hidden rounded-md">
                    <Image
                      src={frame.imagen || "/placeholder.svg"}
                      alt={`Fotograma km ${frame.km}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedFrame(frame.id)}
                        >
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <div className="space-y-4">
                          <div className="relative h-[400px] w-full">
                            <Image
                              src={selectedFrame ? frames.find((f) => f.id === selectedFrame)?.imagen || "" : ""}
                              alt="Fotograma ampliado"
                              fill
                              className="object-contain"
                            />
                          </div>
                          {selectedFrame && (
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">
                                Fotograma Km {frames.find((f) => f.id === selectedFrame)?.km}
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                Coordenadas: {frames.find((f) => f.id === selectedFrame)?.coordenadas}
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                  <span className="font-medium">Fecha:</span>{" "}
                                  {frames.find((f) => f.id === selectedFrame)?.fecha}
                                </div>
                                <div>
                                  <span className="font-medium">Hora:</span>{" "}
                                  {frames.find((f) => f.id === selectedFrame)?.hora}
                                </div>
                                <div>
                                  <span className="font-medium">Condición:</span>{" "}
                                  {frames.find((f) => f.id === selectedFrame)?.condicion}
                                </div>
                              </div>
                              <div className="flex justify-between mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setSelectedFrame((prev) => (prev && prev > 1 ? prev - 1 : frames.length))
                                  }
                                >
                                  <ChevronLeft className="h-4 w-4 mr-1" />
                                  Anterior
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setSelectedFrame((prev) => (prev && prev < frames.length ? prev + 1 : 1))
                                  }
                                >
                                  Siguiente
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">Km {frame.km}</p>
                  <p className="text-xs text-muted-foreground">Condición: {frame.condicion}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
