import type React from "react"
import { ClienteNav } from "@/components/cliente/cliente-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ClienteShellProps {
  children: React.ReactNode
}

export function ClienteShell({ children }: ClienteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="mb-4 flex items-center gap-2 border-b pb-4">
              <Image
                src="/logo-capturavial.png"
                alt="CapturaVial Logo"
                width={180}
                height={45}
                className="h-8 w-auto"
              />
              <span className="text-sm font-semibold">Portal Cliente</span>
            </div>
            <ClienteNav />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/cliente" className="flex items-center gap-2">
            <Image src="/logo-capturavial.png" alt="CapturaVial Logo" width={180} height={45} className="h-8 w-auto" />
            <span className="text-sm font-semibold hidden md:inline-block">Portal Cliente</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-right hidden md:block">
              <div className="font-medium">Cliente Demo</div>
              <div className="text-xs text-muted-foreground">cliente@capturavial.com</div>
            </div>
            <Image
              src="/generic-avatar-icon.png"
              alt="Avatar"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 py-4">
            <ClienteNav />
          </div>
        </aside>
        <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
