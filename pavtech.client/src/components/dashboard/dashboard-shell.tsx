import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <DashboardNav />
          <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
            <div className="mx-auto max-w-7xl space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
