import type { Metadata } from "next"
import { Noto_Sans_SC, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sc",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "智驰云 · 汽车经销商一体化管理平台",
  description: "面向汽车经销商集团的 ERP / CRM / DMS 一体化运营平台,覆盖财务、库存、销售、售后、客户与系统管理全流程。",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${notoSC.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
