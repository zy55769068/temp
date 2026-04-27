"use client"

import * as React from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const COLLAPSED_KEY = "smartdrive:sidebar-collapsed"
const SECTIONS_KEY = "smartdrive:sidebar-sections"

type SidebarContextValue = {
  collapsed: boolean
  toggle: () => void
  setCollapsed: (v: boolean) => void
  isSectionOpen: (title: string) => boolean
  toggleSection: (title: string) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = useState(false)
  const [closedSections, setClosedSections] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const c = window.localStorage.getItem(COLLAPSED_KEY)
      if (c === "1") setCollapsedState(true)
      const s = window.localStorage.getItem(SECTIONS_KEY)
      if (s) {
        const arr = JSON.parse(s) as string[]
        if (Array.isArray(arr)) setClosedSections(new Set(arr))
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (typeof window === "undefined") return
    window.localStorage.setItem(COLLAPSED_KEY, collapsed ? "1" : "0")
  }, [collapsed, hydrated])

  useEffect(() => {
    if (!hydrated) return
    if (typeof window === "undefined") return
    window.localStorage.setItem(SECTIONS_KEY, JSON.stringify(Array.from(closedSections)))
  }, [closedSections, hydrated])

  const toggle = useCallback(() => setCollapsedState((c) => !c), [])
  const setCollapsed = useCallback((v: boolean) => setCollapsedState(v), [])

  const isSectionOpen = useCallback(
    (title: string) => !closedSections.has(title),
    [closedSections],
  )

  const toggleSection = useCallback((title: string) => {
    setClosedSections((current) => {
      const next = new Set(current)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }, [])

  const value: SidebarContextValue = {
    collapsed,
    toggle,
    setCollapsed,
    isSectionOpen,
    toggleSection,
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider")
  return ctx
}
