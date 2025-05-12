import type React from "react"
import Link from "next/link"
import Image from "next/image"

interface MainNavProps {
  className?: string
}

const MainNav: React.FC<MainNavProps> = ({ className }) => {
  return (
    <nav className={`flex items-center justify-between ${className}`}>
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo-pavtech.png" alt="Pavtech Solutions" width={240} height={80} className="h-16 w-auto" />
        <span className="font-bold">Pavtech Solutions</span>
      </Link>
      {/* Add navigation links here if needed */}
    </nav>
  )
}

export default MainNav
