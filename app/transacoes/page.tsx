"use client"

import { useSession } from "next-auth/react"
import { PageLayout } from "@/components/layout/page-layout"
import { TransacoesPage } from "@/components/pages/transacoes-page"

export default function Transacoes() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <PageLayout>
      <TransacoesPage />
    </PageLayout>
  )
}
