import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "CapturaVial - Portal Cliente",
    template: "%s | CapturaVial",
  },
  description: "Portal para clientes de CapturaVial",
}

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
