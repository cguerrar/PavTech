"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Eye, FileSpreadsheet, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CustomSelect,
  CustomSelectContent,
  CustomSelectItem,
  CustomSelectTrigger,
  CustomSelectValue,
} from "@/components/ui/custom-select"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function CargarAuscultacionPage() {
  const [step, setStep] = useState<"upload" | "preview" | "processing" | "complete">("upload")
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<string>("")
  const [previewData, setPreviewData] = useState<any[]>([])
  const [previewColumns, setPreviewColumns] = useState<string[]>([])
  const [progress, setProgress] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<string>("datos")

  // Función simulada para manejar la carga de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setFileSize(formatFileSize(file.size))

    // Simulamos la lectura del archivo y generamos datos de muestra
    setTimeout(() => {
      // Datos de muestra para IRI
      const sampleColumns = ["Kilometraje", "Carril", "Valor IRI", "Latitud", "Longitud"]
      const sampleData = [
        { Kilometraje: "10.100", Carril: "Derecho", "Valor IRI": "2.34", Latitud: "-33.4513", Longitud: "-70.6653" },
        { Kilometraje: "10.200", Carril: "Derecho", "Valor IRI": "2.56", Latitud: "-33.4523", Longitud: "-70.6663" },
        { Kilometraje: "10.300", Carril: "Derecho", "Valor IRI": "2.12", Latitud: "-33.4533", Longitud: "-70.6673" },
        { Kilometraje: "10.400", Carril: "Derecho", "Valor IRI": "1.98", Latitud: "-33.4543", Longitud: "-70.6683" },
        { Kilometraje: "10.500", Carril: "Derecho", "Valor IRI": "2.45", Latitud: "-33.4553", Longitud: "-70.6693" },
        { Kilometraje: "10.600", Carril: "Derecho", "Valor IRI": "2.67", Latitud: "-33.4563", Longitud: "-70.6703" },
        { Kilometraje: "10.700", Carril: "Derecho", "Valor IRI": "2.89", Latitud: "-33.4573", Longitud: "-70.6713" },
        { Kilometraje: "10.800", Carril: "Derecho", "Valor IRI": "3.12", Latitud: "-33.4583", Longitud: "-70.6723" },
      ]

      setPreviewColumns(sampleColumns)
      setPreviewData(sampleData)
      setStep("preview")
    }, 500)
  }

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Función simulada para procesar la carga
  const handleUpload = () => {
    setStep("processing")

    // Simulamos el progreso de carga
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setStep("complete")
        }, 500)
      }
    }, 200)
  }

  // Función para reiniciar el proceso
  const handleReset = () => {
    setStep("upload")
    setFileName("")
    setFileSize("")
    setPreviewData([])
    setPreviewColumns([])
    setProgress(0)
    setActiveTab("datos")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Cargar Auscultación" text="Carga datos de auscultación desde archivos CSV o Excel">
        {step === "upload" && (
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Upload className="h-3.5 w-3.5" />
            <span>Seleccionar Archivo</span>
          </Button>
        )}
        {step === "preview" && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 text-xs">
              <FileSpreadsheet className="h-3 w-3" />
              {fileName} ({fileSize})
            </Badge>
            <Button variant="outline" size="sm" className="h-8" onClick={handleReset}>
              <X className="h-3.5 w-3.5 mr-1" />
              <span>Cambiar</span>
            </Button>
          </div>
        )}
      </DashboardHeader>

      {step === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Carga</CardTitle>
            <CardDescription>
              Selecciona el proyecto, camino y tipo de auscultación para cargar los datos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="proyecto">Proyecto</Label>
                  <CustomSelect>
                    <CustomSelectTrigger id="proyecto">
                      <CustomSelectValue placeholder="Seleccionar proyecto" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      <CustomSelectItem value="proyecto1">Ruta 5 Norte</CustomSelectItem>
                      <CustomSelectItem value="proyecto2">Autopista Central</CustomSelectItem>
                      <CustomSelectItem value="proyecto3">Ruta 68</CustomSelectItem>
                      <CustomSelectItem value="proyecto4">Costanera Norte</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="camino">Camino</Label>
                  <CustomSelect>
                    <CustomSelectTrigger id="camino">
                      <CustomSelectValue placeholder="Seleccionar camino" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      <CustomSelectItem value="camino1">Tramo 1: Santiago - Los Vilos</CustomSelectItem>
                      <CustomSelectItem value="camino2">Tramo 2: Los Vilos - La Serena</CustomSelectItem>
                      <CustomSelectItem value="camino3">Tramo 3: La Serena - Caldera</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo-auscultacion">Tipo de Auscultación</Label>
                <CustomSelect>
                  <CustomSelectTrigger id="tipo-auscultacion">
                    <CustomSelectValue placeholder="Seleccionar tipo de auscultación" />
                  </CustomSelectTrigger>
                  <CustomSelectContent>
                    <CustomSelectItem value="iri">IRI (Índice de Rugosidad Internacional)</CustomSelectItem>
                    <CustomSelectItem value="crt">CRT (Coeficiente de Rozamiento Transversal)</CustomSelectItem>
                    <CustomSelectItem value="deflexiones">Deflexiones</CustomSelectItem>
                    <CustomSelectItem value="textura">Textura</CustomSelectItem>
                    <CustomSelectItem value="ahuellamientos">Ahuellamientos</CustomSelectItem>
                  </CustomSelectContent>
                </CustomSelect>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Auscultación</Label>
                <Input type="date" id="fecha" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="archivo">Archivo de Datos (CSV o Excel)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    id="archivo"
                    accept=".csv,.xlsx,.xls"
                    className="file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-primary/90"
                    onChange={handleFileChange}
                  />
                  <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Formatos aceptados: CSV, Excel (.xlsx, .xls)</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Eye className="mr-2 h-4 w-4" />
              Vista Previa
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "preview" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa de Datos</CardTitle>
              <CardDescription>
                Verifica que los datos se interpreten correctamente antes de confirmar la carga
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="datos">Datos</TabsTrigger>
                  <TabsTrigger value="resumen">Resumen</TabsTrigger>
                </TabsList>
                <TabsContent value="datos" className="mt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {previewColumns.map((column, index) => (
                            <TableHead key={index}>{column}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {previewColumns.map((column, colIndex) => (
                              <TableCell key={colIndex}>{row[column]}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Mostrando {previewData.length} de {previewData.length + 245} filas
                  </div>
                </TabsContent>
                <TabsContent value="resumen" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Total de Registros</div>
                      <div className="mt-1 text-2xl font-bold">253</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Rango de Kilometraje</div>
                      <div className="mt-1 text-2xl font-bold">10.1 - 35.4</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Valor IRI Promedio</div>
                      <div className="mt-1 text-2xl font-bold">2.45</div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-2">Distribución de Valores IRI</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Excelente (0-1.5)</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Bueno (1.5-2.5)</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Regular (2.5-3.5)</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Malo (3.5-4.5)</span>
                          <span>8%</span>
                        </div>
                        <Progress value={8} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Muy Malo ({">"}4.5)</span>
                          <span>2%</span>
                        </div>
                        <Progress value={2} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleReset}>
                Volver
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Confirmar Carga
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Validación de Datos</CardTitle>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <Alert className="bg-green-50 border-green-200">
                <AlertTitle className="text-green-800 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Validación exitosa
                </AlertTitle>
                <AlertDescription className="text-green-700 text-sm">
                  El archivo cumple con el formato esperado para datos de IRI. No se detectaron problemas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </>
      )}

      {step === "processing" && (
        <Card>
          <CardHeader>
            <CardTitle>Procesando Archivo</CardTitle>
            <CardDescription>Cargando y procesando los datos de auscultación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Completado
                </Badge>
                <span>Validación de formato</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Completado
                </Badge>
                <span>Verificación de datos</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  En progreso
                </Badge>
                <span>Carga de datos</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                  Pendiente
                </Badge>
                <span>Procesamiento final</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "complete" && (
        <Card>
          <CardHeader>
            <CardTitle>Carga Completada</CardTitle>
            <CardDescription>Los datos de auscultación se han cargado correctamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle className="text-green-800 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Carga exitosa
              </AlertTitle>
              <AlertDescription className="text-green-700 text-sm">
                Se han cargado 253 registros de IRI para el tramo Santiago - Los Vilos.
              </AlertDescription>
            </Alert>

            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Resumen de la Carga</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <div className="text-xs text-muted-foreground">Proyecto</div>
                  <div className="font-medium">Ruta 5 Norte</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Camino</div>
                  <div className="font-medium">Tramo 1: Santiago - Los Vilos</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Tipo</div>
                  <div className="font-medium">IRI</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Fecha</div>
                  <div className="font-medium">15/05/2023</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              Nueva Carga
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Ver Resultados</Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Ir al Dashboard</Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {step === "upload" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Instrucciones</CardTitle>
            <CardDescription>Información sobre el formato esperado de los archivos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Formato de Archivo</h3>
                <p className="text-sm text-muted-foreground">
                  El archivo debe contener las siguientes columnas según el tipo de auscultación:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
                  <li>
                    <strong>IRI:</strong> Kilometraje, Carril, Valor IRI, Coordenadas (opcional)
                  </li>
                  <li>
                    <strong>CRT:</strong> Kilometraje, Carril, Valor CRT, Coordenadas (opcional)
                  </li>
                  <li>
                    <strong>Deflexiones:</strong> Kilometraje, Carril, D0, D20, D30, D60, D90, Temperatura, Coordenadas
                    (opcional)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium">Recomendaciones</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
                  <li>Asegúrese de que el archivo no tenga encabezados o filas adicionales</li>
                  <li>Verifique que los valores numéricos usen punto (.) como separador decimal</li>
                  <li>El tamaño máximo de archivo permitido es de 10MB</li>
                  <li>Para archivos más grandes, divídalos en múltiples cargas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardShell>
  )
}
