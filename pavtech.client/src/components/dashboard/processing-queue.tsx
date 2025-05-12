import { Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para la cola de procesamiento
const queueItems = [
  {
    id: "vid-001",
    name: "Ruta 68 Km 25-30.mp4",
    status: "completed",
    progress: 100,
    timeRemaining: "0m",
    timestamp: "Hace 15 minutos",
  },
  {
    id: "vid-002",
    name: "Autopista Central Tramo Norte.mp4",
    status: "processing",
    progress: 68,
    timeRemaining: "12m",
    timestamp: "Hace 32 minutos",
  },
  {
    id: "vid-003",
    name: "Ruta 5 Sur Km 120-135.mp4",
    status: "processing",
    progress: 34,
    timeRemaining: "25m",
    timestamp: "Hace 45 minutos",
  },
  {
    id: "vid-004",
    name: "Costanera Norte Sector Oriente.mp4",
    status: "queued",
    progress: 0,
    timeRemaining: "1h 10m",
    timestamp: "Hace 1 hora",
  },
  {
    id: "vid-005",
    name: "Ruta 78 Sector Melipilla.mp4",
    status: "error",
    progress: 23,
    timeRemaining: "-",
    timestamp: "Hace 2 horas",
  },
]

export function ProcessingQueue() {
  return (
    <div className="space-y-4">
      {queueItems.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              {item.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
              {item.status === "processing" && <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />}
              {item.status === "queued" && <Clock className="h-4 w-4 text-yellow-500" />}
              {item.status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
              <span className="truncate max-w-[180px]">{item.name}</span>
            </div>
            <Badge
              variant={item.status === "completed" ? "default" : item.status === "error" ? "destructive" : "outline"}
              className="text-xs"
            >
              {item.status === "completed" && "Completado"}
              {item.status === "processing" && "Procesando"}
              {item.status === "queued" && "En cola"}
              {item.status === "error" && "Error"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={item.progress} className="h-2" />
            <span className="text-xs text-muted-foreground w-10">{item.progress}%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Tiempo restante: {item.timeRemaining}</span>
            <span>{item.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
