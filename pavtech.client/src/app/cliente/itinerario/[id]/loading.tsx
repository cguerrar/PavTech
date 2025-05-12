import { ClienteShell } from "@/components/cliente/cliente-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ItinerarioDetailLoading() {
  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center mb-4">
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Contenido principal */}
          <div className="flex-1 space-y-4">
            <div>
              <Skeleton className="h-8 w-[70%]" />
              <Skeleton className="h-4 w-[40%] mt-2" />
            </div>

            <Skeleton className="h-10 w-[300px]" />

            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array(12)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-[150px] w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-3 w-[60%]" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="w-full md:w-80 space-y-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-[100px]" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((id) => (
                  <div key={id} className="flex items-start space-x-3">
                    <Skeleton className="h-14 w-20 rounded" />
                    <div>
                      <Skeleton className="h-4 w-[120px] mb-1" />
                      <Skeleton className="h-3 w-[80px]" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClienteShell>
  )
}
