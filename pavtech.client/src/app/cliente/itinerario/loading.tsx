import { ClienteShell } from "@/components/cliente/cliente-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ItinerarioLoading() {
  return (
    <ClienteShell>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[350px] mt-2" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-[300px]" />

          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-4 w-[250px] mt-2" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid gap-4 md:grid-cols-3">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="h-[200px] w-full rounded-t-lg" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-[80%] mb-2" />
                      <Skeleton className="h-4 w-[60%] mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-8 w-[100px]" />
                        <Skeleton className="h-8 w-[100px]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </ClienteShell>
  )
}
