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
const empresaFormSchema = z.object({
  rut: z.string().min(1, "El RUT es requerido"),
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  email: z.string().email("Debe ser un email válido"),
  sitioWeb: z.string().optional(),
  tipoEmpresa: z.string().min(1, "El tipo de empresa es requerido"),
  estado: z.string().min(1, "El estado es requerido"),
})

type EmpresaFormValues = z.infer<typeof empresaFormSchema>

// Datos iniciales para el formulario
const defaultValues: Partial<EmpresaFormValues> = {
  rut: "",
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  sitioWeb: "",
  tipoEmpresa: "",
  estado: "Activo",
}

interface EmpresaFormProps {
  initialData?: EmpresaFormValues
}

export function EmpresaForm({ initialData }: EmpresaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicializar el formulario con los valores por defecto o los datos iniciales
  const form = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaFormSchema),
    defaultValues: initialData || defaultValues,
  })

  // Función para manejar el envío del formulario
  function onSubmit(data: EmpresaFormValues) {
    setIsSubmitting(true)

    // Simulamos una petición a la API
    setTimeout(() => {
      console.log(data)
      toast({
        title: initialData ? "Empresa actualizada" : "Empresa creada",
        description: initialData
          ? `Se ha actualizado la empresa ${data.nombre} correctamente.`
          : `Se ha creado la empresa ${data.nombre} correctamente.`,
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
            name="rut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RUT</FormLabel>
                <FormControl>
                  <Input placeholder="76.123.456-7" {...field} />
                </FormControl>
                <FormDescription>RUT de la empresa</FormDescription>
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
                  <Input placeholder="Constructora Vial S.A." {...field} />
                </FormControl>
                <FormDescription>Nombre legal de la empresa</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Av. Apoquindo 4501, Las Condes, Santiago" {...field} />
              </FormControl>
              <FormDescription>Dirección completa de la empresa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="+56 2 2345 6789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="contacto@empresa.cl" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="sitioWeb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sitio Web</FormLabel>
              <FormControl>
                <Input placeholder="www.empresa.cl" {...field} />
              </FormControl>
              <FormDescription>URL del sitio web (opcional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="tipoEmpresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Empresa</FormLabel>
                <FormControl>
                  <CustomSelect onValueChange={field.onChange} defaultValue={field.value}>
                    <CustomSelectTrigger>
                      <CustomSelectValue placeholder="Seleccionar tipo" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      <CustomSelectItem value="Constructora">Constructora</CustomSelectItem>
                      <CustomSelectItem value="Consultora">Consultora</CustomSelectItem>
                      <CustomSelectItem value="Especialista">Especialista</CustomSelectItem>
                      <CustomSelectItem value="Mantenimiento">Mantenimiento</CustomSelectItem>
                      <CustomSelectItem value="Tecnología">Tecnología</CustomSelectItem>
                    </CustomSelectContent>
                  </CustomSelect>
                </FormControl>
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
