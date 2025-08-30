"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNav } from "@/components/mobile-nav"
import { MetricCards } from "@/components/metric-cards"
import { ChartSection } from "@/components/chart-section"
import { TransactionsList } from "@/components/transactions-list"
import { useState, useEffect } from "react"

export function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      {/* Desktop Layout */}
      <div
        className={`hidden md:flex h-screen bg-gray-50/50 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              <div className="space-y-2 fade-in">
                <h1 className="text-3xl font-bold text-gray-900">Boas vindas! 👋</h1>
                <p className="text-gray-600">Aqui está um resumo da sua conta hoje</p>
              </div>

              <div className="slide-in">
                <MetricCards />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 fade-in">
                <div className="xl:col-span-2">
                  <ChartSection />
                </div>
                <div className="xl:col-span-1">
                  <TransactionsList />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className={`md:hidden min-h-screen bg-gray-50/50 pb-20 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <MobileHeader />
        <main className="px-4 py-6">
          <div className="space-y-2 mb-6 fade-in">
            <h1 className="text-2xl font-bold text-gray-900">Boas vindas! 👋</h1>
            <p className="text-gray-600 text-sm">Aqui está um resumo da sua conta hoje</p>
          </div>

          <div className="space-y-6">
            <div className="slide-in">
              <MetricCards />
            </div>

            <div className="space-y-6 fade-in">
              <ChartSection />
              <TransactionsList />
            </div>
          </div>
        </main>
        <MobileNav />
      </div>
    </>
  )
}
