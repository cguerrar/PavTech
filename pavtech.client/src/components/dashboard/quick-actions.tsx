import Link from "next/link"
import { Upload, FileText, Search, BarChart3, MapPin, Video } from "lucide-react"

// Datos de ejemplo para los atajos rápidos
const quickActionItems = [
  {
    id: "action-001",
    title: "Subir nuevo video",
    description: "Procesar un nuevo video de GoPro",
    icon: Upload,
    href: "/dashboard/videos/upload",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "action-002",
    title: "Generar reporte",
    description: "Crear un informe personalizado",
    icon: FileText,
    href: "/dashboard/reportes/nuevo",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: "action-003",
    title: "Buscar por odómetro",
    description: "Localizar un punto específico",
    icon: Search,
    href: "/dashboard/busqueda",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "action-004",
    title: "Ver análisis pendientes",
    description: "Revisar análisis en proceso",
    icon: BarChart3,
    href: "/dashboard/analisis/pendientes",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: "action-005",
    title: "Explorar mapa",
    description: "Navegar por el mapa interactivo",
    icon: MapPin,
    href: "/dashboard/mapas",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: "action-006",
    title: "Gestionar videos",
    description: "Administrar biblioteca de videos",
    icon: Video,
    href: "/dashboard/videos",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
]

export function QuickActions() {
  return (
    <>
      {quickActionItems.map((action) => (
        <Link
          key={action.id}
          href={action.href}
          className="group flex flex-col items-center justify-center rounded-md border p-4 transition-colors hover:bg-accent"
        >
          <div
            className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${action.bgColor} ${action.color} transition-colors group-hover:bg-background`}
          >
            <action.icon className="h-6 w-6" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium">{action.title}</h3>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </div>
        </Link>
      ))}
    </>
  )
}
