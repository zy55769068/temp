"use client"

import * as React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import { LayoutDashboard } from "lucide-react"
import { findNavMeta } from "./navigation"

const STORAGE_KEY = "smartdrive:open-tabs"

export type OpenTab = {
  href: string
  title: string
  iconName?: string // serializable: we keep icon name; component maps back via navigation lookup
  closable: boolean
}

export type ResolvedTab = OpenTab & { icon?: LucideIcon }

type TabsContextValue = {
  tabs: ResolvedTab[]
  activeHref: string
  open: (href: string) => void
  switchTo: (href: string) => void
  close: (href: string) => void
  closeOthers: (href: string) => void
  closeRight: (href: string) => void
  closeAll: () => void
  refresh: (href: string) => void
  refreshKey: number
}

const HOME_TAB: OpenTab = {
  href: "/",
  title: "工作台",
  iconName: "LayoutDashboard",
  closable: false,
}

const TabsContext = createContext<TabsContextValue | null>(null)

function resolveTab(tab: OpenTab): ResolvedTab {
  const meta = findNavMeta(tab.href)
  const icon =
    meta?.item.icon ??
    (tab.href === "/" ? LayoutDashboard : undefined)
  return { ...tab, icon }
}

function deriveTabFromPathname(pathname: string): OpenTab {
  if (pathname === "/") return HOME_TAB
  const meta = findNavMeta(pathname)
  if (meta) {
    return {
      href: pathname,
      title: meta.item.title,
      closable: true,
    }
  }
  return {
    href: pathname,
    title: pathname,
    closable: true,
  }
}

export function TabsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [tabs, setTabs] = useState<OpenTab[]>([HOME_TAB])
  const [hydrated, setHydrated] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as OpenTab[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Always ensure home tab is first
          const withoutHome = parsed.filter((t) => t.href !== "/")
          setTabs([HOME_TAB, ...withoutHome])
        }
      }
    } catch {
      // ignore parsing errors
    }
    setHydrated(true)
  }, [])

  // Persist on change
  useEffect(() => {
    if (!hydrated) return
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs))
  }, [tabs, hydrated])

  // Auto-open tab when pathname changes (e.g., navigation via sidebar)
  useEffect(() => {
    if (!pathname) return
    setTabs((current) => {
      if (current.some((t) => t.href === pathname)) return current
      const newTab = deriveTabFromPathname(pathname)
      return [...current, newTab]
    })
  }, [pathname])

  const open = useCallback(
    (href: string) => {
      router.push(href)
    },
    [router],
  )

  const switchTo = useCallback(
    (href: string) => {
      router.push(href)
    },
    [router],
  )

  const close = useCallback(
    (href: string) => {
      setTabs((current) => {
        const target = current.find((t) => t.href === href)
        if (!target || !target.closable) return current
        const idx = current.findIndex((t) => t.href === href)
        const next = current.filter((t) => t.href !== href)

        // If closing the active tab, navigate to neighbour
        if (pathname === href) {
          const fallback = next[idx - 1] ?? next[idx] ?? next[0] ?? HOME_TAB
          // schedule navigation after state update
          queueMicrotask(() => router.push(fallback.href))
        }
        return next
      })
    },
    [pathname, router],
  )

  const closeOthers = useCallback(
    (href: string) => {
      setTabs((current) => {
        const keep = current.filter((t) => t.href === href || !t.closable)
        if (pathname !== href) {
          queueMicrotask(() => router.push(href))
        }
        return keep
      })
    },
    [pathname, router],
  )

  const closeRight = useCallback(
    (href: string) => {
      setTabs((current) => {
        const idx = current.findIndex((t) => t.href === href)
        if (idx < 0) return current
        const left = current.slice(0, idx + 1)
        const rightKept = current.slice(idx + 1).filter((t) => !t.closable)
        const next = [...left, ...rightKept]
        // If active was in removed range, jump to current href
        if (!next.some((t) => t.href === pathname)) {
          queueMicrotask(() => router.push(href))
        }
        return next
      })
    },
    [pathname, router],
  )

  const closeAll = useCallback(() => {
    setTabs([HOME_TAB])
    if (pathname !== "/") {
      queueMicrotask(() => router.push("/"))
    }
  }, [pathname, router])

  const refresh = useCallback(
    (href: string) => {
      if (pathname === href) {
        setRefreshKey((k) => k + 1)
      } else {
        router.push(href)
      }
    },
    [pathname, router],
  )

  const resolvedTabs = useMemo(() => tabs.map(resolveTab), [tabs])

  const value: TabsContextValue = {
    tabs: resolvedTabs,
    activeHref: pathname ?? "/",
    open,
    switchTo,
    close,
    closeOthers,
    closeRight,
    closeAll,
    refresh,
    refreshKey,
  }

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

export function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error("useTabs must be used within TabsProvider")
  return ctx
}
