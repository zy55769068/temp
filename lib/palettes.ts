// 全局配色方案库 —— 由 lib/theme-palette-context.tsx 与 主题配色 页面共享。
// 每套方案都精心调校了 light + dark 两种模式，覆盖 ERP / CRM / DMS / 系统管理多种场景。

export type Mode = "light" | "dark"

export type Swatch = {
  name: string
  role: string
  hex: string
  textHex?: string
}

export type PaletteColors = {
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

export type PaletteColorsWithSwatches = PaletteColors & { swatches: Swatch[] }

export type Palette = {
  id: string
  name: string
  tagline: string
  scenario: string
  vibe: string
  light: PaletteColorsWithSwatches
  dark: PaletteColorsWithSwatches
}

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

export const palettes: Palette[] = [
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

export const DEFAULT_PALETTE_ID = "minimal-blue"

export function getPalette(id: string): Palette {
  return palettes.find((p) => p.id === id) ?? palettes[0]
}
