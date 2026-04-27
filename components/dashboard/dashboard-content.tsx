"use client"

import type React from "react"
import { useTabs } from "@/lib/tabs-context"

/**
 * Wraps the page content. Re-keys when `refresh()` is called from the tabs bar
 * so the active page remounts (clearing its local state).
 */
export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { refreshKey, activeHref } = useTabs()
  return (
    <main key={`${activeHref}::${refreshKey}`} className="flex-1 min-w-0">
      {children}
    </main>
  )
}
