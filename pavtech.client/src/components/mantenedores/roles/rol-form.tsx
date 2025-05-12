"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CustomSelect,
  CustomSelectContent,
  CustomSelectItem,
  CustomSelectTrigger,
  CustomSelectValue,
} from "@/components/ui/custom-select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"

// Esquema de validación para el formulario
const rolFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  nivelAcceso: z.number().min(0).max(100),
  estado: z.string().min(1, "El estado es requerido"),
})

type RolFormValues = z.infer<typeof rolFormSchema>

// Datos iniciales para el formulario
const defaultValues: Partial<RolFormValues> = {
  nombre: "",
  descripcion: "",
  nivelAcceso: 50,
  estado: "Activo",
}

interface RolFormProps {
  initialData?: RolFormValues
}

export function RolForm({ initialData }: RolFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicializar el formulario con los valores por defecto o los datos iniciales
  const form = useForm<RolFormValues>({
    resolver: zodResolver(rolFormSchema),
    defaultValues: initialData || defaultValues,
  })

  // Función para manejar el envío del formulario
  function onSubmit(data: RolFormValues) {
    setIsSubmitting(true)

    // Simulamos una petición a la API
    setTimeout(() => {
      console.log(data)
      toast({
        title: initialData ? "Rol actualizado" : "Rol creado",
        description: initialData
          ? `Se ha actualizado el rol ${data.nombre} correctamente.`
          : `Se ha creado el rol ${data.nombre} correctamente.`,
      })
      setIsSubmitting(false)
      if (!initialData) {
        form.reset(defaultValues)
      }
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Administrador" {...field} />
                </FormControl>
                <FormDescription>Nombre identificador del rol</FormDescription>
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
                      <CustomSelectItem value="Inactivo">Inactivo</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Acceso completo a todas las funcionalidades del sistema"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Descripción detallada del rol y sus permisos</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nivelAcceso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel de Acceso</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Slider
                    defaultValue={[field.value]}
                    min={0}
                    max={100}
                    step={10}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mínimo (0)</span>
                    <span className="font-medium text-primary">{field.value}</span>
                    <span>Máximo (100)</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription>Define el nivel jerárquico de acceso (0: mínimo, 100: máximo)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
