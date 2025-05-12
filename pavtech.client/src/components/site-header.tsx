import Image from "next/image"

const SiteHeader = () => {
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <Image src="/logo-pavtech.png" alt="Pavtech Solutions" width={400} height={150} className="h-28 w-auto" />
        </div>

        {/* Navigation (Placeholder) */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
