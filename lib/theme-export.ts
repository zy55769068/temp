// 主题配色导出工具：将带 light + dark 两套色板的 Palette 转为可消费格式
// - 完整 JSON（含元数据 + 双模 Tokens）
// - Tailwind v4 @theme inline CSS（含 .dark 覆盖）
// - shadcn/ui CSS 变量（HSL 格式，:root + .dark）
// - Design Tokens JSON（Style Dictionary 风格，分 light/dark）

export type ExportSwatch = { name: string; role: string; hex: string; textHex?: string }

export type ExportPaletteMode = {
  primary: string
  primaryFg: string
  accent: string
  accentFg: string
  bg: string
  surface: string
  fg: string
  muted: string
  border: string
  swatches: ExportSwatch[]
}

export type ExportPalette = {
  id: string
  name: string
  tagline: string
  scenario: string
  vibe: string
  light: ExportPaletteMode
  dark: ExportPaletteMode
}

// 通用语义色（与预览中状态徽章保持一致）
const SEMANTIC = {
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0EA5E9",
} as const

// ---------- 颜色工具 ----------

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim()
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h
  const num = Number.parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [Math.round(h * 360), Math.round(s * 1000) / 10, Math.round(l * 1000) / 10]
}

export function hexToHslString(hex: string): string {
  const [h, s, l] = rgbToHsl(...hexToRgb(hex))
  return `${h} ${s}% ${l}%`
}

// ---------- 1. 完整 JSON（含 light + dark） ----------

function modeToJSON(m: ExportPaletteMode) {
  return {
    primary: { hex: m.primary, foreground: m.primaryFg },
    accent: { hex: m.accent, foreground: m.accentFg },
    background: { hex: m.bg },
    surface: { hex: m.surface },
    foreground: { hex: m.fg },
    muted: { hex: m.muted },
    border: { hex: m.border },
    swatches: m.swatches,
  }
}

function modeToTokens(m: ExportPaletteMode) {
  return {
    "color.brand.primary": m.primary,
    "color.brand.primary.foreground": m.primaryFg,
    "color.brand.accent": m.accent,
    "color.brand.accent.foreground": m.accentFg,
    "color.surface.background": m.bg,
    "color.surface.card": m.surface,
    "color.text.foreground": m.fg,
    "color.text.muted": m.muted,
    "color.border.default": m.border,
  }
}

export function paletteToJSON(p: ExportPalette) {
  return {
    $schema: "https://chiyun.platform/schemas/theme-palette.v2.json",
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    scenario: p.scenario,
    vibe: p.vibe,
    version: "2.0.0",
    exportedAt: new Date().toISOString(),
    modes: ["light", "dark"],
    colors: {
      light: modeToJSON(p.light),
      dark: modeToJSON(p.dark),
    },
    semantic: SEMANTIC,
    tokens: {
      light: { ...modeToTokens(p.light), "color.semantic": SEMANTIC },
      dark: { ...modeToTokens(p.dark), "color.semantic": SEMANTIC },
    },
  }
}

// ---------- 2. 全部配色合集 ----------

export function palettesToJSON(palettes: ExportPalette[]) {
  return {
    $schema: "https://chiyun.platform/schemas/theme-palette-bundle.v2.json",
    name: "智驰云平台推荐配色合集",
    version: "2.0.0",
    exportedAt: new Date().toISOString(),
    count: palettes.length,
    modes: ["light", "dark"],
    palettes: palettes.map(paletteToJSON),
  }
}

// ---------- 3. Tailwind v4 @theme inline + .dark 覆盖 ----------

function tailwindBlock(m: ExportPaletteMode, scope: "root" | "dark"): string {
  const indent = "  "
  const lines = [
    `${indent}--color-background: ${m.bg};`,
    `${indent}--color-foreground: ${m.fg};`,
    `${indent}--color-card: ${m.surface};`,
    `${indent}--color-card-foreground: ${m.fg};`,
    `${indent}--color-popover: ${m.surface};`,
    `${indent}--color-popover-foreground: ${m.fg};`,
    `${indent}--color-primary: ${m.primary};`,
    `${indent}--color-primary-foreground: ${m.primaryFg};`,
    `${indent}--color-secondary: ${m.surface};`,
    `${indent}--color-secondary-foreground: ${m.fg};`,
    `${indent}--color-accent: ${m.accent};`,
    `${indent}--color-accent-foreground: ${m.accentFg};`,
    `${indent}--color-muted: ${m.bg};`,
    `${indent}--color-muted-foreground: ${m.muted};`,
    `${indent}--color-border: ${m.border};`,
    `${indent}--color-input: ${m.border};`,
    `${indent}--color-ring: ${m.primary};`,
  ]
  if (scope === "root") {
    lines.push(
      `${indent}--color-success: ${SEMANTIC.success};`,
      `${indent}--color-warning: ${SEMANTIC.warning};`,
      `${indent}--color-danger: ${SEMANTIC.danger};`,
      `${indent}--color-info: ${SEMANTIC.info};`,
    )
  }
  return lines.join("\n")
}

export function paletteToTailwindCSS(p: ExportPalette): string {
  return `/* ${p.name} — Tailwind v4 配色变量（含 light + dark）
 * 用法：复制到 app/globals.css，确保已配置 @custom-variant dark (&:is(.dark *));
 * 生成时间：${new Date().toLocaleString("zh-CN")}
 */
@theme inline {
${tailwindBlock(p.light, "root")}
}

@layer base {
  .dark {
${tailwindBlock(p.dark, "dark")}
  }
}
`
}

// ---------- 4. shadcn/ui CSS 变量（HSL，:root + .dark） ----------

function shadcnBlock(m: ExportPaletteMode, indent = "    "): string {
  return [
    `${indent}--background: ${hexToHslString(m.bg)};`,
    `${indent}--foreground: ${hexToHslString(m.fg)};`,
    `${indent}--card: ${hexToHslString(m.surface)};`,
    `${indent}--card-foreground: ${hexToHslString(m.fg)};`,
    `${indent}--popover: ${hexToHslString(m.surface)};`,
    `${indent}--popover-foreground: ${hexToHslString(m.fg)};`,
    `${indent}--primary: ${hexToHslString(m.primary)};`,
    `${indent}--primary-foreground: ${hexToHslString(m.primaryFg)};`,
    `${indent}--secondary: ${hexToHslString(m.surface)};`,
    `${indent}--secondary-foreground: ${hexToHslString(m.fg)};`,
    `${indent}--muted: ${hexToHslString(m.bg)};`,
    `${indent}--muted-foreground: ${hexToHslString(m.muted)};`,
    `${indent}--accent: ${hexToHslString(m.accent)};`,
    `${indent}--accent-foreground: ${hexToHslString(m.accentFg)};`,
    `${indent}--destructive: ${hexToHslString(SEMANTIC.danger)};`,
    `${indent}--destructive-foreground: 0 0% 100%;`,
    `${indent}--border: ${hexToHslString(m.border)};`,
    `${indent}--input: ${hexToHslString(m.border)};`,
    `${indent}--ring: ${hexToHslString(m.primary)};`,
  ].join("\n")
}

export function paletteToShadcnCSS(p: ExportPalette): string {
  return `/* ${p.name} — shadcn/ui CSS 变量（HSL，含 light + dark）
 * 用法：将以下内容粘贴到 app/globals.css 的 @layer base 中
 * 生成时间：${new Date().toLocaleString("zh-CN")}
 */
@layer base {
  :root {
${shadcnBlock(p.light)}
    --radius: 0.625rem;
  }

  .dark {
${shadcnBlock(p.dark)}
  }
}
`
}

// ---------- 5. 设计 Tokens JSON（Style Dictionary 风格） ----------

function tokensFor(m: ExportPaletteMode) {
  const t = (value: string) => ({ value, type: "color" as const })
  return {
    brand: {
      primary: t(m.primary),
      primaryForeground: t(m.primaryFg),
      accent: t(m.accent),
      accentForeground: t(m.accentFg),
    },
    surface: {
      background: t(m.bg),
      card: t(m.surface),
    },
    text: {
      foreground: t(m.fg),
      muted: t(m.muted),
    },
    border: {
      default: t(m.border),
    },
  }
}

export function paletteToDesignTokens(p: ExportPalette) {
  const t = (value: string) => ({ value, type: "color" as const })
  return {
    $schema: "https://design-tokens.github.io/community-group/format/",
    color: {
      light: tokensFor(p.light),
      dark: tokensFor(p.dark),
      semantic: {
        success: t(SEMANTIC.success),
        warning: t(SEMANTIC.warning),
        danger: t(SEMANTIC.danger),
        info: t(SEMANTIC.info),
      },
    },
    meta: {
      paletteId: p.id,
      paletteName: p.name,
      vibe: p.vibe,
      modes: ["light", "dark"],
      exportedAt: new Date().toISOString(),
    },
  }
}

// ---------- 通用：下载 / 复制 ----------

export function downloadFile(filename: string, content: string, mime = "application/json;charset=utf-8") {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 200)
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fallthrough to legacy
  }
  try {
    const ta = document.createElement("textarea")
    ta.value = text
    ta.style.position = "fixed"
    ta.style.opacity = "0"
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
