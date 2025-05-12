"use client"

import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/components/ui/use-toast"

// Tipo para los datos de rol
type Rol = {
  id: string
  nombre: string
  permisos: string[]
  [key: string]: any
}

// Estructura de permisos disponibles
const permisosDisponibles = [
  {
    grupo: "Dashboard",
    permisos: [{ id: "dashboard:view", nombre: "Ver dashboard" }],
  },
  {
    grupo: "Proyectos",
    permisos: [
      { id: "proyectos:view", nombre: "Ver proyectos" },
      { id: "proyectos:create", nombre: "Crear proyectos" },
      { id: "proyectos:edit", nombre: "Editar proyectos" },
      { id: "proyectos:delete", nombre: "Eliminar proyectos" },
    ],
  },
  {
    grupo: "Usuarios",
    permisos: [
      { id: "usuarios:view", nombre: "Ver usuarios" },
      { id: "usuarios:create", nombre: "Crear usuarios" },
      { id: "usuarios:edit", nombre: "Editar usuarios" },
      { id: "usuarios:delete", nombre: "Eliminar usuarios" },
    ],
  },
  {
    grupo: "Roles",
    permisos: [
      { id: "roles:view", nombre: "Ver roles" },
      { id: "roles:create", nombre: "Crear roles" },
      { id: "roles:edit", nombre: "Editar roles" },
      { id: "roles:delete", nombre: "Eliminar roles" },
    ],
  },
  {
    grupo: "Caminos",
    permisos: [
      { id: "caminos:view", nombre: "Ver caminos" },
      { id: "caminos:create", nombre: "Crear caminos" },
      { id: "caminos:edit", nombre: "Editar caminos" },
      { id: "caminos:delete", nombre: "Eliminar caminos" },
    ],
  },
  {
    grupo: "Empresas",
    permisos: [
      { id: "empresas:view", nombre: "Ver empresas" },
      { id: "empresas:create", nombre: "Crear empresas" },
      { id: "empresas:edit", nombre: "Editar empresas" },
      { id: "empresas:delete", nombre: "Eliminar empresas" },
    ],
  },
  {
    grupo: "Tipos de Auscultación",
    permisos: [
      { id: "tipos_auscultacion:view", nombre: "Ver tipos de auscultación" },
      { id: "tipos_auscultacion:create", nombre: "Crear tipos de auscultación" },
      { id: "tipos_auscultacion:edit", nombre: "Editar tipos de auscultación" },
      { id: "tipos_auscultacion:delete", nombre: "Eliminar tipos de auscultación" },
    ],
  },
]

interface PermisosFormProps {
  rol: Rol
  onClose: () => void
}

export function PermisosForm({ rol, onClose }: PermisosFormProps) {
  const [selectedPermisos, setSelectedPermisos] = useState<string[]>(rol.permisos || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    permisosDisponibles.reduce(
      (acc, grupo) => {
        acc[grupo.grupo] = true
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const toggleGrupo = (grupo: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [grupo]: !prev[grupo],
    }))
  }

  const togglePermiso = (permisoId: string) => {
    setSelectedPermisos((prev) => {
      if (prev.includes(permisoId)) {
        return prev.filter((id) => id !== permisoId)
      } else {
        return [...prev, permisoId]
      }
    })
  }

  const toggleGrupoPermisos = (grupo: string, permisos: { id: string; nombre: string }[]) => {
    const permisosIds = permisos.map((p) => p.id)
    const todosSeleccionados = permisosIds.every((id) => selectedPermisos.includes(id))

    if (todosSeleccionados) {
      // Deseleccionar todos los permisos del grupo
      setSelectedPermisos((prev) => prev.filter((id) => !permisosIds.includes(id)))
    } else {
      // Seleccionar todos los permisos del grupo
      setSelectedPermisos((prev) => {
        const nuevosPermisos = [...prev]
        permisosIds.forEach((id) => {
          if (!nuevosPermisos.includes(id)) {
            nuevosPermisos.push(id)
          }
        })
        return nuevosPermisos
      })
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulamos una petición a la API
    setTimeout(() => {
      console.log({ rolId: rol.id, permisos: selectedPermisos })
      toast({
        title: "Permisos actualizados",
        description: `Se han actualizado los permisos del rol ${rol.nombre} correctamente.`,
      })
      setIsSubmitting(false)
      onClose()
    }, 1000)
  }

  return (
    <div className="space-y-4 py-4">
      <div className="max-h-[400px] overflow-y-auto pr-2">
        {permisosDisponibles.map((grupo) => {
          const todosSeleccionados = grupo.permisos.every((p) => selectedPermisos.includes(p.id))
          const algunoSeleccionado = grupo.permisos.some((p) => selectedPermisos.includes(p.id))

          return (
            <Collapsible key={grupo.grupo} open={openGroups[grupo.grupo]} onOpenChange={() => toggleGrupo(grupo.grupo)}>
              <div className="flex items-center space-x-2 rounded-md border px-4 py-3">
                <Checkbox
                  checked={todosSeleccionados}
                  indeterminate={!todosSeleccionados && algunoSeleccionado}
                  onCheckedChange={() => toggleGrupoPermisos(grupo.grupo, grupo.permisos)}
                  id={`grupo-${grupo.grupo}`}
                  aria-label={`Seleccionar todos los permisos de ${grupo.grupo}`}
                />
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex-1 justify-between p-0">
                    <label htmlFor={`grupo-${grupo.grupo}`} className="flex-1 cursor-pointer text-left font-medium">
                      {grupo.grupo}
                    </label>
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2 px-6 py-2">
                {grupo.permisos.map((permiso) => (
                  <div key={permiso.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permiso.id}
                      checked={selectedPermisos.includes(permiso.id)}
                      onCheckedChange={() => togglePermiso(permiso.id)}
                    />
                    <label
                      htmlFor={permiso.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permiso.nombre}
                    </label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className="bg-yellow-500 hover:bg-yellow-600 text-black" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar permisos"}
        </Button>
      </div>
    </div>
  )
}
