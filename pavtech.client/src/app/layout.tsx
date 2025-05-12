import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CountryProvider } from "@/contexts/country-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PavTech Solutions - Professional Road Survey Platform",
  description:
    "Automated Road Analysis with Millimetric Precision. GoPro video processing + IRI + Defectometry + Friction + Deflectometry in a single platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CountryProvider>{children}</CountryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
