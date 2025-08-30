"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, CheckCircle, AlertTriangle, Info, X, Settings } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-is-mobile"

const notificacoes = [
  {
    id: 1,
    tipo: "transacao",
    titulo: "Pagamento PIX recebido",
    descricao: "Você recebeu um pagamento de R$ 2.450,00",
    tempo: "2 minutos atrás",
    lida: false,
    icone: CheckCircle,
    cor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: 2,
    tipo: "seguranca",
    titulo: "Tentativa de login suspeita",
    descricao: "Nova tentativa de login de IP não reconhecido",
    tempo: "15 minutos atrás",
    lida: false,
    icone: AlertTriangle,
    cor: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: 3,
    tipo: "sistema",
    titulo: "Manutenção programada",
    descricao: "Sistema será atualizado hoje às 02:00",
    tempo: "1 hora atrás",
    lida: true,
    icone: Info,
    cor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    tipo: "transacao",
    titulo: "Transferência processada",
    descricao: "Sua transferência de R$ 890,50 foi processada",
    tempo: "2 horas atrás",
    lida: true,
    icone: CheckCircle,
    cor: "text-green-600",
    bg: "bg-green-50",
  },
]

const TABS = [
  { value: "todas", label: "Todas" },
  { value: "nao-lidas", label: "Não lidas" },
  { value: "transacoes", label: "Transações" },
  { value: "seguranca", label: "Segurança" },
  { value: "sistema", label: "Sistema" },
]

export function NotificacoesPage() {
  const [notificacoesList, setNotificacoesList] = useState(notificacoes)
  const [filtro, setFiltro] = useState("todas")
  const isMobile = useIsMobile()

  const marcarComoLida = (id: number) => {
    setNotificacoesList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, lida: true } : notif)))
  }

  const removerNotificacao = (id: number) => {
    setNotificacoesList((prev) => prev.filter((notif) => notif.id !== id))
  }

  const marcarTodasComoLidas = () => {
    setNotificacoesList((prev) => prev.map((notif) => ({ ...notif, lida: true })))
  }

  const notificacoesFiltradas = notificacoesList.filter((notif) => {
    if (filtro === "nao-lidas") return !notif.lida
    if (filtro === "transacoes") return notif.tipo === "transacao"
    if (filtro === "seguranca") return notif.tipo === "seguranca"
    if (filtro === "sistema") return notif.tipo === "sistema"
    return true
  })

  const naoLidas = notificacoesList.filter((n) => !n.lida).length

  return (
    <PageLayout title="Notificações" description="Acompanhe todas as atualizações importantes">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {naoLidas} não lidas
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={marcarTodasComoLidas} size="sm">
            Marcar todas como lidas
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      <Tabs value={filtro} onValueChange={setFiltro} className="w-full">
        {isMobile ? (
          <Select value={filtro} onValueChange={setFiltro}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por..." />
            </SelectTrigger>
            <SelectContent>
              {TABS.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        <TabsContent value={filtro}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {notificacoesFiltradas.map((notificacao) => {
                  const IconeNotificacao = notificacao.icone
                  return (
                    <div
                      key={notificacao.id}
                      className={`p-6 group hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                        !notificacao.lida ? "bg-blue-50/30 border-l-4 border-blue-500" : ""
                      }`}
                      onClick={() => marcarComoLida(notificacao.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full ${notificacao.bg} flex items-center justify-center flex-shrink-0`}
                        >
                          <IconeNotificacao className={`w-6 h-6 ${notificacao.cor}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3
                                className={`text-sm font-medium ${!notificacao.lida ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notificacao.titulo}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">{notificacao.descricao}</p>
                              <p className="text-xs text-gray-500 mt-2">{notificacao.tempo}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {!notificacao.lida && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removerNotificacao(notificacao.id)
                                }}
                                className="opacity-0 h-7 w-7 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {notificacoesFiltradas.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma notificação encontrada</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
