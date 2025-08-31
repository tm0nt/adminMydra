"use client"

import { useSession } from "next-auth/react"
import { PageLayout } from "@/components/layout/page-layout"
import { ConfiguracoesPage } from "@/components/pages/configuracoes-page"

export default function Configuracoes() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <PageLayout>
      <ConfiguracoesPage />
    </PageLayout>
  )
}
