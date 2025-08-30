"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-all duration-200" />
            <Input
              placeholder="Buscar transações..."
              className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:scale-105"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge
            variant="secondary"
            className="bg-green-50 text-green-700 border-green-200 px-3 py-1 transition-all duration-200 hover:scale-105"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Conta Ativa
          </Badge>

          <Button variant="ghost" size="icon" className="relative transition-all duration-200 hover:scale-110">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">João Silva</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
