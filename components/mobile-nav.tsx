"use client"

import { LayoutDashboard, BarChart3, Wallet, RefreshCw, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const mobileMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Transações", href: "/transacoes" },
  { icon: Wallet, label: "Carteira", href: "/carteira" },
  { icon: RefreshCw, label: "Reembolsos", href: "/infracoes" },
  { icon: Bell, label: "Notificações", href: "/notificacoes" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileMenuItems.map((item, index) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1",
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50",
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1", isActive && "scale-110")} />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
