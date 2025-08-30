"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Camera, Trophy, Target, Gift, Star } from "lucide-react"
import { useState } from "react"

const recompensas = [
  {
    id: 1,
    titulo: "Primeiro Pagamento",
    descricao: "Realize seu primeiro pagamento PIX",
    pontos: 100,
    concluida: true,
    icone: Target,
  },
  {
    id: 2,
    titulo: "Volume Mensal",
    descricao: "Processe R$ 10.000 em um mês",
    pontos: 500,
    concluida: true,
    icone: Trophy,
  },
  {
    id: 3,
    titulo: "Usuário Ativo",
    descricao: "Use a plataforma por 30 dias consecutivos",
    pontos: 300,
    concluida: false,
    progresso: 75,
    icone: Star,
  },
  {
    id: 4,
    titulo: "Grande Volume",
    descricao: "Processe R$ 100.000 em transações",
    pontos: 1000,
    concluida: false,
    progresso: 42,
    icone: Gift,
  },
]

export function ContaPage() {
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "João Silva",
    email: "joao.silva@exemplo.com",
    telefone: "(11) 99999-9999",
    empresa: "Empresa Exemplo Ltda",
  })

  const faturamentoBruto = 425000
  const metaFaturamento = 500000
  const progressoFaturamento = (faturamentoBruto / metaFaturamento) * 100

  const pontosTotal = 1250
  const proximaRecompensa = 1500

  return (
    <PageLayout title="Minha Conta" description="Gerencie suas informações pessoais e acompanhe suas recompensas">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações Pessoais */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informações Pessoais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-transparent"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{dadosUsuario.nome}</h3>
                  <p className="text-gray-600">{dadosUsuario.email}</p>
                  <Badge variant="secondary" className="mt-1">
                    Conta Verificada
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={dadosUsuario.nome}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={dadosUsuario.email}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={dadosUsuario.telefone}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, telefone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    value={dadosUsuario.empresa}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, empresa: e.target.value })}
                  />
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Salvar Alterações</Button>
            </CardContent>
          </Card>

          {/* Faturamento */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Faturamento Bruto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">R$ {faturamentoBruto.toLocaleString("pt-BR")}</p>
                  <p className="text-sm text-gray-600">Meta: R$ {metaFaturamento.toLocaleString("pt-BR")}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">{progressoFaturamento.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">da meta</p>
                </div>
              </div>

              <Progress value={progressoFaturamento} className="h-3" />

              <p className="text-sm text-gray-600">
                Faltam R$ {(metaFaturamento - faturamentoBruto).toLocaleString("pt-BR")} para atingir sua meta mensal
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sistema de Recompensas */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Recompensas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{pontosTotal}</p>
                <p className="text-sm text-gray-600">Pontos Acumulados</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Próxima recompensa</span>
                  <span>{proximaRecompensa - pontosTotal} pontos</span>
                </div>
                <Progress value={(pontosTotal / proximaRecompensa) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recompensas.map((recompensa) => {
                const IconeRecompensa = recompensa.icone
                return (
                  <div
                    key={recompensa.id}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      recompensa.concluida ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          recompensa.concluida ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <IconeRecompensa className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{recompensa.titulo}</h4>
                          <Badge variant={recompensa.concluida ? "default" : "secondary"} className="text-xs">
                            {recompensa.pontos} pts
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{recompensa.descricao}</p>

                        {!recompensa.concluida && recompensa.progresso && (
                          <div className="space-y-1">
                            <Progress value={recompensa.progresso} className="h-1" />
                            <p className="text-xs text-gray-500">{recompensa.progresso}% concluído</p>
                          </div>
                        )}

                        {recompensa.concluida && (
                          <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                            ✓ Concluída
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
