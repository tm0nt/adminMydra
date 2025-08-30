"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"

const mobileMenuItems = [
  { label: "Configurações", href: "/configuracoes" },
  { label: "Conta", href: "/conta" },
  { label: "Ajuda", href: "#" },
  { label: "Sair", href: "#", className: "text-red-600" },
]

export function MobileHeader() {
  const pathname = usePathname()

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3 sticky top-0 z-40 md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-sm">ApexPayments</h2>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 px-2 py-1 text-xs">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
            Ativa
          </Badge>

          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell className="w-4 h-4 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="w-4 h-4 text-gray-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">João Silva</p>
                    <p className="text-xs text-gray-500">Administrador</p>
                  </div>
                </div>

                <nav className="flex-1 pt-4">
                  <div className="space-y-1">
                    {mobileMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          item.className || "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
