import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemePaletteProvider } from "@/lib/theme-palette-context"
import { TabsProvider } from "@/lib/tabs-context"
import { SidebarProvider } from "@/lib/sidebar-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { TabsBar } from "@/components/dashboard/tabs-bar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <ThemePaletteProvider>
        <SidebarProvider>
          <TabsProvider>
            <div className="flex min-h-svh bg-background">
              <DashboardSidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />
                <TabsBar />
                <DashboardContent>{children}</DashboardContent>
              </div>
            </div>
          </TabsProvider>
        </SidebarProvider>
      </ThemePaletteProvider>
    </ThemeProvider>
  )
}
