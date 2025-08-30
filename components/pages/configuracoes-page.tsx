"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Key, Webhook, Shield, Globe, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-is-mobile"

const TABS = [
  { value: "chaves", label: "Chaves de Acesso", icon: Key },
  { value: "webhook", label: "Webhook", icon: Webhook },
  { value: "tokens", label: "Tokens", icon: Shield },
  { value: "ips", label: "IPs Permitidos", icon: Globe },
]

export function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("chaves")
  const [showApiKey, setShowApiKey] = useState(false)
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [ipsPermitidos, setIpsPermitidos] = useState(["192.168.1.1", "203.45.67.89"])
  const [novoIp, setNovoIp] = useState("")
  const isMobile = useIsMobile()

  const adicionarIp = () => {
    if (novoIp && !ipsPermitidos.includes(novoIp)) {
      setIpsPermitidos([...ipsPermitidos, novoIp])
      setNovoIp("")
    }
  }

  const removerIp = (ip: string) => {
    setIpsPermitidos(ipsPermitidos.filter((i) => i !== ip))
  }

  return (
    <PageLayout title="Configurações" description="Gerencie suas configurações de API e segurança">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isMobile ? (
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Selecione uma seção" />
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
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        {/* Chaves de Acesso */}
        <TabsContent value="chaves">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5" />
                <span>Chaves de API</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave Pública (API Key)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value="pk_live_51234567890abcdef"
                    readOnly
                    className="font-mono border-0 bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="border-0 bg-gray-50"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="icon" className="border-0 bg-gray-50">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secret-key">Chave Secreta (Secret Key)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="secret-key"
                    type={showSecretKey ? "text" : "password"}
                    value="sk_live_51234567890abcdef"
                    readOnly
                    className="font-mono border-0 bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="border-0 bg-gray-50"
                  >
                    {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="icon" className="border-0 bg-gray-50">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="border-0 bg-gray-50">
                  Regenerar Chaves
                </Button>
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhook */}
        <TabsContent value="webhook">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Webhook className="w-5 h-5" />
                <span>Configurações de Webhook</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL do Webhook</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://sua-api.com/webhook"
                  defaultValue="https://api.exemplo.com/webhook/apex-payments"
                  className="border-0 bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Secret do Webhook</Label>
                <Input
                  id="webhook-secret"
                  placeholder="Chave secreta para validação"
                  defaultValue="whsec_1234567890abcdef"
                  className="border-0 bg-gray-50"
                />
              </div>

              <div className="space-y-4">
                <Label>Eventos para Notificar</Label>
                <div className="space-y-3">
                  {[
                    { id: "payment.completed", label: "Pagamento Concluído" },
                    { id: "payment.failed", label: "Pagamento Falhou" },
                    { id: "transfer.created", label: "Transferência Criada" },
                    { id: "account.updated", label: "Conta Atualizada" },
                  ].map((evento) => (
                    <div key={evento.id} className="flex items-center space-x-2">
                      <Switch id={evento.id} defaultChecked />
                      <Label htmlFor={evento.id}>{evento.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="border-0 bg-gray-50">
                  Testar Webhook
                </Button>
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tokens */}
        <TabsContent value="tokens">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Proteção por Token</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Token de Entrada</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="token-entrada" defaultChecked />
                    <Label htmlFor="token-entrada">Ativar proteção</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="token-entrada-valor">Token</Label>
                    <Input
                      id="token-entrada-valor"
                      placeholder="Token para requisições de entrada"
                      defaultValue="tk_in_1234567890abcdef"
                      className="border-0 bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Token de Saída</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="token-saida" defaultChecked />
                    <Label htmlFor="token-saida">Ativar proteção</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="token-saida-valor">Token</Label>
                    <Input
                      id="token-saida-valor"
                      placeholder="Token para requisições de saída"
                      defaultValue="tk_out_1234567890abcdef"
                      className="border-0 bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="border-0 bg-gray-50">
                  Regenerar Tokens
                </Button>
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IPs Permitidos */}
        <TabsContent value="ips">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>IPs Permitidos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-2">
                <Input
                  placeholder="192.168.1.1"
                  value={novoIp}
                  onChange={(e) => setNovoIp(e.target.value)}
                  className="border-0 bg-gray-50"
                />
                <Button onClick={adicionarIp}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>

              <div className="space-y-2">
                <Label>IPs Autorizados</Label>
                <div className="space-y-2">
                  {ipsPermitidos.map((ip, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-mono">{ip}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removerIp(ip)}
                        className="text-red-600 hover:text-red-700 border-0 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Importante:</strong> Apenas os IPs listados acima poderão acessar sua API. Certifique-se de
                  incluir todos os IPs necessários para evitar bloqueios.
                </p>
              </div>

              <Button>Salvar Lista de IPs</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
