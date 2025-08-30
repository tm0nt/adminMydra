import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Shield, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"

const metrics = [
  {
    title: "Saldo Disponível",
    value: "R$ 42.500,00",
    change: "+12.5%",
    changeType: "positive",
    icon: Wallet,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50",
  },
  {
    title: "Bloqueio Cautelar",
    value: "R$ 1.250,00",
    change: "-5.2%",
    changeType: "negative",
    icon: Shield,
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100/50",
  },
  {
    title: "Total de Entradas",
    value: "R$ 89.750,00",
    change: "+18.7%",
    changeType: "positive",
    icon: TrendingUp,
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100/50",
  },
  {
    title: "Total de Saques",
    value: "R$ 15.320,00",
    change: "+3.1%",
    changeType: "positive",
    icon: TrendingDown,
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-50 to-red-100/50",
  },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs md:text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center space-x-1">
                  {metric.changeType === "positive" ? (
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                  )}
                  <span
                    className={`text-xs md:text-sm font-medium ${
                      metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:inline">vs mês anterior</span>
                </div>
              </div>
              <div
                className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${metric.bgGradient} transition-all duration-300 hover:scale-110`}
              >
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br ${metric.gradient} rounded-lg flex items-center justify-center`}
                >
                  <metric.icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
