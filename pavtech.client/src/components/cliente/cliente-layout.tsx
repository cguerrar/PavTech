import type React from "react"
import Head from "next/head"
import Image from "next/image"

interface ClienteLayoutProps {
  children: React.ReactNode
  title?: string
}

const ClienteLayout: React.FC<ClienteLayoutProps> = ({ children, title = "Pavtech Solutions" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Pavtech Solutions Client Area" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen">
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex items-center justify-between">
            <a href="/" className="flex items-center">
              <Image
                src="/logo-pavtech.png"
                alt="Pavtech Solutions"
                width={400}
                height={150}
                className="h-28 w-auto mr-3"
              />
              <span className="font-bold text-xl">Pavtech Solutions</span>
            </a>
            <nav>{/* Navigation links can be added here */}</nav>
          </div>
        </header>

        <main className="container mx-auto flex-grow p-4">{children}</main>

        <footer className="bg-gray-800 text-white py-2 text-center">
          <p>&copy; {new Date().getFullYear()} Pavtech Solutions. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default ClienteLayout
