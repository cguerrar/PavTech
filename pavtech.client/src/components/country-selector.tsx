"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useCountry } from "@/contexts/country-context"

// Definición de tipos
export type Country = "chile" | "peru" | "usa"

export interface CountryData {
  // Información básica
  address: string
  phone: string
  currency: string
  language: string // Añadimos el idioma

  // Precios
  basicPrice: string
  proPrice: string
  enterprisePrice: string

  // Testimonios
  testimonials: {
    quote: string
    author: string
    role: string
  }[]

  // Métricas del dashboard
  metrics: {
    kilometersAnalyzed: string
    activeProjects: string
    processingVideos: string
    systemEfficiency: string
    kilometersGrowth: string
    projectsCompleted: string
    processingTime: string
    efficiencyGrowth: string
  }

  // Datos de proyectos
  projects: {
    name: string
    location: string
    status: "normal" | "warning" | "critical"
  }[]

  // Datos de alertas
  alerts: {
    project: string
    location: string
    issue: string
    value: string
    threshold: string
    severity: "high" | "medium"
    timestamp: string
  }[]

  // Datos de actividad reciente
  activities: {
    user: {
      name: string
      avatar: string
      initials: string
    }
    action: string
    target: string
    timestamp: string
  }[]

  // Datos de análisis
  analysis: {
    monthlyData: { name: string; total: number }[]
    typeData: { name: string; value: number; color: string }[]
    weeklyData: { name: string; grietas: number; baches: number; deformaciones: number }[]
    severityData: { name: string; value: number; color: string }[]
  }

  // URL de la bandera
  flagUrl: string
}

export interface CountryInfo {
  [key: string]: CountryData
}

// Datos específicos por país
export const countryData: CountryInfo = {
  usa: {
    address: "1234 Tech Avenue, Suite 500, San Francisco, CA 94107, USA",
    phone: "+1 (415) 555-7890",
    currency: "USD",
    language: "en",
    basicPrice: "$399/month",
    proPrice: "$799/month",
    enterprisePrice: "Contact us",
    testimonials: [
      {
        quote:
          "PavTech has revolutionized how we evaluate road conditions. We save time and resources with their platform.",
        author: "Highway Construction Inc.",
        role: "Customer since 2022",
      },
      {
        quote: "The precision of the data is impressive. It allows us to make decisions based on reliable information.",
        author: "Road Engineering Solutions",
        role: "Customer since 2021",
      },
      {
        quote: "The real-time dashboard gives us complete visibility into the status of our road projects.",
        author: "Northern Highways",
        role: "Customer since 2023",
      },
    ],
    metrics: {
      kilometersAnalyzed: "3,248.5",
      activeProjects: "42",
      processingVideos: "15",
      systemEfficiency: "99.2%",
      kilometersGrowth: "+15.7%",
      projectsCompleted: "18",
      processingTime: "32 minutes",
      efficiencyGrowth: "+2.1%",
    },
    projects: [
      {
        name: "Interstate 80",
        location: "California",
        status: "warning",
      },
      {
        name: "Highway 101",
        location: "San Francisco",
        status: "normal",
      },
      {
        name: "Route 66",
        location: "Arizona",
        status: "critical",
      },
    ],
    alerts: [
      {
        project: "Interstate 80",
        location: "Mile 27.5",
        issue: "IRI exceeds critical threshold",
        value: "5.8 m/km",
        threshold: "3.5 m/km",
        severity: "high",
        timestamp: "2 hours ago",
      },
      {
        project: "Highway 101",
        location: "Mile 12.3",
        issue: "Multiple potholes detected",
        value: "8 potholes",
        threshold: "3 per mile",
        severity: "medium",
        timestamp: "3 hours ago",
      },
    ],
    activities: [
      {
        user: {
          name: "John Smith",
          avatar: "/masculine-avatar.png",
          initials: "JS",
        },
        action: "uploaded a new video",
        target: "Interstate 80 Mile 25-30.mp4",
        timestamp: "15 minutes ago",
      },
      {
        user: {
          name: "Emily Johnson",
          avatar: "/placeholder.svg?key=usa1",
          initials: "EJ",
        },
        action: "generated a report",
        target: "Highway 101 Monthly Report",
        timestamp: "32 minutes ago",
      },
    ],
    analysis: {
      monthlyData: [
        { name: "January", total: 180 },
        { name: "February", total: 165 },
        { name: "March", total: 190 },
        { name: "April", total: 175 },
        { name: "May", total: 210 },
        { name: "June", total: 195 },
      ],
      typeData: [
        { name: "Cracks", value: 35, color: "#8884d8" },
        { name: "Potholes", value: 25, color: "#82ca9d" },
        { name: "Deformations", value: 20, color: "#ffc658" },
        { name: "Subsidence", value: 20, color: "#a45de2" },
      ],
      weeklyData: [
        { name: "Monday", grietas: 20, baches: 15, deformaciones: 10 },
        { name: "Tuesday", grietas: 22, baches: 18, deformaciones: 12 },
        { name: "Wednesday", grietas: 25, baches: 20, deformaciones: 15 },
        { name: "Thursday", grietas: 23, baches: 17, deformaciones: 13 },
        { name: "Friday", grietas: 28, baches: 22, deformaciones: 16 },
        { name: "Saturday", grietas: 30, baches: 25, deformaciones: 18 },
        { name: "Sunday", grietas: 27, baches: 20, deformaciones: 14 },
      ],
      severityData: [
        { name: "Low", value: 40, color: "#64B5F6" },
        { name: "Moderate", value: 30, color: "#4DB6AC" },
        { name: "Severe", value: 20, color: "#FFB74D" },
        { name: "Critical", value: 10, color: "#E57373" },
      ],
    },
    flagUrl: "/images/flag-usa.png",
  },
  chile: {
    address: "Av. Apoquindo 4700, Of. 1601, Las Condes, Santiago, Chile",
    phone: "+56 2 2246 8100",
    currency: "CLP",
    language: "es",
    basicPrice: "$399.990/mes",
    proPrice: "$799.990/mes",
    enterprisePrice: "Contáctanos",
    testimonials: [
      {
        quote:
          "CapturaVial ha revolucionado nuestra forma de evaluar el estado de las carreteras. Ahorramos tiempo y recursos.",
        author: "Constructora Vial S.A.",
        role: "Cliente desde 2022",
      },
      {
        quote:
          "La precisión de los datos es impresionante. Nos permite tomar decisiones basadas en información confiable.",
        author: "Ingeniería de Caminos",
        role: "Cliente desde 2021",
      },
      {
        quote: "El dashboard en tiempo real nos da visibilidad completa sobre el estado de nuestros proyectos viales.",
        author: "Autopistas del Norte",
        role: "Cliente desde 2023",
      },
    ],
    metrics: {
      kilometersAnalyzed: "1,248.5",
      activeProjects: "24",
      processingVideos: "7",
      systemEfficiency: "98.7%",
      kilometersGrowth: "+12.3%",
      projectsCompleted: "8",
      processingTime: "45 minutos",
      efficiencyGrowth: "+1.2%",
    },
    projects: [
      {
        name: "Ruta 68",
        location: "Valparaíso",
        status: "warning",
      },
      {
        name: "Autopista Central",
        location: "Santiago",
        status: "normal",
      },
      {
        name: "Ruta 5 Sur",
        location: "Temuco",
        status: "critical",
      },
    ],
    alerts: [
      {
        project: "Ruta 68",
        location: "Km 27.5",
        issue: "IRI excede umbral crítico",
        value: "5.8 m/km",
        threshold: "3.5 m/km",
        severity: "high",
        timestamp: "Hace 2 horas",
      },
      {
        project: "Autopista Central",
        location: "Km 12.3",
        issue: "Múltiples baches detectados",
        value: "8 baches",
        threshold: "3 por km",
        severity: "medium",
        timestamp: "Hace 3 horas",
      },
    ],
    activities: [
      {
        user: {
          name: "Carlos Mendoza",
          avatar: "/masculine-avatar.png",
          initials: "CM",
        },
        action: "subió un nuevo video",
        target: "Ruta 68 Km 25-30.mp4",
        timestamp: "Hace 15 minutos",
      },
      {
        user: {
          name: "Ana Martínez",
          avatar: "/placeholder.svg?key=4grzq",
          initials: "AM",
        },
        action: "generó un reporte",
        target: "Informe Mensual Autopista Central",
        timestamp: "Hace 32 minutos",
      },
    ],
    analysis: {
      monthlyData: [
        { name: "Enero", total: 120 },
        { name: "Febrero", total: 98 },
        { name: "Marzo", total: 140 },
        { name: "Abril", total: 110 },
        { name: "Mayo", total: 156 },
        { name: "Junio", total: 132 },
      ],
      typeData: [
        { name: "Grietas", value: 35, color: "#8884d8" },
        { name: "Baches", value: 25, color: "#82ca9d" },
        { name: "Deformaciones", value: 20, color: "#ffc658" },
        { name: "Hundimientos", value: 20, color: "#a45de2" },
      ],
      weeklyData: [
        { name: "Lunes", grietas: 20, baches: 15, deformaciones: 10 },
        { name: "Martes", grietas: 22, baches: 18, deformaciones: 12 },
        { name: "Miércoles", grietas: 25, baches: 20, deformaciones: 15 },
        { name: "Jueves", grietas: 23, baches: 17, deformaciones: 13 },
        { name: "Viernes", grietas: 28, baches: 22, deformaciones: 16 },
        { name: "Sábado", grietas: 30, baches: 25, deformaciones: 18 },
        { name: "Domingo", grietas: 27, baches: 20, deformaciones: 14 },
      ],
      severityData: [
        { name: "Leve", value: 40, color: "#64B5F6" },
        { name: "Moderado", value: 30, color: "#4DB6AC" },
        { name: "Grave", value: 20, color: "#FFB74D" },
        { name: "Crítico", value: 10, color: "#E57373" },
      ],
    },
    flagUrl: "/images/flag-chile.png",
  },
  peru: {
    address: "Jr. San Martin 786 of. 201, Magdalena del Mar, Lima, Perú",
    phone: "+51 1 224 8900",
    currency: "PEN",
    language: "es",
    basicPrice: "S/1,499/mes",
    proPrice: "S/2,999/mes",
    enterprisePrice: "Contáctanos",
    testimonials: [
      {
        quote:
          "La plataforma nos ha permitido mejorar significativamente la gestión de nuestras carreteras en todo el país.",
        author: "Ministerio de Transportes",
        role: "Cliente desde 2023",
      },
      {
        quote: "Hemos reducido los tiempos de inspección en un 85% gracias a la automatización que ofrece CapturaVial.",
        author: "Constructora Lima",
        role: "Cliente desde 2022",
      },
      {
        quote:
          "La calidad de los informes y la facilidad de uso hacen que CapturaVial sea indispensable para nuestros proyectos.",
        author: "Vías del Sur",
        role: "Cliente desde 2021",
      },
    ],
    metrics: {
      kilometersAnalyzed: "2,356.8",
      activeProjects: "31",
      processingVideos: "12",
      systemEfficiency: "97.2%",
      kilometersGrowth: "+18.5%",
      projectsCompleted: "11",
      processingTime: "38 minutos",
      efficiencyGrowth: "+0.8%",
    },
    projects: [
      {
        name: "Carretera Panamericana",
        location: "Lima",
        status: "normal",
      },
      {
        name: "Carretera Central",
        location: "Junín",
        status: "warning",
      },
      {
        name: "Vía de Evitamiento",
        location: "Arequipa",
        status: "critical",
      },
    ],
    alerts: [
      {
        project: "Carretera Central",
        location: "Km 45.2",
        issue: "Fricción por debajo del mínimo",
        value: "0.31",
        threshold: "0.40",
        severity: "high",
        timestamp: "Hace 1 hora",
      },
      {
        project: "Vía de Evitamiento",
        location: "Km 8.7",
        issue: "Grietas longitudinales extensas",
        value: "22m",
        threshold: "5m por km",
        severity: "medium",
        timestamp: "Hace 4 horas",
      },
    ],
    activities: [
      {
        user: {
          name: "Jorge Ramírez",
          avatar: "/placeholder.svg?key=peru1",
          initials: "JR",
        },
        action: "subió un nuevo video",
        target: "Panamericana Norte Km 45-60.mp4",
        timestamp: "Hace 25 minutos",
      },
      {
        user: {
          name: "María Sánchez",
          avatar: "/placeholder.svg?key=peru2",
          initials: "MS",
        },
        action: "generó un reporte",
        target: "Informe Trimestral Carretera Central",
        timestamp: "Hace 1 hora",
      },
    ],
    analysis: {
      monthlyData: [
        { name: "Enero", total: 145 },
        { name: "Febrero", total: 132 },
        { name: "Marzo", total: 168 },
        { name: "Abril", total: 125 },
        { name: "Mayo", total: 187 },
        { name: "Junio", total: 156 },
      ],
      typeData: [
        { name: "Grietas", value: 30, color: "#8884d8" },
        { name: "Baches", value: 35, color: "#82ca9d" },
        { name: "Deformaciones", value: 15, color: "#ffc658" },
        { name: "Hundimientos", value: 20, color: "#a45de2" },
      ],
      weeklyData: [
        { name: "Lunes", grietas: 25, baches: 20, deformaciones: 12 },
        { name: "Martes", grietas: 28, baches: 22, deformaciones: 15 },
        { name: "Miércoles", grietas: 30, baches: 25, deformaciones: 18 },
        { name: "Jueves", grietas: 27, baches: 21, deformaciones: 16 },
        { name: "Viernes", grietas: 32, baches: 26, deformaciones: 19 },
        { name: "Sábado", grietas: 35, baches: 30, deformaciones: 22 },
        { name: "Domingo", grietas: 31, baches: 24, deformaciones: 17 },
      ],
      severityData: [
        { name: "Leve", value: 35, color: "#64B5F6" },
        { name: "Moderado", value: 35, color: "#4DB6AC" },
        { name: "Grave", value: 20, color: "#FFB74D" },
        { name: "Crítico", value: 10, color: "#E57373" },
      ],
    },
    flagUrl: "/images/flag-peru.png",
  },
}

interface CountrySelectorProps {
  onCountryChange?: (country: Country, countryData: CountryData) => void
}

export default function CountrySelector({ onCountryChange }: CountrySelectorProps) {
  const { country, setCountry, data } = useCountry()
  const [isOpen, setIsOpen] = useState(false)

  // Manejar el cambio de país
  const handleCountryChange = (newCountry: Country) => {
    setCountry(newCountry)
    setIsOpen(false)

    // Si hay una función onCountryChange, llamarla
    if (onCountryChange) {
      onCountryChange(newCountry, countryData[newCountry])
    }
  }

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(".country-selector")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Función para obtener el nombre del país según el idioma
  const getCountryName = (countryCode: Country) => {
    if (countryCode === "usa") return "USA"
    if (countryCode === "chile") return "Chile"
    if (countryCode === "peru") return "Perú"
    return countryCode
  }

  return (
    <div className="relative country-selector">
      <Button
        variant="outline"
        size="sm"
        className="h-9 gap-1 border-muted-foreground/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-5 h-4 overflow-hidden rounded-sm mr-1">
          <Image
            src={data.flagUrl || "/placeholder.svg"}
            alt={`Flag of ${getCountryName(country)}`}
            width={20}
            height={16}
            className="h-full w-full object-cover"
          />
        </div>
        {getCountryName(country)}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleCountryChange("usa")}
              role="menuitem"
            >
              <div className="w-5 h-4 overflow-hidden rounded-sm mr-2">
                <Image
                  src={countryData.usa.flagUrl || "/placeholder.svg"}
                  alt="Flag of USA"
                  width={20}
                  height={16}
                  className="h-full w-full object-cover"
                />
              </div>
              USA
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleCountryChange("chile")}
              role="menuitem"
            >
              <div className="w-5 h-4 overflow-hidden rounded-sm mr-2">
                <Image
                  src={countryData.chile.flagUrl || "/placeholder.svg"}
                  alt="Bandera de Chile"
                  width={20}
                  height={16}
                  className="h-full w-full object-cover"
                />
              </div>
              Chile
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleCountryChange("peru")}
              role="menuitem"
            >
              <div className="w-5 h-4 overflow-hidden rounded-sm mr-2">
                <Image
                  src={countryData.peru.flagUrl || "/placeholder.svg"}
                  alt="Bandera de Perú"
                  width={20}
                  height={16}
                  className="h-full w-full object-cover"
                />
              </div>
              Perú
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
