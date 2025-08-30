import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MobileHeader } from "@/components/mobile-header"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen bg-gray-50/50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              <div className="space-y-2 fade-in">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                {description && <p className="text-gray-600">{description}</p>}
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gray-50/50 pb-20">
        <MobileHeader />
        <main className="px-4 py-6">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 text-sm">{description}</p>}
          </div>
          {children}
        </main>
        <MobileNav />
      </div>
    </>
  )
}
