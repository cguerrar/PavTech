"use client"

import { useState } from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Key, UserCog } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/mantenedores/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  CustomSelect,
  CustomSelectContent,
  CustomSelectItem,
  CustomSelectTrigger,
  CustomSelectValue,
} from "@/components/ui/custom-select"

// Tipo para los datos de usuario
type Usuario = {
  id: string
  nombre: string
  apellido: string
  email: string
  rut: string
  telefono: string
  cargo: string
  rolId: string
  rolNombre: string
  empresaId: string
  empresaNombre: string
  fechaCreacion: string
  ultimoAcceso: string
  estado: string
  avatar: string
}

// Datos de ejemplo
const data: Usuario[] = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@constructoravial.cl",
    rut: "12.345.678-9",
    telefono: "+56 9 1234 5678",
    cargo: "Ingeniero de Proyectos",
    rolId: "1",
    rolNombre: "Administrador",
    empresaId: "1",
    empresaNombre: "Constructora Vial S.A.",
    fechaCreacion: "2023-01-15",
    ultimoAcceso: "2023-05-20T14:30:00",
    estado: "Activo",
    avatar: "/masculine-avatar.png",
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@ingenieriacaminos.cl",
    rut: "9.876.543-2",
    telefono: "+56 9 8765 4321",
    cargo: "Directora de Operaciones",
    rolId: "2",
    rolNombre: "Supervisor",
    empresaId: "2",
    empresaNombre: "Ingeniería de Caminos Ltda.",
    fechaCreacion: "2023-02-10",
    ultimoAcceso: "2023-05-19T09:15:00",
    estado: "Activo",
    avatar: "/generic-avatar-icon.png",
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "carlos.rodriguez@auscultacionvial.cl",
    rut: "15.678.901-2",
    telefono: "+56 9 2345 6789",
    cargo: "Técnico de Auscultación",
    rolId: "3",
    rolNombre: "Técnico",
    empresaId: "3",
    empresaNombre: "Auscultación Vial SpA",
    fechaCreacion: "2023-03-05",
    ultimoAcceso: "2023-05-18T16:45:00",
    estado: "Activo",
    avatar: "/masculine-avatar.png",
  },
  {
    id: "4",
    nombre: "Ana",
    apellido: "Martínez",
    email: "ana.martinez@mantencioncarreteras.cl",
    rut: "18.765.432-1",
    telefono: "+56 9 3456 7890",
    cargo: "Gerente de Proyectos",
    rolId: "2",
    rolNombre: "Supervisor",
    empresaId: "4",
    empresaNombre: "Mantención de Carreteras S.A.",
    fechaCreacion: "2023-03-20",
    ultimoAcceso: "2023-05-17T11:30:00",
    estado: "Inactivo",
    avatar: "/generic-avatar-icon.png",
  },
  {
    id: "5",
    nombre: "Pedro",
    apellido: "Sánchez",
    email: "pedro.sanchez@tecnologiavial.cl",
    rut: "14.567.890-3",
    telefono: "+56 9 4567 8901",
    cargo: "Analista de Datos",
    rolId: "4",
    rolNombre: "Analista",
    empresaId: "5",
    empresaNombre: "Tecnología Vial SpA",
    fechaCreacion: "2023-04-05",
    ultimoAcceso: "2023-05-20T10:00:00",
    estado: "Activo",
    avatar: "/masculine-avatar.png",
  },
]

// Formulario para cambiar rol
const rolFormSchema = z.object({
  rolId: z.string().min(1, "El rol es requerido"),
})

export function UsuariosTable() {
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)

  const form = useForm<z.infer<typeof rolFormSchema>>({
    resolver: zodResolver(rolFormSchema),
    defaultValues: {
      rolId: selectedUsuario?.rolId || "",
    },
  })

  function onSubmit(data: z.infer<typeof rolFormSchema>) {
    toast({
      title: "Rol actualizado",
      description: `Se ha actualizado el rol del usuario ${selectedUsuario?.nombre} ${selectedUsuario?.apellido}.`,
    })
    setIsChangeRoleDialogOpen(false)
  }

  const columns: ColumnDef<Usuario>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={row.getValue("avatar") || "/placeholder.svg"}
            alt={`${row.original.nombre} ${row.original.apellido}`}
          />
          <AvatarFallback>{`${row.original.nombre.charAt(0)}${row.original.apellido.charAt(0)}`}</AvatarFallback>
        </Avatar>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("nombre")} {row.original.apellido}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "rolNombre",
      header: "Rol",
      cell: ({ row }) => <div>{row.getValue("rolNombre")}</div>,
    },
    {
      accessorKey: "empresaNombre",
      header: "Empresa",
      cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("empresaNombre")}</div>,
    },
    {
      accessorKey: "ultimoAcceso",
      header: "Último Acceso",
      cell: ({ row }) => {
        const date = new Date(row.getValue("ultimoAcceso"))
        return <div>{date.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string
        return <Badge variant={estado === "Activo" ? "default" : "secondary"}>{estado}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const usuario = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/mantenedores/usuarios/${usuario.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUsuario(usuario)
                  setIsResetPasswordDialogOpen(true)
                }}
              >
                <Key className="mr-2 h-4 w-4" />
                Restablecer contraseña
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUsuario(usuario)
                  setIsChangeRoleDialogOpen(true)
                }}
              >
                <UserCog className="mr-2 h-4 w-4" />
                Cambiar rol
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // Aquí iría la lógica para eliminar
                  alert(`Eliminar usuario: ${usuario.nombre} ${usuario.apellido}`)
                }}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchColumn="nombre"
        createRoute="/dashboard/mantenedores/usuarios/nuevo"
      />

      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Restablecer Contraseña</DialogTitle>
            <DialogDescription>
              Enviar correo para restablecer la contraseña de{" "}
              {selectedUsuario ? `${selectedUsuario.nombre} ${selectedUsuario.apellido}` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Se enviará un correo electrónico a <span className="font-medium">{selectedUsuario?.email}</span> con
              instrucciones para restablecer la contraseña.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={() => {
                  toast({
                    title: "Correo enviado",
                    description: `Se ha enviado un correo a ${selectedUsuario?.email} con instrucciones para restablecer la contraseña.`,
                  })
                  setIsResetPasswordDialogOpen(false)
                }}
              >
                Enviar correo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isChangeRoleDialogOpen} onOpenChange={setIsChangeRoleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cambiar Rol</DialogTitle>
            <DialogDescription>
              Cambiar el rol de {selectedUsuario ? `${selectedUsuario.nombre} ${selectedUsuario.apellido}` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="rolId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <FormControl>
                        <CustomSelect onValueChange={field.onChange} defaultValue={selectedUsuario?.rolId}>
                          <CustomSelectTrigger>
                            <CustomSelectValue placeholder="Seleccionar rol" />
                          </CustomSelectTrigger>
                          <CustomSelectContent>
                            <CustomSelectItem value="1">Administrador</CustomSelectItem>
                            <CustomSelectItem value="2">Supervisor</CustomSelectItem>
                            <CustomSelectItem value="3">Técnico</CustomSelectItem>
                            <CustomSelectItem value="4">Analista</CustomSelectItem>
                            <CustomSelectItem value="5">Visualizador</CustomSelectItem>
                          </CustomSelectContent>
                        </CustomSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsChangeRoleDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Guardar cambios
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
