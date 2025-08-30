"use client"

import type React from "react"

import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RefreshCw, Upload, FileText, Clock, CheckCircle, X, MessageSquare } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-is-mobile"

const reembolsos = [
  {
    id: "REF001",
    transacaoId: "TXN001",
    valor: "R$ 2.450,00",
    motivo: "Produto não entregue",
    status: "pendente",
    data: "15/12/2023 14:30",
    cliente: "João Silva",
    descricao: "Cliente relata que o produto não foi entregue no prazo acordado",
    defesa: null,
    arquivos: [],
  },
  {
    id: "REF002",
    transacaoId: "TXN002",
    valor: "R$ 890,50",
    motivo: "Cobrança duplicada",
    status: "em-analise",
    data: "14/12/2023 09:15",
    cliente: "Maria Santos",
    descricao: "Cliente foi cobrado duas vezes pela mesma compra",
    defesa: "Verificamos que houve um erro no sistema. Estamos processando o estorno.",
    arquivos: ["comprovante.pdf"],
  },
  {
    id: "REF003",
    transacaoId: "TXN003",
    valor: "R$ 1.200,00",
    motivo: "Produto defeituoso",
    status: "aprovado",
    data: "13/12/2023 16:45",
    cliente: "Pedro Costa",
    descricao: "Produto apresentou defeito após 2 dias de uso",
    defesa: "Produto estava dentro da garantia. Reembolso aprovado.",
    arquivos: ["laudo_tecnico.pdf", "fotos_produto.zip"],
  },
  {
    id: "REF004",
    transacaoId: "TXN004",
    valor: "R$ 750,00",
    motivo: "Cancelamento de serviço",
    status: "rejeitado",
    data: "12/12/2023 11:20",
    cliente: "Ana Lima",
    descricao: "Cliente cancelou serviço após prazo permitido",
    defesa: "Serviço foi prestado conforme contrato. Cancelamento fora do prazo.",
    arquivos: ["contrato.pdf", "comprovante_servico.pdf"],
  },
]

const statusConfig = {
  pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  "em-analise": { label: "Em Análise", color: "bg-blue-100 text-blue-700", icon: MessageSquare },
  aprovado: { label: "Aprovado", color: "bg-green-100 text-green-700", icon: CheckCircle },
  rejeitado: { label: "Rejeitado", color: "bg-red-100 text-red-700", icon: X },
}

const TABS = [
  { value: "todos", label: "Todos" },
  { value: "pendentes", label: "Pendentes" },
  { value: "em-analise", label: "Em Análise" },
  { value: "aprovados", label: "Aprovados" },
  { value: "rejeitados", label: "Rejeitados" },
]

export function InfracoesPage() {
  const [activeTab, setActiveTab] = useState("todos")
  const [defesa, setDefesa] = useState("")
  const [arquivos, setArquivos] = useState<File[]>([])
  const [reembolsoSelecionado, setReembolsoSelecionado] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const handleSubmitDefesa = (reembolsoId: string) => {
    console.log("Enviando defesa para:", reembolsoId, { defesa, arquivos })
    setDefesa("")
    setArquivos([])
    setReembolsoSelecionado(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setArquivos((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setArquivos((prev) => prev.filter((_, i) => i !== index))
  }

  const pendentes = reembolsos.filter((r) => r.status === "pendente").length
  const emAnalise = reembolsos.filter((r) => r.status === "em-analise").length
  const aprovados = reembolsos.filter((r) => r.status === "aprovado").length
  const rejeitados = reembolsos.filter((r) => r.status === "rejeitado").length

  const renderReembolsoList = (list: typeof reembolsos) => (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {list.map((reembolso) => {
            const statusInfo = statusConfig[reembolso.status as keyof typeof statusConfig]
            const StatusIcon = statusInfo.icon

            return (
              <div key={reembolso.id} className="p-4 md:p-6 hover:bg-gray-50 transition-all duration-200">
                <div className="flex flex-col md:flex-row items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex-shrink-0 items-center justify-center hidden md:flex">
                      <RefreshCw className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">{reembolso.motivo}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {reembolso.id}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{reembolso.descricao}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span>Cliente: {reembolso.cliente}</span>
                        <span className="hidden md:inline">•</span>
                        <span>{reembolso.data}</span>
                        <span className="hidden md:inline">•</span>
                        <span>Transação: {reembolso.transacaoId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right space-y-2 mt-4 md:mt-0 w-full md:w-auto">
                    <p className="text-lg font-semibold text-gray-900">{reembolso.valor}</p>
                    <Badge variant="secondary" className={statusInfo.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>

                {reembolso.defesa && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">Sua Defesa:</h4>
                    <p className="text-sm text-gray-700">{reembolso.defesa}</p>
                    {reembolso.arquivos.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {reembolso.arquivos.map((arquivo, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {arquivo}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReembolsoSelecionado(reembolso.id)}
                        disabled={reembolso.status === "aprovado" || reembolso.status === "rejeitado"}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {reembolso.defesa ? "Editar Defesa" : "Enviar Defesa"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Defesa para Reembolso {reembolso.id}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">Detalhes da Solicitação:</h4>
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Motivo:</strong> {reembolso.motivo}
                          </p>
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Valor:</strong> {reembolso.valor}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Descrição:</strong> {reembolso.descricao}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="defesa">Sua Defesa</Label>
                          <Textarea
                            id="defesa"
                            placeholder="Descreva sua defesa detalhadamente..."
                            value={defesa}
                            onChange={(e) => setDefesa(e.target.value)}
                            rows={6}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="arquivos">Anexar Documentos</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">
                              Clique para selecionar arquivos ou arraste aqui
                            </p>
                            <Input
                              type="file"
                              multiple
                              onChange={handleFileUpload}
                              className="hidden"
                              id="file-upload"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById("file-upload")?.click()}
                            >
                              Selecionar Arquivos
                            </Button>
                          </div>

                          {arquivos.length > 0 && (
                            <div className="space-y-2">
                              <Label>Arquivos Selecionados:</Label>
                              {arquivos.map((arquivo, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <span className="text-sm">{arquivo.name}</span>
                                  <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancelar</Button>
                          <Button onClick={() => handleSubmitDefesa(reembolso.id)} disabled={!defesa.trim()}>
                            Enviar Defesa
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <PageLayout title="Reembolsos" description="Gerencie solicitações de reembolso e envie suas defesas">
      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{pendentes}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Análise</p>
                <p className="text-2xl font-bold text-blue-600">{emAnalise}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-green-600">{aprovados}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejeitados</p>
                <p className="text-2xl font-bold text-red-600">{rejeitados}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <X className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Reembolsos */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isMobile ? (
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full mt-6">
              <SelectValue placeholder="Filtrar por status" />
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

        <TabsContent value="todos">{renderReembolsoList(reembolsos)}</TabsContent>
        <TabsContent value="pendentes">
          {renderReembolsoList(reembolsos.filter((r) => r.status === "pendente"))}
        </TabsContent>
        <TabsContent value="em-analise">
          {renderReembolsoList(reembolsos.filter((r) => r.status === "em-analise"))}
        </TabsContent>
        <TabsContent value="aprovados">
          {renderReembolsoList(reembolsos.filter((r) => r.status === "aprovado"))}
        </TabsContent>
        <TabsContent value="rejeitados">
          {renderReembolsoList(reembolsos.filter((r) => r.status === "rejeitado"))}
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
