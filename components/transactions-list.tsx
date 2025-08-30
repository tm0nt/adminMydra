import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Clock, CheckCircle, AlertCircle } from "lucide-react"

const transactions = [
  {
    id: 1,
    description: "Pagamento recebido",
    amount: "R$ 2.450,00",
    status: "completed",
    time: "2 min atrás",
    type: "credit",
  },
  {
    id: 2,
    description: "Transferência enviada",
    amount: "R$ 890,50",
    status: "pending",
    time: "15 min atrás",
    type: "debit",
  },
  {
    id: 3,
    description: "Pagamento PIX",
    amount: "R$ 156,90",
    status: "completed",
    time: "1 hora atrás",
    type: "credit",
  },
  {
    id: 4,
    description: "Saque solicitado",
    amount: "R$ 1.200,00",
    status: "processing",
    time: "2 horas atrás",
    type: "debit",
  },
]

const statusConfig = {
  completed: { label: "Concluído", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "Processando", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
}

export function TransactionsList() {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Transações Recentes</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Últimas movimentações da conta</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:scale-105 transition-all duration-200"
          >
            Ver todas
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => {
          const statusInfo = statusConfig[transaction.status as keyof typeof statusConfig]
          const StatusIcon = statusInfo.icon

          return (
            <div
              key={transaction.id}
              className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <ArrowUpRight
                  className={`w-5 h-5 transition-all duration-300 ${
                    transaction.type === "credit" ? "text-green-600 rotate-0" : "text-red-600 rotate-180"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{transaction.description}</p>
                  <p
                    className={`text-sm font-semibold ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {transaction.amount}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{transaction.time}</p>
                  <Badge
                    variant="secondary"
                    className={`${statusInfo.color} border-0 text-xs hover:scale-105 transition-all duration-200`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}

        <Button
          variant="outline"
          className="w-full mt-4 text-gray-600 hover:text-gray-900 bg-transparent hover:scale-105 transition-all duration-200"
        >
          Carregar mais transações
        </Button>
      </CardContent>
    </Card>
  )
}
