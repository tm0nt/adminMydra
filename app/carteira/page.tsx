"use client"

import { useSession } from "next-auth/react"
import { PageLayout } from "@/components/layout/page-layout"
import { CarteiraPage } from "@/components/pages/carteira-page"

export default function Carteira() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <PageLayout>
      <CarteiraPage />
    </PageLayout>
  )
}
