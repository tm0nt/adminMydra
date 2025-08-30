"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, QrCode, Copy, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-is-mobile"

const TABS = [
  { value: "enviar", label: "Enviar", icon: Send },
  { value: "receber", label: "Receber", icon: QrCode },
]

export function CarteiraPage() {
  const [activeTab, setActiveTab] = useState("enviar")
  const [pixData, setPixData] = useState({
    chave: "",
    valor: "",
    descricao: "",
  })
  const [qrCodeData, setQrCodeData] = useState("")
  const isMobile = useIsMobile()

  const handleEnviarPix = () => {
    console.log("Enviando PIX:", pixData)
  }

  const handleGerarQRCode = () => {
    const qrData = `PIX|${pixData.chave}|${pixData.valor}|${pixData.descricao}`
    setQrCodeData(qrData)
  }

  return (
    <PageLayout title="Carteira" description="Envie e receba pagamentos PIX">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Saldo */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-2">Saldo Disponível</p>
                  <p className="text-3xl font-bold">R$ 42.500,00</p>
                  <p className="text-blue-100 text-sm mt-1">Atualizado agora</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Wallet className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PIX */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">PIX</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {isMobile ? (
                  <Select value={activeTab} onValueChange={setActiveTab}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma ação" />
                    </SelectTrigger>
                    <SelectContent>
                      {TABS.map((tab) => (
                        <SelectItem key={tab.value} value={tab.value}>
                          <div className="flex items-center">
                            <tab.icon className="w-4 h-4 mr-2" />
                            {tab.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <TabsList>
                    {TABS.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value}>
                        <tab.icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                )}

                <TabsContent value="enviar" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chave">Chave PIX</Label>
                    <Input
                      id="chave"
                      placeholder="CPF, CNPJ, email, telefone ou chave aleatória"
                      value={pixData.chave}
                      onChange={(e) => setPixData({ ...pixData, chave: e.target.value })}
                      className="border-0 bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor</Label>
                    <Input
                      id="valor"
                      placeholder="R$ 0,00"
                      value={pixData.valor}
                      onChange={(e) => setPixData({ ...pixData, valor: e.target.value })}
                      className="border-0 bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição (opcional)</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descrição do pagamento"
                      value={pixData.descricao}
                      onChange={(e) => setPixData({ ...pixData, descricao: e.target.value })}
                      className="border-0 bg-gray-50"
                    />
                  </div>

                  <Button
                    onClick={handleEnviarPix}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar PIX
                  </Button>
                </TabsContent>

                <TabsContent value="receber" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="valor-receber">Valor a receber</Label>
                    <Input
                      id="valor-receber"
                      placeholder="R$ 0,00"
                      value={pixData.valor}
                      onChange={(e) => setPixData({ ...pixData, valor: e.target.value })}
                      className="border-0 bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao-receber">Descrição (opcional)</Label>
                    <Textarea
                      id="descricao-receber"
                      placeholder="Descrição do pagamento"
                      value={pixData.descricao}
                      onChange={(e) => setPixData({ ...pixData, descricao: e.target.value })}
                      className="border-0 bg-gray-50"
                    />
                  </div>

                  <Button
                    onClick={handleGerarQRCode}
                    variant="outline"
                    className="w-full border-0 bg-gray-50 hover:bg-gray-100"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Gerar QR Code
                  </Button>

                  {qrCodeData && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl text-center">
                      <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">QR Code gerado</p>
                      <Button variant="outline" size="sm" className="border-0 bg-white">
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar código
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Transações Recentes */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Últimas Transações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { tipo: "credit", valor: "R$ 1.200,00", descricao: "PIX recebido", tempo: "2 min" },
                { tipo: "debit", valor: "R$ 450,00", descricao: "PIX enviado", tempo: "15 min" },
                { tipo: "credit", valor: "R$ 2.800,00", descricao: "TED recebida", tempo: "1h" },
              ].map((transacao, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transacao.tipo === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {transacao.tipo === "credit" ? (
                      <ArrowDownRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{transacao.descricao}</p>
                    <p className="text-xs text-gray-500">{transacao.tempo} atrás</p>
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      transacao.tipo === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transacao.tipo === "credit" ? "+" : "-"}
                    {transacao.valor}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
