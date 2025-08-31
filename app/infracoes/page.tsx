"use client"

import { useSession } from "next-auth/react"
import { PageLayout } from "@/components/layout/page-layout"
import { InfracoesPage } from "@/components/pages/infracoes-page"

export default function Infracoes() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <PageLayout>
      <InfracoesPage />
    </PageLayout>
  )
}
