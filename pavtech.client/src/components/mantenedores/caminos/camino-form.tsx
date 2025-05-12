"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CustomSelect,
  CustomSelectContent,
  CustomSelectItem,
  CustomSelectTrigger,
  CustomSelectValue,
} from "@/components/ui/custom-select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

// Esquema de validación para el formulario
const caminoFormSchema = z.object({
  codigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  region: z.string().min(1, "La región es requerida"),
  provincia: z.string().min(1, "La provincia es requerida"),
  comuna: z.string().min(1, "La comuna es requerida"),
  longitud: z.coerce.number().positive("La longitud debe ser un número positivo"),
  estado: z.string().min(1, "El estado es requerido"),
})

type CaminoFormValues = z.infer<typeof caminoFormSchema>

// Datos iniciales para el formulario
const defaultValues: Partial<CaminoFormValues> = {
  codigo: "",
  nombre: "",
  region: "",
  provincia: "",
  comuna: "",
  longitud: 0,
  estado: "Activo",
}

interface CaminoFormProps {
  initialData?: CaminoFormValues
}

export function CaminoForm({ initialData }: CaminoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicializar el formulario con los valores por defecto o los datos iniciales
  const form = useForm<CaminoFormValues>({
    resolver: zodResolver(caminoFormSchema),
    defaultValues: initialData || defaultValues,
  })

  // Función para manejar el envío del formulario
  function onSubmit(data: CaminoFormValues) {
    setIsSubmitting(true)

    // Simulamos una petición a la API
    setTimeout(() => {
      console.log(data)
      toast({
        title: initialData ? "Camino actualizado" : "Camino creado",
        description: initialData
          ? `Se ha actualizado el camino ${data.nombre} correctamente.`
          : `Se ha creado el camino ${data.nombre} correctamente.`,
      })
      setIsSubmitting(false)
      form.reset(initialData ? data : defaultValues)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input placeholder="R-5" {...field} />
                </FormControl>
                <FormDescription>Código identificador del camino</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ruta 5 Sur" {...field} />
                </FormControl>
                <FormDescription>Nombre descriptivo del camino</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Región</FormLabel>
                <FormControl>
                  <CustomSelect onValueChange={field.onChange} defaultValue={field.value}>
                    <CustomSelectTrigger>
                      <CustomSelectValue placeholder="Seleccionar región" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      <CustomSelectItem value="Metropolitana">Metropolitana</CustomSelectItem>
                      <CustomSelectItem value="Valparaíso">Valparaíso</CustomSelectItem>
                      <CustomSelectItem value="Biobío">Biobío</CustomSelectItem>
                      <CustomSelectItem value="Maule">Maule</CustomSelectItem>
                      <CustomSelectItem value="Coquimbo">Coquimbo</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="provincia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia</FormLabel>
                <FormControl>
                  <CustomSelect onValueChange={field.onChange} defaultValue={field.value}>
                    <CustomSelectTrigger>
                      <CustomSelectValue placeholder="Seleccionar provincia" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      <CustomSelectItem value="Santiago">Santiago</CustomSelectItem>
                      <CustomSelectItem value="Valparaíso">Valparaíso</CustomSelectItem>
                      <CustomSelectItem value="Concepción">Concepción</CustomSelectItem>
                      <CustomSelectItem value="Melipilla">Melipilla</CustomSelectItem>
                      <CustomSelectItem value="Chacabuco">Chacabuco</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comuna"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comuna</FormLabel>
                <FormControl>
                  <CustomSelect onValueChange={field.onChange} defaultValue={field.value}>
                    <CustomSelectTrigger>
                      <CustomSelectValue placeholder="Seleccionar comuna" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      <CustomSelectItem value="Santiago">Santiago</CustomSelectItem>
                      <CustomSelectItem value="Casablanca">Casablanca</CustomSelectItem>
                      <CustomSelectItem value="Coronel">Coronel</CustomSelectItem>
                      <CustomSelectItem value="Melipilla">Melipilla</CustomSelectItem>
                      <CustomSelectItem value="Colina">Colina</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="longitud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitud (km)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormDescription>Longitud del camino en kilómetros</FormDescription>
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
                <FormControl>
                  <CustomSelect onValueChange={field.onChange} defaultValue={field.value}>
                    <CustomSelectTrigger>
                      <CustomSelectValue placeholder="Seleccionar estado" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      <CustomSelectItem value="Activo">Activo</CustomSelectItem>
                      <CustomSelectItem value="En mantención">En mantención</CustomSelectItem>
                      <CustomSelectItem value="Inactivo">Inactivo</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
