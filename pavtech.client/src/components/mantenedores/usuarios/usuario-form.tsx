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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Esquema de validación para el formulario
const usuarioFormSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Debe ser un email válido"),
  rut: z.string().min(1, "El RUT es requerido"),
  telefono: z.string().optional(),
  cargo: z.string().min(1, "El cargo es requerido"),
  rolId: z.string().min(1, "El rol es requerido"),
  empresaId: z.string().min(1, "La empresa es requerida"),
  estado: z.string().min(1, "El estado es requerido"),
  avatar: z.string().optional(),
})

type UsuarioFormValues = z.infer<typeof usuarioFormSchema>

// Datos iniciales para el formulario
const defaultValues: Partial<UsuarioFormValues> = {
  nombre: "",
  apellido: "",
  email: "",
  rut: "",
  telefono: "",
  cargo: "",
  rolId: "",
  empresaId: "",
  estado: "Activo",
  avatar: "/generic-avatar-icon.png",
}

// Datos de ejemplo para los selectores
const roles = [
  { id: "1", nombre: "Administrador" },
  { id: "2", nombre: "Supervisor" },
  { id: "3", nombre: "Técnico" },
  { id: "4", nombre: "Analista" },
  { id: "5", nombre: "Visualizador" },
]

const empresas = [
  { id: "1", nombre: "Constructora Vial S.A." },
  { id: "2", nombre: "Ingeniería de Caminos Ltda." },
  { id: "3", nombre: "Auscultación Vial SpA" },
  { id: "4", nombre: "Mantención de Carreteras S.A." },
  { id: "5", nombre: "Tecnología Vial SpA" },
]

interface UsuarioFormProps {
  initialData?: UsuarioFormValues
}

export function UsuarioForm({ initialData }: UsuarioFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(initialData?.avatar || defaultValues.avatar)

  // Inicializar el formulario con los valores por defecto o los datos iniciales
  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(usuarioFormSchema),
    defaultValues: initialData || defaultValues,
  })

  // Función para manejar el envío del formulario
  function onSubmit(data: UsuarioFormValues) {
    setIsSubmitting(true)

    // Simulamos una petición a la API
    setTimeout(() => {
      console.log(data)
      toast({
        title: initialData ? "Usuario actualizado" : "Usuario creado",
        description: initialData
          ? `Se ha actualizado el usuario ${data.nombre} ${data.apellido} correctamente.`
          : `Se ha creado el usuario ${data.nombre} ${data.apellido} correctamente.`,
      })
      setIsSubmitting(false)
      if (!initialData) {
        form.reset(defaultValues)
        setAvatarPreview(defaultValues.avatar)
      }
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarPreview || ""} alt="Avatar" />
            <AvatarFallback>
              {form.watch("nombre")?.charAt(0) || ""}
              {form.watch("apellido")?.charAt(0) || ""}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col space-y-2">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <CustomSelect
                      onValueChange={(value) => {
                        field.onChange(value)
                        setAvatarPreview(value)
                      }}
                      defaultValue={field.value}
                    >
                      <CustomSelectTrigger>
                        <CustomSelectValue placeholder="Seleccionar avatar" />
                      </CustomSelectTrigger>
                      <CustomSelectContent>
                        <CustomSelectItem value="/generic-avatar-icon.png">Avatar Genérico</CustomSelectItem>
                        <CustomSelectItem value="/masculine-avatar.png">Avatar Masculino</CustomSelectItem>
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
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="juan.perez@empresa.cl" type="email" {...field} />
                </FormControl>
                <FormDescription>Este será el nombre de usuario para iniciar sesión</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RUT</FormLabel>
                <FormControl>
                  <Input placeholder="12.345.678-9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="+56 9 1234 5678" {...field} />
                </FormControl>
                <FormDescription>Número de contacto (opcional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cargo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input placeholder="Ingeniero de Proyectos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="rolId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <CustomSelect onValueChange={field.onChange} defaultValue={field.value}>
                    <CustomSelectTrigger>
                      <CustomSelectValue placeholder="Seleccionar rol" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      {roles.map((rol) => (
                        <CustomSelectItem key={rol.id} value={rol.id}>
                          {rol.nombre}
                        </CustomSelectItem>
                      ))}
                    </CustomSelectContent>
                  </CustomSelect>
                </FormControl>
                <FormDescription>Determina los permisos del usuario</FormDescription>
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
                <FormControl>
                  <CustomSelect onValueChange={field.onChange} defaultValue={field.value}>
                    <CustomSelectTrigger>
                      <CustomSelectValue placeholder="Seleccionar empresa" />
                    </CustomSelectTrigger>
                    <CustomSelectContent>
                      {empresas.map((empresa) => (
                        <CustomSelectItem key={empresa.id} value={empresa.id}>
                          {empresa.nombre}
                        </CustomSelectItem>
                      ))}
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
