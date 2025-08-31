"use client"

import { useSession } from "next-auth/react"
import { PageLayout } from "@/components/layout/page-layout"
import { ContaPage } from "@/components/pages/conta-page"

export default function Conta() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <PageLayout>
      <ContaPage />
    </PageLayout>
  )
}
