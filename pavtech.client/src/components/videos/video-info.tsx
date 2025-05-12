import { Calendar, Clock, FileText, MapPin, Video } from "lucide-react"

interface VideoInfoProps {
  videoData: {
    id: string
    title: string
    project: string
    path: string
    date: string
    duration: string
    size: string
    totalDistance: number
  }
}

export function VideoInfo({ videoData }: VideoInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Información del Video</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Video className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Nombre del archivo</p>
                <p className="text-sm text-muted-foreground">{videoData.title}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Proyecto</p>
                <p className="text-sm text-muted-foreground">{videoData.project}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Camino</p>
                <p className="text-sm text-muted-foreground">{videoData.path}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Fecha de grabación</p>
                <p className="text-sm text-muted-foreground">{new Date(videoData.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Duración</p>
                <p className="text-sm text-muted-foreground">{videoData.duration}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Tamaño</p>
                <p className="text-sm text-muted-foreground">{videoData.size}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Datos Técnicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Distancia Total</h4>
            <p className="text-2xl font-bold">{(videoData.totalDistance / 1000).toFixed(2)} km</p>
          </div>
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Velocidad Promedio</h4>
            <p className="text-2xl font-bold">60 km/h</p>
          </div>
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">IRI Promedio</h4>
            <p className="text-2xl font-bold">2.7 m/km</p>
          </div>
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Defectos Detectados</h4>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Metadatos</h3>
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 text-sm font-medium bg-muted/50">Dispositivo</td>
                <td className="px-4 py-2 text-sm">GoPro Hero 10 Black</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-sm font-medium bg-muted/50">Resolución</td>
                <td className="px-4 py-2 text-sm">1920x1080 (Full HD)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-sm font-medium bg-muted/50">FPS</td>
                <td className="px-4 py-2 text-sm">30</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-sm font-medium bg-muted/50">Codec</td>
                <td className="px-4 py-2 text-sm">H.264</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-sm font-medium bg-muted/50">GPS</td>
                <td className="px-4 py-2 text-sm">Integrado</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium bg-muted/50">Procesado</td>
                <td className="px-4 py-2 text-sm">Completo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
