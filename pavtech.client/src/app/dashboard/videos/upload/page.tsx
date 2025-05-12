"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, Calendar, Check, FileVideo, Info, Loader2, MapPin, UploadCloud, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  CustomSelect,
  CustomSelectContent,
  CustomSelectGroup,
  CustomSelectItem,
  CustomSelectLabel,
  CustomSelectTrigger,
  CustomSelectValue,
} from "@/components/ui/custom-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Slider } from "@/components/ui/slider"

// Datos de ejemplo para proyectos y caminos
const proyectosEjemplo = [
  { id: 1, nombre: "Auscultación Ruta 68 Tramo Santiago-Valparaíso" },
  { id: 2, nombre: "Medición IRI Autopista Central" },
  { id: 3, nombre: "Defectometría Ruta 5 Sur Tramo Chillán-Concepción" },
  { id: 4, nombre: "Análisis de Fricción Ruta 78" },
  { id: 5, nombre: "Deflectometría Ruta 5 Norte Tramo La Serena-Vallenar" },
]

const caminosEjemplo = {
  1: [
    { id: 101, nombre: "Ruta 68 Km 25-30", codigo: "R68-25-30" },
    { id: 102, nombre: "Ruta 68 Km 30-35", codigo: "R68-30-35" },
    { id: 103, nombre: "Ruta 68 Km 35-40", codigo: "R68-35-40" },
  ],
  2: [
    { id: 201, nombre: "Autopista Central Tramo Norte", codigo: "AC-N" },
    { id: 202, nombre: "Autopista Central Tramo Centro", codigo: "AC-C" },
    { id: 203, nombre: "Autopista Central Tramo Sur", codigo: "AC-S" },
  ],
  3: [
    { id: 301, nombre: "Ruta 5 Sur Km 120-135", codigo: "R5S-120-135" },
    { id: 302, nombre: "Ruta 5 Sur Km 135-150", codigo: "R5S-135-150" },
  ],
  4: [
    { id: 401, nombre: "Ruta 78 Sector Melipilla", codigo: "R78-MEL" },
    { id: 402, nombre: "Ruta 78 Sector Talagante", codigo: "R78-TAL" },
  ],
  5: [
    { id: 501, nombre: "Ruta 5 Norte Km 450-470", codigo: "R5N-450-470" },
    { id: 502, nombre: "Ruta 5 Norte Km 470-490", codigo: "R5N-470-490" },
  ],
}

export default function VideoUploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedProyecto, setSelectedProyecto] = useState<string>("")
  const [selectedCamino, setSelectedCamino] = useState<string>("")
  const [caminosDisponibles, setCaminosDisponibles] = useState<any[]>([])
  const [fechaGrabacion, setFechaGrabacion] = useState<Date | undefined>(undefined)
  const [fechaCalendarOpen, setFechaCalendarOpen] = useState(false)
  const [observaciones, setObservaciones] = useState("")

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Estado para el odómetro
  const [kilometraje, setKilometraje] = useState<number[]>([0])
  const [tramo, setTramo] = useState<{ inicio: number; fin: number }>({ inicio: 0, fin: 10 })

  // Manejar cambio de proyecto seleccionado
  const handleProyectoChange = (value: string) => {
    setSelectedProyecto(value)
    setSelectedCamino("")

    // Cargar caminos asociados al proyecto seleccionado
    const proyectoId = Number.parseInt(value)
    setCaminosDisponibles(caminosEjemplo[proyectoId as keyof typeof caminosEjemplo] || [])
  }

  // Manejar cambio de camino seleccionado
  const handleCaminoChange = (value: string) => {
    setSelectedCamino(value)

    // Actualizar el tramo basado en el camino seleccionado
    const camino = caminosDisponibles.find((c) => c.id.toString() === value)
    if (camino) {
      // Extraer los kilómetros del nombre del camino (ejemplo: "Ruta 68 Km 25-30")
      const match = camino.nombre.match(/Km\s+(\d+)-(\d+)/)
      if (match && match.length >= 3) {
        const inicio = Number.parseInt(match[1])
        const fin = Number.parseInt(match[2])
        setTramo({ inicio, fin })
        setKilometraje([inicio])
      }
    }
  }

  // Manejar selección de archivo
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar que sea un archivo de video
    if (!file.type.startsWith("video/")) {
      setErrorMessage("El archivo seleccionado no es un video válido.")
      setUploadStatus("error")
      return
    }

    // Validar tamaño (máximo 2GB)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      setErrorMessage("El archivo es demasiado grande. El tamaño máximo permitido es 2GB.")
      setUploadStatus("error")
      return
    }

    setSelectedFile(file)
    setUploadStatus("idle")
    setErrorMessage("")

    // Crear URL para previsualización
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  // Manejar clic en el área de drop para abrir el selector de archivos
  const handleDropAreaClick = () => {
    fileInputRef.current?.click()
  }

  // Manejar arrastrar y soltar archivos
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]

      // Validar que sea un archivo de video
      if (!file.type.startsWith("video/")) {
        setErrorMessage("El archivo seleccionado no es un video válido.")
        setUploadStatus("error")
        return
      }

      setSelectedFile(file)
      setUploadStatus("idle")
      setErrorMessage("")

      // Crear URL para previsualización
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // Prevenir comportamiento por defecto de arrastrar y soltar
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // Simular subida de archivo
  const handleUpload = () => {
    // Validar que se hayan completado todos los campos requeridos
    if (!selectedProyecto) {
      setErrorMessage("Debe seleccionar un proyecto.")
      setUploadStatus("error")
      return
    }

    if (!selectedCamino) {
      setErrorMessage("Debe seleccionar un camino.")
      setUploadStatus("error")
      return
    }

    if (!selectedFile) {
      setErrorMessage("Debe seleccionar un archivo de video.")
      setUploadStatus("error")
      return
    }

    // Iniciar proceso de subida
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulación de progreso de subida
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("success")
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  // Cancelar subida
  const handleCancel = () => {
    if (uploadStatus === "uploading") {
      setUploadStatus("idle")
      setUploadProgress(0)
    }
  }

  // Limpiar selección de archivo
  const handleClearFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Formatear el valor del kilómetro para mostrar
  const formatKilometro = (km: number) => {
    return `${km.toFixed(1)} km`
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Subir Video" text="Sube un nuevo video para procesamiento y análisis">
        <Button variant="outline" onClick={() => router.back()} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </DashboardHeader>

      <div className="grid gap-6">
        {/* Información del proyecto y camino */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Proyecto</CardTitle>
            <CardDescription>Selecciona el proyecto y camino al que pertenece este video</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="proyecto">
                  Proyecto <span className="text-red-500">*</span>
                </Label>
                <CustomSelect value={selectedProyecto} onValueChange={handleProyectoChange}>
                  <CustomSelectTrigger id="proyecto">
                    <CustomSelectValue placeholder="Seleccionar proyecto" />
                  </CustomSelectTrigger>
                  <CustomSelectContent>
                    <CustomSelectGroup>
                      <CustomSelectLabel>Proyectos</CustomSelectLabel>
                      {proyectosEjemplo.map((proyecto) => (
                        <CustomSelectItem key={proyecto.id} value={proyecto.id.toString()}>
                          {proyecto.nombre}
                        </CustomSelectItem>
                      ))}
                    </CustomSelectGroup>
                  </CustomSelectContent>
                </CustomSelect>
              </div>

              <div className="space-y-2">
                <Label htmlFor="camino">
                  Camino <span className="text-red-500">*</span>
                </Label>
                <CustomSelect value={selectedCamino} onValueChange={handleCaminoChange} disabled={!selectedProyecto}>
                  <CustomSelectTrigger id="camino">
                    <CustomSelectValue
                      placeholder={selectedProyecto ? "Seleccionar camino" : "Primero seleccione un proyecto"}
                    />
                  </CustomSelectTrigger>
                  <CustomSelectContent>
                    <CustomSelectGroup>
                      <CustomSelectLabel>Caminos</CustomSelectLabel>
                      {caminosDisponibles.map((camino) => (
                        <CustomSelectItem key={camino.id} value={camino.id.toString()}>
                          {camino.nombre} ({camino.codigo})
                        </CustomSelectItem>
                      ))}
                    </CustomSelectGroup>
                  </CustomSelectContent>
                </CustomSelect>
              </div>
            </div>

            {selectedCamino && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="kilometraje">Kilómetro inicial del video</Label>
                    <span className="text-sm font-medium">{formatKilometro(kilometraje[0])}</span>
                  </div>
                  <div className="px-1">
                    <Slider
                      id="kilometraje"
                      value={kilometraje}
                      min={tramo.inicio}
                      max={tramo.fin}
                      step={0.1}
                      onValueChange={setKilometraje}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatKilometro(tramo.inicio)}</span>
                      <span>{formatKilometro(tramo.fin)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Selecciona el kilómetro inicial donde comienza la grabación del video
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de grabación</Label>
                <Popover open={fechaCalendarOpen} onOpenChange={setFechaCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" id="fecha">
                      <Calendar className="mr-2 h-4 w-4" />
                      {fechaGrabacion ? (
                        format(fechaGrabacion, "dd/MM/yyyy", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border border-gray-200 shadow-md !bg-opacity-100 relative z-50"
                    style={{ backgroundColor: "white" }}
                    align="start"
                  >
                    <CalendarComponent
                      mode="single"
                      selected={fechaGrabacion}
                      onSelect={(date) => {
                        setFechaGrabacion(date)
                        setFechaCalendarOpen(false)
                      }}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <div className="flex">
                  <Input
                    id="ubicacion"
                    placeholder="Coordenadas o descripción de ubicación"
                    className="rounded-r-none"
                  />
                  <Button variant="outline" className="rounded-l-none border-l-0">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                placeholder="Ingrese cualquier información adicional relevante sobre el video"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Subida de archivo */}
        <Card>
          <CardHeader>
            <CardTitle>Archivo de Video</CardTitle>
            <CardDescription>Sube un archivo de video en formato MP4, MOV o AVI (máx. 2GB)</CardDescription>
          </CardHeader>
          <CardContent>
            {uploadStatus === "error" && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {uploadStatus === "success" && (
              <Alert className="mb-4 border-green-500 text-green-500">
                <Check className="h-4 w-4" />
                <AlertTitle>Video subido correctamente</AlertTitle>
                <AlertDescription>
                  El video ha sido subido y está siendo procesado. Puedes ver su estado en la sección de videos.
                </AlertDescription>
              </Alert>
            )}

            {!selectedFile ? (
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleDropAreaClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleFileSelect} />
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Arrastra y suelta tu archivo aquí</h3>
                  <p className="text-sm text-muted-foreground">
                    o <span className="text-primary font-medium">haz clic para seleccionar</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Formatos soportados: MP4, MOV, AVI - Tamaño máximo: 2GB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="relative h-20 w-32 bg-muted rounded overflow-hidden">
                    {previewUrl ? (
                      <video src={previewUrl} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <FileVideo className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{selectedFile.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFile}
                        disabled={uploadStatus === "uploading"}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <p className="text-xs text-muted-foreground">{selectedFile.type}</p>
                  </div>
                </div>

                {uploadStatus === "uploading" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Subiendo...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <p>
                Los videos serán procesados automáticamente para extraer frames y datos GPS. Este proceso puede tomar
                varios minutos dependiendo del tamaño del archivo.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()} disabled={uploadStatus === "uploading"}>
              Cancelar
            </Button>
            <div className="flex gap-2">
              {uploadStatus === "uploading" && (
                <Button variant="outline" onClick={handleCancel}>
                  Detener subida
                </Button>
              )}
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === "uploading" || uploadStatus === "success"}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {uploadStatus === "uploading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subiendo...
                  </>
                ) : uploadStatus === "success" ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Subido
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Subir Video
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
