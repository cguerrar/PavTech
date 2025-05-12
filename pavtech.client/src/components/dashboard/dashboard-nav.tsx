"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileSpreadsheet,
  FileVideo,
  FolderKanban,
  Home,
  Settings,
  Upload,
  Database,
  LogOut,
  GitCompareArrowsIcon as CompareArrows,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface DashboardNavProps {
  className?: string
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center py-8">
        <Link href="/dashboard" className="flex items-center justify-center">
          <Image src="/logo-pavtech.png" alt="Pavtech Solutions" width={400} height={150} className="h-28 w-auto" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link href="/dashboard">
                <Home className="mr-2 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/proyectos"}>
              <Link href="/dashboard/proyectos">
                <FolderKanban className="mr-2 h-5 w-5" />
                <span>Proyectos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/videos")}>
              <Link href="/dashboard/videos">
                <FileVideo className="mr-2 h-5 w-5" />
                <span>Videos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/videos/upload"}>
              <Link href="/dashboard/videos/upload">
                <Upload className="mr-2 h-5 w-5" />
                <span>Subir Video</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/auscultacion/cargar"}>
              <Link href="/dashboard/auscultacion/cargar">
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                <span>Cargar Auscultación</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/reportes"}>
              <Link href="/dashboard/reportes">
                <BarChart3 className="mr-2 h-5 w-5" />
                <span>Reportes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/mantenedores")}>
              <Link href="/dashboard/mantenedores">
                <Database className="mr-2 h-5 w-5" />
                <span>Mantenedores</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/comparacion"}>
              <Link href="/dashboard/comparacion">
                <CompareArrows className="mr-2 h-5 w-5" />
                <span>Comparación</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/configuracion">
                <Settings className="mr-2 h-5 w-5" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <LogOut className="mr-2 h-5 w-5" />
                <span>Cerrar Sesión</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarTrigger className="absolute left-4 top-4 md:hidden" />
    </Sidebar>
  )
}
