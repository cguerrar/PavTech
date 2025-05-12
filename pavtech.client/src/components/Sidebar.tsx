"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Home,
  FolderKanban,
  FileVideo,
  FileSpreadsheet,
  BarChart3,
  Database,
  Settings,
  LogOut,
  GitCompareArrowsIcon as CompareArrows,
} from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <Image src="/logo-pavtech.png" alt="Pavtech Solutions" width={400} height={150} className="h-28 w-auto mb-2" />
        <p className="text-gray-400">Admin Dashboard</p>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center space-x-2 hover:text-yellow-500">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/proyectos" className="flex items-center space-x-2 hover:text-yellow-500">
              <FolderKanban className="h-4 w-4" />
              <span>Proyectos</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/videos" className="flex items-center space-x-2 hover:text-yellow-500">
              <FileVideo className="h-4 w-4" />
              <span>Videos</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/videos/upload" className="flex items-center space-x-2 hover:text-yellow-500">
              <FileVideo className="h-4 w-4" />
              <span>Subir Video</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/auscultacion/cargar" className="flex items-center space-x-2 hover:text-yellow-500">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Cargar Auscultación</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/reportes" className="flex items-center space-x-2 hover:text-yellow-500">
              <BarChart3 className="h-4 w-4" />
              <span>Reportes</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/mantenedores" className="flex items-center space-x-2 hover:text-yellow-500">
              <Database className="h-4 w-4" />
              <span>Mantenedores</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/comparacion" className="flex items-center space-x-2 hover:text-yellow-500">
              <CompareArrows className="h-4 w-4" />
              <span>Comparación</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <Link href="/dashboard/configuracion" className="flex items-center space-x-2 hover:text-yellow-500">
          <Settings className="h-4 w-4" />
          <span>Configuración</span>
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/" className="flex items-center space-x-2 hover:text-red-500">
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </Link>
      </div>
    </aside>
  )
}
