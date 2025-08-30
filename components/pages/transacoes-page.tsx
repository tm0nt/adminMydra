"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Download,
  ArrowUpRight,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Copy,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"

const transacoes = [
  {
    id: "TXN001",
    descricao: "Pagamento PIX recebido",
    valor: "R$ 2.450,00",
    status: "completed",
    tipo: "credit",
    cpfCnpj: "123.456.789-00",
    endToEnd: "E12345678202312151234567890123456",
    data: "15/12/2023 14:30",
    taxa: "R$ 12,25",
    valorLiquido: "R$ 2.437,75",
    banco: "Banco do Brasil",
    agencia: "1234-5",
    conta: "67890-1",
    nomePortador: "João Silva Santos",
    chavePixOrigem: "joao.silva@email.com",
    chavePixDestino: "empresa@apexpayments.com",
    descricaoCompleta: "Pagamento de fatura referente ao pedido #12345",
  },
  {
    id: "TXN002",
    descricao: "Transferência enviada",
    valor: "R$ 890,50",
    status: "pending",
    tipo: "debit",
    cpfCnpj: "987.654.321-00",
    endToEnd: "E98765432202312151234567890123456",
    data: "15/12/2023 13:15",
    taxa: "R$ 4,45",
    valorLiquido: "R$ 886,05",
    banco: "Itaú",
    agencia: "5678-9",
    conta: "12345-6",
    nomePortador: "Maria Santos Silva",
    chavePixOrigem: "empresa@apexpayments.com",
    chavePixDestino: "+55 11 99999-9999",
    descricaoCompleta: "Transferência para fornecedor - Nota Fiscal 456",
  },
  {
    id: "TXN003",
    descricao: "Pagamento boleto",
    valor: "R$ 1.200,00",
    status: "processing",
    tipo: "debit",
    cpfCnpj: "11.222.333/0001-44",
    endToEnd: "E11223344202312151234567890123456",
    data: "15/12/2023 12:00",
    taxa: "R$ 6,00",
    valorLiquido: "R$ 1.194,00",
    banco: "Santander",
    agencia: "9876-5",
    conta: "54321-0",
    nomePortador: "Empresa ABC Ltda",
    chavePixOrigem: "empresa@apexpayments.com",
    chavePixDestino: "11.222.333/0001-44",
    descricaoCompleta: "Pagamento de boleto bancário - Vencimento 15/12/2023",
  },
]

const statusConfig = {
  completed: { label: "Concluído", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "Processando", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  failed: { label: "Falhou", color: "bg-red-100 text-red-700", icon: X },
}

export function TransacoesPage() {
  const [filtros, setFiltros] = useState({
    busca: "",
    status: "all",
    tipo: "all",
  })
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<any>(null)
  const [modalAberto, setModalAberto] = useState(false)

  const transacoesFiltradas = transacoes.filter((transacao) => {
    const matchBusca =
      transacao.id.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      transacao.cpfCnpj.includes(filtros.busca) ||
      transacao.endToEnd.toLowerCase().includes(filtros.busca.toLowerCase())

    const matchStatus = filtros.status === "all" || transacao.status === filtros.status
    const matchTipo = filtros.tipo === "all" || transacao.tipo === filtros.tipo

    return matchBusca && matchStatus && matchTipo
  })

  const abrirModal = (transacao: any) => {
    setTransacaoSelecionada(transacao)
    setModalAberto(true)
  }

  const copiarTexto = (texto: string) => {
    navigator.clipboard.writeText(texto)
  }

  return (
    <PageLayout title="Transações" description="Histórico completo de todas as transações">
      {/* Filtros Modernos */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por ID, CPF/CNPJ ou End-to-End..."
                value={filtros.busca}
                onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                className="pl-10 border-0 bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>

            <Select value={filtros.status} onValueChange={(value) => setFiltros({ ...filtros, status: value })}>
              <SelectTrigger className="w-full md:w-48 border-0 bg-gray-50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtros.tipo} onValueChange={(value) => setFiltros({ ...filtros, tipo: value })}>
              <SelectTrigger className="w-full md:w-48 border-0 bg-gray-50">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="credit">Entrada</SelectItem>
                <SelectItem value="debit">Saída</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-0 bg-gray-50 hover:bg-gray-100">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela Moderna */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Transações ({transacoesFiltradas.length})</CardTitle>
            <Button variant="outline" size="sm" className="border-0 bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600 text-sm">Transação</th>
                  <th className="text-left p-4 font-medium text-gray-600 text-sm">Valor</th>
                  <th className="text-left p-4 font-medium text-gray-600 text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600 text-sm">Data</th>
                  <th className="text-left p-4 font-medium text-gray-600 text-sm">CPF/CNPJ</th>
                  <th className="text-right p-4 font-medium text-gray-600 text-sm">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transacoesFiltradas.map((transacao) => {
                  const statusInfo = statusConfig[transacao.status as keyof typeof statusConfig]
                  const StatusIcon = statusInfo.icon

                  return (
                    <tr
                      key={transacao.id}
                      className="hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                      onClick={() => abrirModal(transacao)}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              transacao.tipo === "credit" ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            <ArrowUpRight
                              className={`w-5 h-5 ${
                                transacao.tipo === "credit" ? "text-green-600 rotate-0" : "text-red-600 rotate-180"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transacao.descricao}</p>
                            <p className="text-sm text-gray-500">{transacao.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p
                          className={`font-semibold ${transacao.tipo === "credit" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transacao.tipo === "credit" ? "+" : "-"}
                          {transacao.valor}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className={`${statusInfo.color} border-0`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-900">{transacao.data}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-900 font-mono">{transacao.cpfCnpj}</p>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            abrirModal(transacao)
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {transacoesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma transação encontrada com os filtros aplicados.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>Detalhes da Transação</span>
              <Badge variant="secondary" className="text-xs">
                {transacaoSelecionada?.id}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {transacaoSelecionada && (
            <div className="space-y-6">
              {/* Status e Valor */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    variant="secondary"
                    className={statusConfig[transacaoSelecionada.status as keyof typeof statusConfig].color}
                  >
                    {statusConfig[transacaoSelecionada.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Valor</p>
                  <p
                    className={`text-2xl font-bold ${
                      transacaoSelecionada.tipo === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transacaoSelecionada.tipo === "credit" ? "+" : "-"}
                    {transacaoSelecionada.valor}
                  </p>
                </div>
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Data e Hora</p>
                  <p className="text-sm text-gray-900">{transacaoSelecionada.data}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Tipo</p>
                  <p className="text-sm text-gray-900">
                    {transacaoSelecionada.tipo === "credit" ? "Entrada" : "Saída"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Taxa</p>
                  <p className="text-sm text-gray-900">{transacaoSelecionada.taxa}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Valor Líquido</p>
                  <p className="text-sm text-gray-900 font-semibold">{transacaoSelecionada.valorLiquido}</p>
                </div>
              </div>

              {/* Informações Bancárias */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Informações Bancárias</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Banco</p>
                    <p className="text-sm text-gray-900">{transacaoSelecionada.banco}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Nome do Portador</p>
                    <p className="text-sm text-gray-900">{transacaoSelecionada.nomePortador}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Agência</p>
                    <p className="text-sm text-gray-900 font-mono">{transacaoSelecionada.agencia}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Conta</p>
                    <p className="text-sm text-gray-900 font-mono">{transacaoSelecionada.conta}</p>
                  </div>
                </div>
              </div>

              {/* Informações PIX */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Informações PIX</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Chave PIX Origem</p>
                      <p className="text-sm text-gray-900 font-mono">{transacaoSelecionada.chavePixOrigem}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copiarTexto(transacaoSelecionada.chavePixOrigem)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Chave PIX Destino</p>
                      <p className="text-sm text-gray-900 font-mono">{transacaoSelecionada.chavePixDestino}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copiarTexto(transacaoSelecionada.chavePixDestino)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-600">End-to-End</p>
                      <p className="text-sm text-gray-900 font-mono">{transacaoSelecionada.endToEnd}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copiarTexto(transacaoSelecionada.endToEnd)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Descrição Completa */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Descrição</h3>
                <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                  {transacaoSelecionada.descricaoCompleta}
                </p>
              </div>

              {/* Ações */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Detalhes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}
