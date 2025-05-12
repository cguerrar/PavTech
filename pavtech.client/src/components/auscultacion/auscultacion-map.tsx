"use client"

import { useEffect, useRef } from "react"

interface Coordenada {
  lat: number
  lng: number
  valor: number
}

interface AuscultacionMapProps {
  coordenadas: Coordenada[]
}

// Declare google as any to avoid Typescript errors. In a real project, you would install the google maps types.
declare global {
  interface Window {
    google: any
  }
}

export function AuscultacionMap({ coordenadas }: AuscultacionMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    // Función para inicializar el mapa
    const initMap = () => {
      if (!mapRef.current) return

      // Calcular el centro del mapa basado en las coordenadas
      const bounds = new google.maps.LatLngBounds()
      coordenadas.forEach((coord) => {
        bounds.extend(new google.maps.LatLng(coord.lat, coord.lng))
      })

      // Crear el mapa
      const mapOptions: google.maps.MapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }

      const map = new google.maps.Map(mapRef.current, mapOptions)
      map.fitBounds(bounds)
      mapInstanceRef.current = map

      // Crear la línea con colores según el valor de IRI
      const path = coordenadas.map((coord) => new google.maps.LatLng(coord.lat, coord.lng))

      // Crear marcadores para cada punto con información
      coordenadas.forEach((coord, index) => {
        // Determinar el color según el valor
        let color = "#22c55e" // verde para bueno
        if (coord.valor > 2.5 && coord.valor <= 3.5) {
          color = "#f59e0b" // amarillo para regular
        } else if (coord.valor > 3.5) {
          color = "#ef4444" // rojo para malo
        }

        // Crear marcador
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(coord.lat, coord.lng),
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#ffffff",
          },
          title: `IRI: ${coord.valor.toFixed(1)} m/km`,
        })

        // Crear ventana de información
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <div style="font-weight: 500;">Punto ${index + 1}</div>
              <div>IRI: ${coord.valor.toFixed(1)} m/km</div>
              <div>Condición: ${coord.valor <= 2.5 ? "Buena" : coord.valor <= 3.5 ? "Regular" : "Mala"}</div>
            </div>
          `,
        })

        // Mostrar información al hacer clic en el marcador
        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })

      // Crear la línea de la ruta
      const polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#3b82f6",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      })

      polyline.setMap(map)
    }

    // Cargar la API de Google Maps
    if (typeof window.google === "undefined") {
      // En un entorno real, cargaríamos la API de Google Maps
      // Para este ejemplo, simulamos que ya está cargada
      console.log("En un entorno real, aquí se cargaría la API de Google Maps")

      // Simulación de mapa para el ejemplo
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <div style="height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f1f5f9; border-radius: 0.375rem;">
            <div style="text-align: center;">
              <div style="font-size: 1.25rem; font-weight: 500; margin-bottom: 0.5rem;">Mapa de Auscultación</div>
              <div style="color: #64748b;">Aquí se mostraría el mapa con ${coordenadas.length} puntos de medición</div>
              <div style="margin-top: 1rem; display: flex; gap: 1rem; justify-content: center;">
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #22c55e;"></div>
                  <span style="font-size: 0.875rem;">Bueno</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #f59e0b;"></div>
                  <span style="font-size: 0.875rem;">Regular</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.25rem;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #ef4444;"></div>
                  <span style="font-size: 0.875rem;">Malo</span>
                </div>
              </div>
            </div>
          </div>
        `
      }
    } else {
      initMap()
    }

    return () => {
      // Limpiar el mapa al desmontar el componente
      if (mapInstanceRef.current) {
        // En un entorno real, limpiaríamos el mapa
      }
    }
  }, [coordenadas])

  return <div ref={mapRef} className="w-full h-full rounded-md" />
}
