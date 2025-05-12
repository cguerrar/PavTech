"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (!email || !password) {
      setError("Por favor, complete todos los campos")
      return
    }

    try {
      setIsLoading(true)

      // Simulación de inicio de sesión
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aquí iría la lógica real de autenticación
      // Por ejemplo: const response = await signIn('credentials', { email, password, redirect: false })

      // Simulamos un error para demostración
      if (email === "error@example.com") {
        throw new Error("Credenciales inválidas")
      }

      // Redirección basada en el rol del usuario
      if (email.startsWith("cliente@")) {
        // Redireccionar al dashboard de clientes
        window.location.href = "/cliente"
      } else {
        // Redireccionar al dashboard de administradores
        window.location.href = "/dashboard"
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al inicio</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo-pavtech.png"
              alt="Pavtech Solutions"
              width={500}
              height={180}
              className="mx-auto h-36 w-auto mb-6"
            />
            <h1 className="text-2xl font-bold">Bienvenido a CapturaVial</h1>
            <p className="text-muted-foreground mt-2">Inicia sesión para acceder a tu cuenta</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nombre@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link
                      href="/recuperar-password"
                      className="text-sm text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Recordarme
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black dark:bg-yellow-600 dark:hover:bg-yellow-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/registro"
                  className="font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400"
                >
                  Regístrate
                </Link>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Al iniciar sesión, aceptas nuestros{" "}
                <Link href="/terminos" className="underline underline-offset-4 hover:text-foreground">
                  Términos de servicio
                </Link>{" "}
                y{" "}
                <Link href="/privacidad" className="underline underline-offset-4 hover:text-foreground">
                  Política de privacidad
                </Link>
                .
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-4">
          <p className="text-sm text-muted-foreground">© 2025 CapturaVial. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
