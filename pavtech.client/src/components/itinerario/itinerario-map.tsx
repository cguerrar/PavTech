"use client"

import { useEffect, useRef } from "react"

interface ItinerarioMapProps {
  itinerarioId: number
}

export function ItinerarioMap({ itinerarioId }: ItinerarioMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // En una implementación real, aquí cargaríamos un mapa con las coordenadas
    // de los fotogramas del itinerario usando una biblioteca como Leaflet o Google Maps

    // Simulación de carga de mapa
    if (mapRef.current) {
      const mapContainer = mapRef.current
      mapContainer.innerHTML = `
        <div style="position: relative; width: 100%; height: 100%;">
          <img 
            src="/placeholder.svg?height=500&width=800&query=road%20map%20${itinerarioId}" 
            alt="Mapa del itinerario" 
            style="width: 100%; height: 100%; object-fit: cover;"
          />
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #666; font-weight: bold;">
            Mapa del Itinerario ${itinerarioId}<br>
            <span style="font-size: 0.8em; font-weight: normal;">
              En una implementación real, aquí se mostraría un mapa interactivo con los puntos de cada fotograma
            </span>
          </div>
        </div>
      `
    }
  }, [itinerarioId])

  return <div ref={mapRef} className="h-[500px] w-full"></div>
}
