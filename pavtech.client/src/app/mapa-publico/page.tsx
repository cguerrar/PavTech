"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Info, Layers, ZoomIn, ZoomOut, LocateFixed, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Simulación de datos de dispositivos en tiempo real
const generateDeviceData = () => {
  // Generar entre 80-120 dispositivos
  const deviceCount = Math.floor(Math.random() * 40) + 80
  const devices = []

  for (let i = 0; i < deviceCount; i++) {
    // Generar valores IRI entre 1 y 10
    const iriValue = Math.random() * 9 + 1

    // Determinar el estado basado en el valor IRI
    let status = "bueno"
    let statusColor = "bg-green-500"

    if (iriValue > 7) {
      status = "crítico"
      statusColor = "bg-red-500"
    } else if (iriValue > 5) {
      status = "malo"
      statusColor = "bg-orange-500"
    } else if (iriValue > 3) {
      status = "regular"
      statusColor = "bg-yellow-500"
    }

    devices.push({
      id: `DEV-${1000 + i}`,
      lat: -33.4 - Math.random() * 0.5,
      lng: -70.6 - Math.random() * 0.5,
      iriValue: iriValue.toFixed(2),
      status,
      statusColor,
      lastUpdate: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Última hora
      speed: Math.floor(Math.random() * 80) + 20, // 20-100 km/h
      batteryLevel: Math.floor(Math.random() * 100),
      alerts: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    })
  }

  return devices
}

export default function MapaPublicoPage() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [activeDevices, setActiveDevices] = useState(0)
  const [criticalAlerts, setCriticalAlerts] = useState(0)
  const [zoom, setZoom] = useState(50)
  const [isLoading, setIsLoading] = useState(true)

  // Simular carga inicial de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialDevices = generateDeviceData()
      setDevices(initialDevices)
      setActiveDevices(initialDevices.length)
      setCriticalAlerts(initialDevices.filter((d) => d.status === "crítico").length)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Simular actualizaciones periódicas de datos
  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      // Actualizar algunos dispositivos aleatoriamente
      const updatedDevices = [...devices]
      const updateCount = Math.floor(Math.random() * 10) + 5 // Actualizar 5-15 dispositivos

      for (let i = 0; i < updateCount; i++) {
        const deviceIndex = Math.floor(Math.random() * updatedDevices.length)
        const device = { ...updatedDevices[deviceIndex] }

        // Cambiar ligeramente el valor IRI
        const iriChange = Math.random() * 0.6 - 0.3 // -0.3 a +0.3
        device.iriValue = Math.max(1, Math.min(10, Number.parseFloat(device.iriValue) + iriChange)).toFixed(2)

        // Actualizar estado basado en nuevo valor IRI
        if (Number.parseFloat(device.iriValue) > 7) {
          device.status = "crítico"
          device.statusColor = "bg-red-500"
        } else if (Number.parseFloat(device.iriValue) > 5) {
          device.status = "malo"
          device.statusColor = "bg-orange-500"
        } else if (Number.parseFloat(device.iriValue) > 3) {
          device.status = "regular"
          device.statusColor = "bg-yellow-500"
        } else {
          device.status = "bueno"
          device.statusColor = "bg-green-500"
        }

        // Actualizar última actualización
        device.lastUpdate = new Date().toISOString()

        // Actualizar velocidad
        device.speed = Math.floor(Math.random() * 80) + 20

        // Actualizar posición ligeramente
        device.lat += Math.random() * 0.01 - 0.005
        device.lng += Math.random() * 0.01 - 0.005

        updatedDevices[deviceIndex] = device
      }

      setDevices(updatedDevices)
      setCriticalAlerts(updatedDevices.filter((d) => d.status === "crítico").length)
    }, 5000) // Actualizar cada 5 segundos

    return () => clearInterval(interval)
  }, [devices, isLoading])

  const handleDeviceClick = (device) => {
    setSelectedDevice(device)
  }

  const handleCloseDetail = () => {
    setSelectedDevice(null)
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 100))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 10))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a Inicio</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="relative h-10 w-40">
              <Image
                src="/logo-capturavial.png"
                alt="CapturaVial Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="object-left"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Datos en vivo
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-xl font-bold">Estado de la Red Vial</h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Dispositivos activos:</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      {activeDevices}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Alertas críticas:</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      {criticalAlerts}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Última actualización:</span>
                    <span className="text-xs">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Leyenda IRI</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="text-xs">Bueno (1-3)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Regular (3-5)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <span className="text-xs">Malo (5-7)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span className="text-xs">Crítico (7-10)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Filtros</h3>
                  <Tabs defaultValue="todos">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="todos">Todos</TabsTrigger>
                      <TabsTrigger value="alertas">Alertas</TabsTrigger>
                      <TabsTrigger value="normal">Normal</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Info className="mr-2 h-4 w-4" />
                    Acerca de los datos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dispositivos recientes */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Actualizaciones recientes</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {devices.slice(0, 8).map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                      onClick={() => handleDeviceClick(device)}
                    >
                      <div className={`w-3 h-3 rounded-full ${device.statusColor}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <span className="text-xs font-medium">{device.id}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(device.lastUpdate).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">IRI: {device.iriValue}</span>
                          <span className="text-xs">{device.speed} km/h</span>
                        </div>
                      </div>
                      {device.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {device.alerts}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-140px)]">
              <CardContent className="p-0 h-full relative">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="text-sm text-muted-foreground">Cargando datos del mapa...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Mapa simulado */}
                    <div className="relative h-full w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      {/* Imagen de fondo del mapa */}
                      <div className="absolute inset-0 opacity-50">
                        <Image
                          src="/placeholder.svg?key=26lqo"
                          alt="Mapa de fondo"
                          fill
                          style={{ objectFit: "cover" }}
                          className="filter blur-[1px]"
                        />
                      </div>

                      {/* Dispositivos en el mapa */}
                      {devices.map((device) => (
                        <TooltipProvider key={device.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className={`absolute w-4 h-4 rounded-full ${device.statusColor} transform -translate-x-1/2 -translate-y-1/2 hover:ring-2 hover:ring-white hover:z-10 transition-all`}
                                style={{
                                  left: `${((device.lng + 71) / 1) * 100}%`,
                                  top: `${((device.lat + 34) / 1) * 100}%`,
                                }}
                                onClick={() => handleDeviceClick(device)}
                              ></button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <p className="font-bold">{device.id}</p>
                                <p>IRI: {device.iriValue}</p>
                                <p>{device.speed} km/h</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}

                      {/* Controles del mapa */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button size="icon" variant="secondary" onClick={handleZoomIn}>
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" onClick={handleZoomOut}>
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button size="icon" variant="secondary">
                              <Layers className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48" align="end">
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Capas del mapa</h4>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="layer-iri" defaultChecked />
                                <label htmlFor="layer-iri" className="text-xs">
                                  IRI
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="layer-devices" defaultChecked />
                                <label htmlFor="layer-devices" className="text-xs">
                                  Dispositivos
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="layer-alerts" defaultChecked />
                                <label htmlFor="layer-alerts" className="text-xs">
                                  Alertas
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="layer-traffic" />
                                <label htmlFor="layer-traffic" className="text-xs">
                                  Tráfico
                                </label>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Button size="icon" variant="secondary">
                          <LocateFixed className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Escala de zoom */}
                      <div className="absolute bottom-4 left-4 w-32">
                        <Slider
                          value={[zoom]}
                          min={10}
                          max={100}
                          step={10}
                          onValueChange={(value) => setZoom(value[0])}
                        />
                      </div>

                      {/* Información de copyright */}
                      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                        © CapturaVial 2025 | Datos en tiempo real
                      </div>
                    </div>

                    {/* Panel de detalle del dispositivo */}
                    {selectedDevice && (
                      <div className="absolute top-4 left-4 w-80 bg-background border rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${selectedDevice.statusColor}`}></div>
                              {selectedDevice.id}
                            </h3>
                            <Button size="sm" variant="ghost" onClick={handleCloseDetail}>
                              ×
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-muted rounded p-2">
                                <span className="text-xs text-muted-foreground block">IRI</span>
                                <span className="text-lg font-bold">{selectedDevice.iriValue}</span>
                              </div>
                              <div className="bg-muted rounded p-2">
                                <span className="text-xs text-muted-foreground block">Velocidad</span>
                                <span className="text-lg font-bold">{selectedDevice.speed} km/h</span>
                              </div>
                              <div className="bg-muted rounded p-2">
                                <span className="text-xs text-muted-foreground block">Estado</span>
                                <span className="text-sm font-medium capitalize">{selectedDevice.status}</span>
                              </div>
                              <div className="bg-muted rounded p-2">
                                <span className="text-xs text-muted-foreground block">Batería</span>
                                <span className="text-sm font-medium">{selectedDevice.batteryLevel}%</span>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-medium mb-1">Ubicación</h4>
                              <div className="bg-muted rounded p-2 text-xs">
                                <div>Lat: {selectedDevice.lat.toFixed(6)}</div>
                                <div>Lng: {selectedDevice.lng.toFixed(6)}</div>
                              </div>
                            </div>

                            {selectedDevice.alerts > 0 && (
                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3 text-red-500" />
                                  Alertas
                                </h4>
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2 text-xs space-y-1">
                                  {Array.from({ length: selectedDevice.alerts }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-1">
                                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                      <span>
                                        {i === 0
                                          ? "IRI por encima del umbral crítico"
                                          : i === 1
                                            ? "Bache detectado"
                                            : "Deterioro acelerado"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="pt-2 flex justify-between">
                              <Button size="sm" variant="outline">
                                Ver historial
                              </Button>
                              <Button size="sm">Ver Street View</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © 2025 CapturaVial. Todos los datos son simulados con fines demostrativos.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Términos de uso
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacidad
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
