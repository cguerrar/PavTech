import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface AuscultacionInfoProps {
  auscultacion: any // Usamos any para simplificar, en un proyecto real usaríamos un tipo específico
}

export function AuscultacionInfo({ auscultacion }: AuscultacionInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Descripción</h3>
        <p className="text-sm text-muted-foreground mt-1">{auscultacion.descripcion}</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">Información General</h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Proyecto:</dt>
              <dd className="text-sm font-medium">{auscultacion.proyecto}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Cliente:</dt>
              <dd className="text-sm font-medium">{auscultacion.cliente}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Responsable:</dt>
              <dd className="text-sm font-medium">{auscultacion.responsable}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Fecha de inicio:</dt>
              <dd className="text-sm font-medium">{auscultacion.fechaInicio}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Fecha de término:</dt>
              <dd className="text-sm font-medium">{auscultacion.fechaTermino}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-medium">Detalles Técnicos</h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Tipo de auscultación:</dt>
              <dd className="text-sm font-medium">
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  {auscultacion.tipo}
                </Badge>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Distancia:</dt>
              <dd className="text-sm font-medium">{auscultacion.distancia}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Camino:</dt>
              <dd className="text-sm font-medium">{auscultacion.camino}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Metodología:</dt>
              <dd className="text-sm font-medium">{auscultacion.metodologia}</dd>
            </div>
          </dl>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium">Equipos Utilizados</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {auscultacion.equipos.map((equipo: string, index: number) => (
            <Badge key={index} variant="secondary">
              {equipo}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium">Resultados</h3>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted rounded-md p-3">
            <div className="text-xs text-muted-foreground">IRI Promedio</div>
            <div className="text-lg font-medium">{auscultacion.resultados.promedio.toFixed(1)} m/km</div>
          </div>
          <div className="bg-muted rounded-md p-3">
            <div className="text-xs text-muted-foreground">IRI Mínimo</div>
            <div className="text-lg font-medium">{auscultacion.resultados.minimo.toFixed(1)} m/km</div>
          </div>
          <div className="bg-muted rounded-md p-3">
            <div className="text-xs text-muted-foreground">IRI Máximo</div>
            <div className="text-lg font-medium">{auscultacion.resultados.maximo.toFixed(1)} m/km</div>
          </div>
          <div className="bg-muted rounded-md p-3">
            <div className="text-xs text-muted-foreground">Cumplimiento</div>
            <div className="text-lg font-medium">{auscultacion.resultados.porcentajeCumplimiento}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
