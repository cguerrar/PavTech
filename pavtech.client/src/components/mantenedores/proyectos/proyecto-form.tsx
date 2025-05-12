"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/components/ui/use-toast"

// Esquema de validación para el formulario
const formSchema = z.object({
  codigo: z.string().min(1, "El código es obligatorio"),
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  fechaInicio: z.date({
    required_error: "La fecha de inicio es obligatoria",
  }),
  fechaFin: z.date({
    required_error: "La fecha de fin es obligatoria",
  }),
  empresaId: z.string().min(1, "La empresa es obligatoria"),
  caminoId: z.string().min(1, "El camino es obligatorio"),
  tipoAuscultacionId: z.string().min(1, "El tipo de auscultación es obligatorio"),
  presupuesto: z.coerce.number().positive("El presupuesto debe ser un número positivo"),
  kmTotales: z.coerce.number().positive("Los kilómetros totales deben ser un número positivo"),
  estado: z.string().min(1, "El estado es obligatorio"),
  prioridad: z.string().min(1, "La prioridad es obligatoria"),
})

// Datos de ejemplo para los selects
const empresas = [
  { id: "1", nombre: "Constructora Vial S.A." },
  { id: "2", nombre: "Ingeniería de Caminos Ltda." },
  { id: "3", nombre: "Auscultación Vial SpA" },
  { id: "4", nombre: "Mantención de Carreteras S.A." },
  { id: "5", nombre: "Tecnología Vial SpA" },
]

const caminos = [
  { id: "1", nombre: "Ruta 5 Sur" },
  { id: "2", nombre: "Ruta 68" },
  { id: "3", nombre: "Autopista del Sol" },
  { id: "4", nombre: "Autopista Los Libertadores" },
  { id: "5", nombre: "Ruta 160" },
]

const tiposAuscultacion = [
  { id: "1", nombre: "Estructural" },
  { id: "2", nombre: "Superficial" },
  { id: "3", nombre: "Integral" },
]

const estados = ["Planificado", "En Progreso", "Completado", "Cancelado"]
const prioridades = ["Alta", "Media", "Baja"]

interface ProyectoFormProps {
  initialData?: any
}

export function ProyectoForm({ initialData }: ProyectoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valores por defecto para un nuevo proyecto
  const defaultValues = {
    codigo: "",
    nombre: "",
    descripcion: "",
    fechaInicio: new Date(),
    fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    empresaId: "",
    caminoId: "",
    tipoAuscultacionId: "",
    presupuesto: 0,
    kmTotales: 0,
    estado: "Planificado",
    prioridad: "Media",
  }

  // Inicializar el formulario con datos iniciales si existen
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          fechaInicio: new Date(initialData.fechaInicio),
          fechaFin: new Date(initialData.fechaFin),
          presupuesto: Number(initialData.presupuesto),
          kmTotales: Number(initialData.kmTotales),
        }
      : defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      console.log(values)
      // Aquí iría la lógica para enviar los datos al servidor
      // Simulamos una petición con un timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: initialData ? "Proyecto actualizado" : "Proyecto creado",
        description: initialData
          ? `Se ha actualizado el proyecto ${values.nombre} correctamente.`
          : `Se ha creado el proyecto ${values.nombre} correctamente.`,
      })

      // Redirigir a la lista de proyectos
      router.push("/dashboard/mantenedores/proyectos")
      router.refresh()
    } catch (error) {
      console.error("Error al guardar el proyecto:", error)
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar el proyecto.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input placeholder="PRY-2023-001" {...field} />
                </FormControl>
                <FormDescription>Código único del proyecto</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del proyecto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción detallada del proyecto" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="empresaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {empresas.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id}>
                        {empresa.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caminoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camino</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar camino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {caminos.map((camino) => (
                      <SelectItem key={camino.id} value={camino.id}>
                        {camino.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoAuscultacionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Auscultación</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tiposAuscultacion.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prioridad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridad</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {prioridades.map((prioridad) => (
                      <SelectItem key={prioridad} value={prioridad}>
                        {prioridad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaInicio"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="presupuesto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presupuesto (CLP)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kmTotales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilómetros Totales</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={() => router.push("/dashboard/mantenedores/proyectos")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            {isSubmitting ? "Guardando..." : "Guardar Proyecto"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
