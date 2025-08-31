"use client"

import { useSession } from "next-auth/react"
import { PageLayout } from "@/components/layout/page-layout"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <PageLayout>
      <Dashboard />
    </PageLayout>
  )
}
