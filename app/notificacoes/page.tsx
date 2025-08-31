"use client"

import { useSession } from "next-auth/react"
import { PageLayout } from "@/components/layout/page-layout"
import { NotificacoesPage } from "@/components/pages/notificacoes-page"

export default function Notificacoes() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <PageLayout>
      <NotificacoesPage />
    </PageLayout>
  )
}
