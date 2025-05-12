"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileVideo, Home, LogOut, RouteIcon as Road, Camera } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function ClienteNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/cliente",
      label: "Inicio",
      icon: Home,
      active: pathname === "/cliente",
    },
    {
      href: "/cliente/proyectos",
      label: "Mis Proyectos",
      icon: Road,
      active: pathname === "/cliente/proyectos",
    },
    {
      href: "/cliente/videos",
      label: "Videos",
      icon: FileVideo,
      active: pathname === "/cliente/videos",
    },
    {
      href: "/cliente/itinerario",
      label: "Itinerario Fílmico",
      icon: Camera,
      active: pathname === "/cliente/itinerario",
    },
    {
      href: "/cliente/auscultacion",
      label: "Auscultación",
      icon: BarChart3,
      active: pathname === "/cliente/auscultacion",
    },
  ]

  return (
    <nav className="grid gap-1 px-2">
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={route.active ? "secondary" : "ghost"}
          className={cn("justify-start gap-2", route.active && "bg-yellow-100 dark:bg-yellow-900")}
          asChild
        >
          <Link href={route.href}>
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
          asChild
        >
          <Link href="/">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Link>
        </Button>
      </div>
    </nav>
  )
}
