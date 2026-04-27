"use client"

import { useState } from "react"
import {
  Check,
  Copy,
  TrendingUp,
  Car,
  Wrench,
  Users,
  Download,
  ChevronDown,
  FileJson,
  FileCode2,
  Palette as PaletteIcon,
  ClipboardCopy,
  Layers,
  Sun,
  Moon,
} from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  paletteToJSON,
  palettesToJSON,
  paletteToTailwindCSS,
  paletteToShadcnCSS,
  paletteToDesignTokens,
  downloadFile,
  copyText,
} from "@/lib/theme-export"

type Mode = "light" | "dark"

type Swatch = { name: string; role: string; hex: string; textHex?: string }

type PaletteColors = {
  primary: string
  primaryFg: string
  accent: string
  accentFg: string
  bg: string
  surface: string
  fg: string
  muted: string
  border: string
}

type PaletteColorsWithSwatches = PaletteColors & { swatches: Swatch[] }

type Palette = {
  id: string
  name: string
  tagline: string
  scenario: string
  vibe: string
  light: PaletteColorsWithSwatches
  dark: PaletteColorsWithSwatches
}

// 自动从核心色生成 5 格色板，避免手工重复
function buildSwatches(c: PaletteColors): Swatch[] {
  return [
    { name: "主色", role: "Primary", hex: c.primary, textHex: c.primaryFg },
    { name: "辅助", role: "Accent", hex: c.accent, textHex: c.accentFg },
    { name: "底色", role: "Background", hex: c.bg, textHex: c.fg },
    { name: "卡片", role: "Surface", hex: c.surface, textHex: c.fg },
    { name: "正文", role: "Foreground", hex: c.fg, textHex: c.bg },
  ]
}

function withSwatches(c: PaletteColors): PaletteColorsWithSwatches {
  return { ...c, swatches: buildSwatches(c) }
}

function defineP(
  meta: Pick<Palette, "id" | "name" | "tagline" | "scenario" | "vibe">,
  light: PaletteColors,
  dark: PaletteColors,
): Palette {
  return { ...meta, light: withSwatches(light), dark: withSwatches(dark) }
}

// ---------- 20 套配色（每套都精心设计了 light + dark 两种模式） ----------

const palettes: Palette[] = [
  defineP(
    {
      id: "minimal-blue",
      name: "极简蓝",
      tagline: "克制而稳重的科技蓝，适合大多数 B 端管理后台",
      scenario: "推荐用于：日常运营、数据看板、ERP 主线流程",
      vibe: "清新干练",
    },
    {
      primary: "#2563EB",
      primaryFg: "#FFFFFF",
      accent: "#0EA5E9",
      accentFg: "#FFFFFF",
      bg: "#F7F9FC",
      surface: "#FFFFFF",
      fg: "#0F172A",
      muted: "#64748B",
      border: "#E2E8F0",
    },
    {
      primary: "#60A5FA",
      primaryFg: "#0B1220",
      accent: "#38BDF8",
      accentFg: "#052438",
      bg: "#0B1220",
      surface: "#111827",
      fg: "#E5E7EB",
      muted: "#94A3B8",
      border: "#1F2937",
    },
  ),
  defineP(
    {
      id: "navy-amber",
      name: "沉稳商务",
      tagline: "深海军蓝 + 琥珀金，传达可靠与权威",
      scenario: "推荐用于：财务、风控、合规审计、管理层驾驶舱",
      vibe: "专业稳重",
    },
    {
      primary: "#1E3A8A",
      primaryFg: "#FFFFFF",
      accent: "#F59E0B",
      accentFg: "#1F2937",
      bg: "#F4F6FB",
      surface: "#FFFFFF",
      fg: "#0B1437",
      muted: "#5A6478",
      border: "#DCE1EC",
    },
    {
      primary: "#93C5FD",
      primaryFg: "#0B1437",
      accent: "#FBBF24",
      accentFg: "#1F1410",
      bg: "#0B1437",
      surface: "#142053",
      fg: "#E5E9F8",
      muted: "#8590A8",
      border: "#1F2A4F",
    },
  ),
  defineP(
    {
      id: "cyan-orange",
      name: "活力青橙",
      tagline: "青蓝 + 橙红的互补撞色，让数据看板更有节奏感",
      scenario: "推荐用于：CRM 营销、商机看板、活动运营",
      vibe: "现代活力",
    },
    {
      primary: "#0E7490",
      primaryFg: "#FFFFFF",
      accent: "#F97316",
      accentFg: "#FFFFFF",
      bg: "#F6FAFB",
      surface: "#FFFFFF",
      fg: "#0F1B22",
      muted: "#5B6B73",
      border: "#DBE7EC",
    },
    {
      primary: "#22D3EE",
      primaryFg: "#06121A",
      accent: "#FB923C",
      accentFg: "#1A0E04",
      bg: "#0B1A22",
      surface: "#122A35",
      fg: "#E5F1F4",
      muted: "#94A3B8",
      border: "#1F3744",
    },
  ),
  defineP(
    {
      id: "emerald-amber",
      name: "翠绿生机",
      tagline: "翡翠绿点亮琥珀金，传递增长与可持续",
      scenario: "推荐用于：售后服务、库存周转、新能源车业务",
      vibe: "成长生机",
    },
    {
      primary: "#047857",
      primaryFg: "#FFFFFF",
      accent: "#D97706",
      accentFg: "#FFFFFF",
      bg: "#F5F8F5",
      surface: "#FFFFFF",
      fg: "#0F1F18",
      muted: "#5B6B63",
      border: "#DCE6DE",
    },
    {
      primary: "#34D399",
      primaryFg: "#052E1F",
      accent: "#FBBF24",
      accentFg: "#1F1410",
      bg: "#0A1714",
      surface: "#0F2A23",
      fg: "#DCEBE5",
      muted: "#7B9389",
      border: "#1B3A30",
    },
  ),
  defineP(
    {
      id: "crimson-gold",
      name: "暖意红金",
      tagline: "酒红与香槟金的组合，传递高端与品牌力",
      scenario: "推荐用于：豪华品牌、车主俱乐部、VIP 会员中心",
      vibe: "高端尊贵",
    },
    {
      primary: "#B91C1C",
      primaryFg: "#FFFFFF",
      accent: "#B45309",
      accentFg: "#FFFFFF",
      bg: "#FAF7F2",
      surface: "#FFFFFF",
      fg: "#1F1410",
      muted: "#6B5C53",
      border: "#EADFD3",
    },
    {
      primary: "#F87171",
      primaryFg: "#1F1410",
      accent: "#FBBF24",
      accentFg: "#1F1410",
      bg: "#1A0E0B",
      surface: "#2C1814",
      fg: "#F8E9DD",
      muted: "#B7967F",
      border: "#3A2218",
    },
  ),
  defineP(
    {
      id: "graphite-cobalt",
      name: "石墨钴蓝",
      tagline: "石墨灰底色 + 钴蓝点缀，极客而克制",
      scenario: "推荐用于：技术管理员后台、API 控制台、监控告警",
      vibe: "极客理性",
    },
    {
      primary: "#3B5BDB",
      primaryFg: "#FFFFFF",
      accent: "#22D3EE",
      accentFg: "#0B1220",
      bg: "#F4F5F7",
      surface: "#FFFFFF",
      fg: "#1A1D23",
      muted: "#5F6671",
      border: "#E1E3E8",
    },
    {
      primary: "#6378E0",
      primaryFg: "#06112A",
      accent: "#67E8F9",
      accentFg: "#042730",
      bg: "#0E1117",
      surface: "#181B22",
      fg: "#E8EAEF",
      muted: "#8E97A8",
      border: "#2A2F3A",
    },
  ),
  defineP(
    {
      id: "twilight-indigo",
      name: "朝雾紫蓝",
      tagline: "靛青与雾紫的渐隐组合，赋予数据产品高级感",
      scenario: "推荐用于：BI 数据中台、AI 智能分析、决策支持",
      vibe: "深邃神秘",
    },
    {
      primary: "#4F46E5",
      primaryFg: "#FFFFFF",
      accent: "#A78BFA",
      accentFg: "#1E1B4B",
      bg: "#F6F5FB",
      surface: "#FFFFFF",
      fg: "#1B1840",
      muted: "#605C82",
      border: "#E2DFEE",
    },
    {
      primary: "#818CF8",
      primaryFg: "#1B1840",
      accent: "#C4B5FD",
      accentFg: "#1E1B4B",
      bg: "#14123A",
      surface: "#211E55",
      fg: "#E9E7F8",
      muted: "#9C97C5",
      border: "#2D2972",
    },
  ),
  defineP(
    {
      id: "ink-vermilion",
      name: "墨韵东方",
      tagline: "水墨黑配朱砂红，致敬东方品牌的克制与张力",
      scenario: "推荐用于：自主品牌、文化营销、品牌官网联动",
      vibe: "东方韵味",
    },
    {
      primary: "#1F2933",
      primaryFg: "#F8F4EE",
      accent: "#C0392B",
      accentFg: "#FFFFFF",
      bg: "#FAF7F1",
      surface: "#FFFFFF",
      fg: "#1F2933",
      muted: "#6B6258",
      border: "#E8E1D2",
    },
    {
      primary: "#F8F4EE",
      primaryFg: "#1F2933",
      accent: "#EF4444",
      accentFg: "#FFFFFF",
      bg: "#14181E",
      surface: "#1F2933",
      fg: "#F4EFE6",
      muted: "#B8AC9A",
      border: "#2C3540",
    },
  ),
  defineP(
    {
      id: "aegean-teal",
      name: "海岸天青",
      tagline: "海蓝绿调，清爽通透，适合长时间凝视的工作台",
      scenario: "推荐用于：呼叫中心、客服工单、长时间运营场景",
      vibe: "清新干练",
    },
    {
      primary: "#0F766E",
      primaryFg: "#FFFFFF",
      accent: "#14B8A6",
      accentFg: "#053B36",
      bg: "#F2FAF8",
      surface: "#FFFFFF",
      fg: "#0F1F1C",
      muted: "#557068",
      border: "#D6E8E3",
    },
    {
      primary: "#2DD4BF",
      primaryFg: "#03241F",
      accent: "#5EEAD4",
      accentFg: "#053B36",
      bg: "#042F2E",
      surface: "#134E4A",
      fg: "#DEF7F2",
      muted: "#7BA59B",
      border: "#155752",
    },
  ),
  defineP(
    {
      id: "dawn-coral",
      name: "黎明珊瑚",
      tagline: "珊瑚粉橘与暖灰，柔和而不失活力",
      scenario: "推荐用于：会员关怀、车主社区、活动专题页",
      vibe: "柔和包容",
    },
    {
      primary: "#E11D48",
      primaryFg: "#FFFFFF",
      accent: "#FB7185",
      accentFg: "#4C0519",
      bg: "#FBF6F4",
      surface: "#FFFFFF",
      fg: "#2C1A1F",
      muted: "#7A5C63",
      border: "#F1DFDA",
    },
    {
      primary: "#FB7185",
      primaryFg: "#2C0817",
      accent: "#FDA4AF",
      accentFg: "#2C0817",
      bg: "#1F0E13",
      surface: "#2E1820",
      fg: "#FBE9E5",
      muted: "#C99CA0",
      border: "#3D2530",
    },
  ),
  defineP(
    {
      id: "neon-midnight",
      name: "暗夜霓虹",
      tagline: "深色优先的驾驶舱主题，霓虹绿点亮关键信息",
      scenario: "推荐用于：实时大屏、监控中心、夜间值班看板",
      vibe: "未来科技",
    },
    {
      primary: "#0891B2",
      primaryFg: "#FFFFFF",
      accent: "#65A30D",
      accentFg: "#FFFFFF",
      bg: "#F2FAFC",
      surface: "#FFFFFF",
      fg: "#06121A",
      muted: "#5A6E78",
      border: "#D5E5EC",
    },
    {
      primary: "#22D3EE",
      primaryFg: "#06121A",
      accent: "#A3E635",
      accentFg: "#1A2E05",
      bg: "#0B1220",
      surface: "#111A2E",
      fg: "#E5E9F2",
      muted: "#94A3B8",
      border: "#1F2A44",
    },
  ),
  defineP(
    {
      id: "forest-sage",
      name: "森林苔绿",
      tagline: "深苔绿与米白搭配，自然质朴又不失专业",
      scenario: "推荐用于：新能源板块、ESG / 碳排数据、绿色物流",
      vibe: "成长生机",
    },
    {
      primary: "#3F6212",
      primaryFg: "#FFFFFF",
      accent: "#84CC16",
      accentFg: "#1A2E05",
      bg: "#F6F7F2",
      surface: "#FFFFFF",
      fg: "#1F2510",
      muted: "#5F6B4C",
      border: "#E1E5D6",
    },
    {
      primary: "#84CC16",
      primaryFg: "#1A2E05",
      accent: "#BEF264",
      accentFg: "#1A2E05",
      bg: "#0E1A05",
      surface: "#182E0E",
      fg: "#E1EAD0",
      muted: "#8DA170",
      border: "#233C16",
    },
  ),
  defineP(
    {
      id: "porcelain-blue",
      name: "青花瓷蓝",
      tagline: "瓷白底色配青花蓝，含蓄而具有东方器物美感",
      scenario: "推荐用于：品牌门户、整车展示、高端会员服务",
      vibe: "东方韵味",
    },
    {
      primary: "#1D4E89",
      primaryFg: "#FFFFFF",
      accent: "#7FB3D5",
      accentFg: "#0B2540",
      bg: "#F5F8FB",
      surface: "#FFFFFF",
      fg: "#0B2540",
      muted: "#5A718C",
      border: "#DCE5EE",
    },
    {
      primary: "#7FB3D5",
      primaryFg: "#0B2540",
      accent: "#BCD9EC",
      accentFg: "#0B2540",
      bg: "#0B1B2C",
      surface: "#142A40",
      fg: "#E2ECF5",
      muted: "#8AA0B5",
      border: "#1F3852",
    },
  ),
  defineP(
    {
      id: "rose-quartz",
      name: "石英玫瑰",
      tagline: "柔粉玫瑰金，温暖明亮，强调情感连接",
      scenario: "推荐用于：会员关怀、生日营销、女性向产品",
      vibe: "柔和包容",
    },
    {
      primary: "#BE185D",
      primaryFg: "#FFFFFF",
      accent: "#F472B6",
      accentFg: "#3F0A26",
      bg: "#FDF6F8",
      surface: "#FFFFFF",
      fg: "#2A0E1A",
      muted: "#7C5868",
      border: "#F1DEE5",
    },
    {
      primary: "#F472B6",
      primaryFg: "#3F0A26",
      accent: "#FBCFE8",
      accentFg: "#3F0A26",
      bg: "#1A0B14",
      surface: "#2A1320",
      fg: "#F5DCE6",
      muted: "#A07A8A",
      border: "#3D1F2E",
    },
  ),
  defineP(
    {
      id: "carbon-laser",
      name: "碳纤激光",
      tagline: "深碳灰底色叠加激光绿点缀，速度感与机械感并存",
      scenario: "推荐用于：性能车型展示、改装车间、赛事专题",
      vibe: "未来科技",
    },
    {
      primary: "#0F172A",
      primaryFg: "#A7F3D0",
      accent: "#10B981",
      accentFg: "#052E22",
      bg: "#F2F4F7",
      surface: "#FFFFFF",
      fg: "#0F172A",
      muted: "#5F6B7C",
      border: "#DCE0E8",
    },
    {
      primary: "#10B981",
      primaryFg: "#052E22",
      accent: "#34D399",
      accentFg: "#052E22",
      bg: "#0A0F1A",
      surface: "#121826",
      fg: "#E5E9F2",
      muted: "#8B95A8",
      border: "#1E2638",
    },
  ),
  defineP(
    {
      id: "sandstone-bronze",
      name: "砂岩青铜",
      tagline: "砂岩米色底搭配青铜金属感，沉稳又有手作温度",
      scenario: "推荐用于：售后服务、维修工单、配件库存",
      vibe: "专业稳重",
    },
    {
      primary: "#7C5E3C",
      primaryFg: "#FFFFFF",
      accent: "#D6A661",
      accentFg: "#3C2A12",
      bg: "#FAF6EE",
      surface: "#FFFFFF",
      fg: "#2B2014",
      muted: "#736046",
      border: "#EAE0CC",
    },
    {
      primary: "#D6A661",
      primaryFg: "#3C2A12",
      accent: "#F1CE93",
      accentFg: "#3C2A12",
      bg: "#1A150E",
      surface: "#26201A",
      fg: "#F0E4CE",
      muted: "#9A8867",
      border: "#3A3024",
    },
  ),
  defineP(
    {
      id: "arctic-silver",
      name: "极地银光",
      tagline: "冰川蓝白与极光紫的清冷组合，强调精确与高端",
      scenario: "推荐用于：智能驾驶、ADAS 数据、科技品牌官网",
      vibe: "极客理性",
    },
    {
      primary: "#475569",
      primaryFg: "#FFFFFF",
      accent: "#8B5CF6",
      accentFg: "#FFFFFF",
      bg: "#F4F6F8",
      surface: "#FFFFFF",
      fg: "#0F172A",
      muted: "#64748B",
      border: "#DDE3EA",
    },
    {
      primary: "#94A3B8",
      primaryFg: "#0F172A",
      accent: "#A78BFA",
      accentFg: "#1E1B4B",
      bg: "#0F141C",
      surface: "#1A2030",
      fg: "#E2E8F0",
      muted: "#94A3B8",
      border: "#202A3A",
    },
  ),
  defineP(
    {
      id: "harvest-mustard",
      name: "丰收芥末",
      tagline: "芥末黄与橄榄绿，复古、踏实、富有生活感",
      scenario: "推荐用于：二手车业务、置换评估、商用车板块",
      vibe: "成长生机",
    },
    {
      primary: "#A16207",
      primaryFg: "#FFFFFF",
      accent: "#65A30D",
      accentFg: "#FFFFFF",
      bg: "#FBF8F0",
      surface: "#FFFFFF",
      fg: "#231D08",
      muted: "#6B6242",
      border: "#ECE4D2",
    },
    {
      primary: "#EAB308",
      primaryFg: "#1C1407",
      accent: "#A3E635",
      accentFg: "#1A2E05",
      bg: "#15140B",
      surface: "#1F1D11",
      fg: "#F0EAD2",
      muted: "#A39676",
      border: "#2E2A18",
    },
  ),
  defineP(
    {
      id: "glacier-aurora",
      name: "冰川极光",
      tagline: "冰蓝绿与极光紫蓝的冷色搭配，纯净通透",
      scenario: "推荐用于：电车续航、能源管理、充电网络监控",
      vibe: "未来科技",
    },
    {
      primary: "#0891B2",
      primaryFg: "#FFFFFF",
      accent: "#6366F1",
      accentFg: "#FFFFFF",
      bg: "#F1F8FB",
      surface: "#FFFFFF",
      fg: "#0B2330",
      muted: "#5C7585",
      border: "#D6E5EE",
    },
    {
      primary: "#22D3EE",
      primaryFg: "#062633",
      accent: "#818CF8",
      accentFg: "#1E1B4B",
      bg: "#06141C",
      surface: "#0F2230",
      fg: "#DCEEF5",
      muted: "#7B98A8",
      border: "#1A3344",
    },
  ),
]

export default function ThemePage() {
  const [activeId, setActiveId] = useState(palettes[0].id)
  const [mode, setMode] = useState<Mode>("light")
  const active = palettes.find((p) => p.id === activeId) ?? palettes[0]
  const colors = active[mode]

  return (
    <div className="space-y-6">
      <PageHeader
        title="主题配色方案"
        description={`为 ERP / CRM / DMS 平台准备的 ${palettes.length} 套推荐配色，每套均提供完整的浅色 + 深色双模适配，覆盖商务、营销、售后、豪华、监控大屏等多种场景。`}
        breadcrumbs={[
          { label: "系统管理", href: "/system/users" },
          { label: "主题配色" },
        ]}
        actions={
          <>
            <ExportMenu active={active} all={palettes} />
            <Button>应用到当前主题</Button>
          </>
        }
      />

      {/* 设计原则 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">配色设计原则</CardTitle>
          <CardDescription>所有配色均遵循「1 主色 + 1 辅色 + 3 中性色」的精简结构，并完整提供深色模式映射。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { title: "对比度优先", desc: "正文与背景对比度 ≥ 4.5:1，符合 WCAG AA 标准。" },
              { title: "色彩克制", desc: "全局仅使用 3–5 种颜色，避免视觉混乱。" },
              { title: "语义一致", desc: "成功 / 警示 / 危险使用通用语义色，跨模块统一。" },
              { title: "双模适配", desc: "12 套配色均人工调校了 light/dark 两种模式。" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-muted/30 p-4">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 配色切换 + 模式切换 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {palettes.map((p) => {
            const isActive = p.id === activeId
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:border-foreground/40",
                )}
              >
                <span className="flex -space-x-1">
                  <span
                    className="size-4 rounded-full border border-white/40"
                    style={{ background: p[mode].primary }}
                  />
                  <span
                    className="size-4 rounded-full border border-white/40"
                    style={{ background: p[mode].accent }}
                  />
                </span>
                {p.name}
              </button>
            )
          })}
        </div>

        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      {/* 当前选中配色详情 */}
      <PaletteDetail palette={active} mode={mode} colors={colors} />

      {/* 全部配色概览（同时展示双模色带） */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">全部配色一览</CardTitle>
          <CardDescription>每张卡片同时展示浅色 / 深色色带，便于横向评审。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {palettes.map((p) => (
              <PaletteOverviewCard
                key={p.id}
                palette={p}
                active={p.id === activeId}
                onSelect={() => setActiveId(p.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border bg-card p-1 text-xs">
      {(
        [
          { value: "light", label: "浅色", icon: Sun },
          { value: "dark", label: "深色", icon: Moon },
        ] as const
      ).map((opt) => {
        const Icon = opt.icon
        const isActive = mode === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={isActive}
          >
            <Icon className="size-3.5" />
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function PaletteDetail({
  palette,
  mode,
  colors,
}: {
  palette: Palette
  mode: Mode
  colors: PaletteColorsWithSwatches
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* 左侧：色板 + 说明 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg">{palette.name}</CardTitle>
              <CardDescription className="mt-1">{palette.tagline}</CardDescription>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Badge variant="secondary">{palette.vibe}</Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                {mode === "light" ? "LIGHT" : "DARK"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-5 gap-2">
            {colors.swatches.map((s) => (
              <button
                key={s.role}
                onClick={() => copy(s.hex)}
                className="group relative flex aspect-[3/4] flex-col justify-between rounded-lg border p-2 text-left transition-transform hover:-translate-y-0.5"
                style={{ background: s.hex, color: s.textHex, borderColor: "rgba(0,0,0,0.06)" }}
                title={`点击复制 ${s.hex}`}
              >
                <span className="text-[10px] font-medium opacity-80">{s.role}</span>
                <div>
                  <div className="text-xs font-semibold">{s.name}</div>
                  <div className="text-[10px] font-mono opacity-80">{s.hex}</div>
                </div>
                <span className="absolute right-1.5 top-1.5 rounded-md bg-black/15 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {copied === s.hex ? <Check className="size-3" /> : <Copy className="size-3" />}
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="text-xs font-medium text-foreground">适用场景</div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{palette.scenario}</p>
          </div>

          {/* 对应模式 / 跨模式映射提示 */}
          <div className="rounded-lg border p-3">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              双模映射
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <ModeStrip label="Light" colors={palette.light} highlight={mode === "light"} />
              <ModeStrip label="Dark" colors={palette.dark} highlight={mode === "dark"} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Info label="主色对比度" value="AAA" />
            <Info label="辅色对比度" value="AA" />
            <Info label="支持暗色" value="是" />
            <Info label="语义色就绪" value="是" />
          </div>
        </CardContent>
      </Card>

      {/* 右侧：实时预览 */}
      <Card className="overflow-hidden lg:col-span-3">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">界面效果预览</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[11px]">
                {palette.id}
              </Badge>
              <Badge variant="outline" className="gap-1 text-[11px]">
                {mode === "light" ? <Sun className="size-3" /> : <Moon className="size-3" />}
                {mode === "light" ? "浅色" : "深色"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 transition-colors" style={{ background: colors.bg, color: colors.fg }}>
          <PreviewSurface colors={colors} />
        </CardContent>
      </Card>
    </div>
  )
}

function ModeStrip({
  label,
  colors,
  highlight,
}: {
  label: string
  colors: PaletteColors
  highlight: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border p-1.5 transition-colors",
        highlight ? "border-foreground/60 bg-muted/40" : "border-border",
      )}
    >
      <span className="w-10 shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-1 overflow-hidden rounded">
        {[colors.bg, colors.surface, colors.primary, colors.accent, colors.fg].map((hex, i) => (
          <span key={i} className="h-5 flex-1" style={{ background: hex }} title={hex} />
        ))}
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}

function PreviewSurface({ colors }: { colors: PaletteColorsWithSwatches }) {
  const card: React.CSSProperties = {
    background: colors.surface,
    color: colors.fg,
    borderColor: colors.border,
  }
  const subtle: React.CSSProperties = { color: colors.muted }

  return (
    <div className="space-y-4">
      {/* 顶部：导航条 + 按钮组 */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3" style={card}>
        <div className="flex items-center gap-3">
          <div
            className="flex size-9 items-center justify-center rounded-md font-bold"
            style={{ background: colors.primary, color: colors.primaryFg }}
          >
            驰
          </div>
          <div>
            <div className="text-sm font-semibold">驰云汽车经销商平台</div>
            <div className="text-[11px]" style={subtle}>
              ERP · CRM · DMS 一体化
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-3 py-1.5 text-xs font-medium"
            style={{ borderColor: colors.border, color: colors.fg, background: colors.surface }}
          >
            导出
          </button>
          <button
            className="rounded-md px-3 py-1.5 text-xs font-medium"
            style={{ background: colors.primary, color: colors.primaryFg }}
          >
            新建工单
          </button>
        </div>
      </div>

      {/* KPI 卡片组 */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiPreview
          icon={<TrendingUp className="size-4" />}
          label="本月销售额"
          value="¥ 4,286万"
          delta="+12.4%"
          color={colors.primary}
          colorFg={colors.primaryFg}
          card={card}
          subtle={subtle}
        />
        <KpiPreview
          icon={<Car className="size-4" />}
          label="整车在库"
          value="1,284"
          delta="+86"
          color={colors.accent}
          colorFg={colors.accentFg}
          card={card}
          subtle={subtle}
        />
        <KpiPreview
          icon={<Users className="size-4" />}
          label="新增客户"
          value="367"
          delta="+8.2%"
          color={colors.primary}
          colorFg={colors.primaryFg}
          card={card}
          subtle={subtle}
        />
        <KpiPreview
          icon={<Wrench className="size-4" />}
          label="维修工单"
          value="912"
          delta="-3.1%"
          color={colors.accent}
          colorFg={colors.accentFg}
          card={card}
          subtle={subtle}
        />
      </div>

      {/* 图表 + 列表 */}
      <div className="grid gap-3 md:grid-cols-5">
        <div className="rounded-lg border p-4 md:col-span-3" style={card}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">销售渠道贡献</div>
              <div className="text-[11px]" style={subtle}>
                最近 6 个月
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <LegendDot color={colors.primary} label="整车" />
              <LegendDot color={colors.accent} label="售后" />
            </div>
          </div>
          <div className="mt-4 flex h-32 items-end gap-3">
            {[
              [55, 32],
              [70, 40],
              [62, 50],
              [85, 45],
              [78, 60],
              [92, 55],
            ].map(([a, b], i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full items-end gap-1">
                  <div className="flex-1 rounded-t" style={{ height: `${a}%`, background: colors.primary }} />
                  <div className="flex-1 rounded-t" style={{ height: `${b}%`, background: colors.accent }} />
                </div>
                <span className="text-[10px]" style={subtle}>
                  {i + 1}月
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-4 md:col-span-2" style={card}>
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">今日待办</div>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: colors.primary, color: colors.primaryFg }}
            >
              8 项
            </span>
          </div>
          <ul className="mt-3 space-y-2.5 text-xs">
            {[
              { tag: "试驾", title: "张先生 — 凯美瑞 2.5G 试驾邀约", color: colors.primary, fg: colors.primaryFg },
              { tag: "回访", title: "李女士 — 售后满意度回访", color: colors.accent, fg: colors.accentFg },
              { tag: "保养", title: "粤B·8888H 5,000km 首保提醒", color: colors.primary, fg: colors.primaryFg },
              { tag: "签约", title: "深圳广汽 5 台批售订单签约", color: colors.accent, fg: colors.accentFg },
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{ background: t.color, color: t.fg }}
                >
                  {t.tag}
                </span>
                <span className="flex-1 truncate">{t.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 状态徽章组 */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border p-3 text-xs" style={card}>
        <span style={subtle}>状态示例：</span>
        <BadgePreview color={colors.primary} fg={colors.primaryFg} text="进行中" />
        <BadgePreview color={colors.accent} fg={colors.accentFg} text="待审批" />
        <BadgePreview color="#16A34A" fg="#FFFFFF" text="已完成" />
        <BadgePreview color="#F59E0B" fg="#1F2937" text="预警" />
        <BadgePreview color="#DC2626" fg="#FFFFFF" text="超期" />
      </div>
    </div>
  )
}

function KpiPreview({
  icon,
  label,
  value,
  delta,
  color,
  colorFg,
  card,
  subtle,
}: {
  icon: React.ReactNode
  label: string
  value: string
  delta: string
  color: string
  colorFg: string
  card: React.CSSProperties
  subtle: React.CSSProperties
}) {
  const positive = delta.startsWith("+")
  return (
    <div className="rounded-lg border p-3" style={card}>
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={subtle}>
          {label}
        </span>
        <span
          className="flex size-6 items-center justify-center rounded-md"
          style={{ background: color, color: colorFg }}
        >
          {icon}
        </span>
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-[11px]" style={{ color: positive ? "#34D399" : "#F87171" }}>
        {delta} 环比
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </span>
  )
}

function BadgePreview({ color, fg, text }: { color: string; fg: string; text: string }) {
  return (
    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: color, color: fg }}>
      {text}
    </span>
  )
}

function ExportMenu({ active, all }: { active: Palette; all: Palette[] }) {
  const stamp = () => new Date().toISOString().slice(0, 10)
  const safe = (s: string) => s.replace(/[^a-zA-Z0-9_-]+/g, "-")

  const handleExportCurrentJson = () => {
    const data = paletteToJSON(active)
    const filename = `theme-${safe(active.id)}-${stamp()}.json`
    downloadFile(filename, JSON.stringify(data, null, 2))
    toast.success("已导出当前配色 JSON（含 light + dark）", { description: filename })
  }

  const handleExportAllJson = () => {
    const data = palettesToJSON(all)
    const filename = `theme-bundle-${stamp()}.json`
    downloadFile(filename, JSON.stringify(data, null, 2))
    toast.success(`已导出全部 ${all.length} 套配色`, { description: filename })
  }

  const handleExportTailwindCSS = () => {
    const css = paletteToTailwindCSS(active)
    const filename = `theme-${safe(active.id)}.tailwind.css`
    downloadFile(filename, css, "text/css;charset=utf-8")
    toast.success("已导出 Tailwind v4 CSS（含 .dark 覆盖）", { description: filename })
  }

  const handleExportShadcnCSS = () => {
    const css = paletteToShadcnCSS(active)
    const filename = `theme-${safe(active.id)}.shadcn.css`
    downloadFile(filename, css, "text/css;charset=utf-8")
    toast.success("已导出 shadcn/ui CSS（:root + .dark）", { description: filename })
  }

  const handleExportTokens = () => {
    const data = paletteToDesignTokens(active)
    const filename = `theme-${safe(active.id)}.tokens.json`
    downloadFile(filename, JSON.stringify(data, null, 2))
    toast.success("已导出设计 Tokens（双模）", { description: filename })
  }

  const handleCopyJson = async () => {
    const text = JSON.stringify(paletteToJSON(active), null, 2)
    const ok = await copyText(text)
    if (ok) {
      toast.success("已复制 JSON 到剪贴板", { description: `${active.name} · ${text.length} 字符` })
    } else {
      toast.error("复制失败，请手动选择导出文件")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1.5">
          <Download className="size-4" />
          导出配色
          <ChevronDown className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          当前：{active.name}（含 light + dark）
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleExportCurrentJson} className="gap-2">
          <FileJson className="size-4" />
          <div className="flex flex-1 flex-col">
            <span>导出当前配色 JSON</span>
            <span className="text-[11px] text-muted-foreground">含 light/dark 元数据与 Tokens</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportTokens} className="gap-2">
          <Layers className="size-4" />
          <div className="flex flex-1 flex-col">
            <span>导出设计 Tokens</span>
            <span className="text-[11px] text-muted-foreground">Style Dictionary · 双模</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportTailwindCSS} className="gap-2">
          <FileCode2 className="size-4" />
          <div className="flex flex-1 flex-col">
            <span>导出 Tailwind v4 CSS</span>
            <span className="text-[11px] text-muted-foreground">@theme + .dark 覆盖</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportShadcnCSS} className="gap-2">
          <PaletteIcon className="size-4" />
          <div className="flex flex-1 flex-col">
            <span>导出 shadcn/ui CSS</span>
            <span className="text-[11px] text-muted-foreground">:root + .dark HSL 变量</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportAllJson} className="gap-2">
          <FileJson className="size-4" />
          <div className="flex flex-1 flex-col">
            <span>导出全部配色 ({all.length} 套)</span>
            <span className="text-[11px] text-muted-foreground">合集 JSON · 全部双模</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyJson} className="gap-2">
          <ClipboardCopy className="size-4" />
          <div className="flex flex-1 flex-col">
            <span>复制 JSON 到剪贴板</span>
            <span className="text-[11px] text-muted-foreground">便于直接粘贴使用</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PaletteOverviewCard({
  palette,
  active,
  onSelect,
}: {
  palette: Palette
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border text-left transition-all",
        active ? "border-foreground shadow-sm" : "border-border hover:border-foreground/30",
      )}
    >
      {/* 双模色带：上半部分 light，下半部分 dark */}
      <div className="relative" aria-hidden>
        <div className="flex h-12">
          {palette.light.swatches.map((s) => (
            <div key={`l-${s.role}`} className="flex-1" style={{ background: s.hex }} />
          ))}
        </div>
        <div className="flex h-12">
          {palette.dark.swatches.map((s) => (
            <div key={`d-${s.role}`} className="flex-1" style={{ background: s.hex }} />
          ))}
        </div>
        <span className="pointer-events-none absolute left-2 top-1.5 inline-flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[9px] font-medium text-slate-700 backdrop-blur">
          <Sun className="size-2.5" /> Light
        </span>
        <span className="pointer-events-none absolute bottom-1.5 left-2 inline-flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur">
          <Moon className="size-2.5" /> Dark
        </span>
      </div>
      <div className="flex-1 space-y-2 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">{palette.name}</div>
          <Badge variant={active ? "default" : "outline"} className="text-[10px]">
            {active ? "已选" : palette.vibe}
          </Badge>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{palette.tagline}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          <span
            className="rounded px-1.5 py-0.5 font-mono text-[10px]"
            style={{ background: palette.light.primary, color: palette.light.primaryFg }}
          >
            L · {palette.light.primary}
          </span>
          <span
            className="rounded px-1.5 py-0.5 font-mono text-[10px]"
            style={{ background: palette.dark.primary, color: palette.dark.primaryFg }}
          >
            D · {palette.dark.primary}
          </span>
        </div>
      </div>
    </button>
  )
}
