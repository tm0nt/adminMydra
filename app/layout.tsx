import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ApexPayments - Dashboard de Pagamentos",
  description: "Plataforma completa de pagamentos digitais com controle total das suas transações financeiras",
  keywords: "pagamentos, fintech, transações, dashboard financeiro, ApexPayments",
  authors: [{ name: "ApexPayments" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "ApexPayments - Dashboard de Pagamentos",
    description: "Plataforma completa de pagamentos digitais com controle total das suas transações financeiras",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
