"use client"

import * as React from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { DEFAULT_PALETTE_ID, getPalette, palettes, type Mode, type Palette } from "./palettes"

const STORAGE_KEY = "smartdrive:palette-id"

type ThemePaletteContextValue = {
  palette: Palette
  paletteId: string
  setPaletteId: (id: string) => void
  palettes: Palette[]
  mode: Mode
}

const ThemePaletteContext = createContext<ThemePaletteContextValue | null>(null)

/**
 * Apply a palette to the document root by setting CSS custom properties as inline styles.
 * Inline style on :root takes precedence over the values declared in globals.css, so the
 * entire app (sidebar, header, cards, charts, badges...) re-themes instantly.
 */
function applyPaletteVars(palette: Palette, mode: Mode) {
  if (typeof document === "undefined") return
  const c = palette[mode]
  const root = document.documentElement

  // Sidebar: keep sidebar visually "stronger" than surface in both modes.
  // Light mode -> use foreground (deep) as sidebar bg with light text.
  // Dark mode  -> use surface (already dark) as sidebar bg with regular fg text.
  const sidebarBg = mode === "light" ? c.fg : c.surface
  const sidebarFg = mode === "light" ? c.bg : c.fg

  const tokens: Record<string, string> = {
    // Base surfaces
    "--background": c.bg,
    "--foreground": c.fg,
    "--card": c.surface,
    "--card-foreground": c.fg,
    "--popover": c.surface,
    "--popover-foreground": c.fg,

    // Brand
    "--primary": c.primary,
    "--primary-foreground": c.primaryFg,
    "--accent": c.accent,
    "--accent-foreground": c.accentFg,

    // Secondary / muted derived via color-mix for subtle separation from surface
    "--secondary": `color-mix(in oklab, ${c.surface} 88%, ${c.fg})`,
    "--secondary-foreground": c.fg,
    "--muted": `color-mix(in oklab, ${c.bg} 86%, ${c.fg})`,
    "--muted-foreground": c.muted,

    // Lines / focus
    "--border": c.border,
    "--input": c.border,
    "--ring": c.primary,

    // Sidebar tokens (used by sidebar.tsx)
    "--sidebar": sidebarBg,
    "--sidebar-foreground": sidebarFg,
    "--sidebar-primary": c.accent,
    "--sidebar-primary-foreground": c.accentFg,
    "--sidebar-accent": `color-mix(in oklab, ${sidebarBg} 84%, ${sidebarFg})`,
    "--sidebar-accent-foreground": sidebarFg,
    "--sidebar-border": `color-mix(in oklab, ${sidebarBg} 80%, ${sidebarFg})`,
    "--sidebar-ring": c.primary,

    // Chart palette derived from primary + accent for visual cohesion
    "--chart-1": c.primary,
    "--chart-2": c.accent,
    "--chart-3": `color-mix(in oklab, ${c.primary} 55%, ${c.accent})`,
    "--chart-4": `color-mix(in oklab, ${c.primary} 65%, ${c.fg})`,
    "--chart-5": `color-mix(in oklab, ${c.accent} 60%, ${c.fg})`,
  }

  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(key, value)
  }
}

export function ThemePaletteProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, theme } = useTheme()
  const [paletteId, setPaletteIdState] = useState<string>(DEFAULT_PALETTE_ID)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && palettes.some((p) => p.id === stored)) {
      setPaletteIdState(stored)
    }
    setHydrated(true)
  }, [])

  // Resolve current mode (default to light during SSR / before next-themes hydrates)
  const mode: Mode = (resolvedTheme ?? theme) === "dark" ? "dark" : "light"

  const palette = getPalette(paletteId)

  // Apply CSS variables whenever palette or mode changes
  useEffect(() => {
    if (!hydrated) return
    applyPaletteVars(palette, mode)
  }, [palette, mode, hydrated])

  const setPaletteId = useCallback((id: string) => {
    setPaletteIdState(id)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, id)
    }
  }, [])

  const value = React.useMemo(
    () => ({ palette, paletteId, setPaletteId, palettes, mode }),
    [palette, paletteId, setPaletteId, mode],
  )

  return <ThemePaletteContext.Provider value={value}>{children}</ThemePaletteContext.Provider>
}

export function useThemePalette() {
  const ctx = useContext(ThemePaletteContext)
  if (!ctx) {
    throw new Error("useThemePalette must be used within ThemePaletteProvider")
  }
  return ctx
}
