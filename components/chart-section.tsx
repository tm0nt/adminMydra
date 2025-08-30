"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Calendar } from "lucide-react"

export function ChartSection() {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Visão Geral Financeira</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Depósitos e saques dos últimos 30 dias</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 bg-transparent hover:scale-105 transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              30 dias
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 bg-transparent hover:scale-105 transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 hover:shadow-inner transition-all duration-300">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-sm logo-container">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Gráfico Interativo</p>
              <p className="text-gray-500">Visualização de dados em tempo real</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="text-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-green-700">Depósitos</p>
            </div>
            <p className="text-2xl font-bold text-green-900">R$ 75.400,00</p>
            <p className="text-sm text-green-600 mt-1">+15.3% este mês</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-red-700">Saques</p>
            </div>
            <p className="text-2xl font-bold text-red-900">R$ 15.320,00</p>
            <p className="text-sm text-red-600 mt-1">+3.1% este mês</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
