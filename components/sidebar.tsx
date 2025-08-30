"use client"

import {
  LayoutDashboard,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Wallet,
  RefreshCw,
  User,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Transações", href: "/transacoes" },
  { icon: Wallet, label: "Carteira", href: "/carteira" },
  { icon: RefreshCw, label: "Reembolsos", href: "/infracoes" },
  { icon: Bell, label: "Notificações", href: "/notificacoes" },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
  { icon: User, label: "Conta", href: "/conta" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={`${collapsed ? "w-20" : "w-72"} bg-white border-r border-gray-100 flex-col transition-all duration-300 shadow-sm hidden md:flex`}
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center space-x-3 fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg logo-container">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">ApexPayments</h2>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <div key={index} className={`sidebar-item ${isActive ? "active" : ""}`}>
              <Link href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start h-12 transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } ${collapsed ? "px-3" : "px-4"}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
                </Button>
              </Link>
            </div>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-2">
        <Button
          variant="ghost"
          className={`w-full justify-start h-12 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 hover:scale-105 ${collapsed ? "px-3" : "px-4"}`}
        >
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3 font-medium">Ajuda</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:scale-105 ${collapsed ? "px-3" : "px-4"}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3 font-medium">Sair</span>}
        </Button>
      </div>
    </div>
  )
}
