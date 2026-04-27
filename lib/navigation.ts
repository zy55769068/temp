import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Wallet,
  Boxes,
  ShoppingCart,
  Receipt,
  Users,
  Target,
  PhoneCall,
  ClipboardList,
  Car,
  Wrench,
  PackageSearch,
  HandCoins,
  ShieldCheck,
  UserCog,
  KeyRound,
  Menu as MenuIcon,
  BookOpenText,
  ScrollText,
  Building2,
  Activity,
  Palette,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon?: LucideIcon
  badge?: string
  description?: string
}

export type NavGroup = {
  title: string
  short: string
  icon: LucideIcon
  items: NavItem[]
}

export const navigation: NavGroup[] = [
  {
    title: "工作台",
    short: "概览",
    icon: LayoutDashboard,
    items: [
      { title: "运营概览", href: "/", icon: LayoutDashboard, description: "全集团关键指标实时看板" },
      { title: "经营分析", href: "/analytics", icon: Activity, description: "多维度数据分析与对比" },
    ],
  },
  {
    title: "ERP · 企业资源",
    short: "ERP",
    icon: Building2,
    items: [
      { title: "财务管理", href: "/erp/finance", icon: Wallet, description: "应收应付、总账、报表" },
      { title: "库存管理", href: "/erp/inventory", icon: Boxes, badge: "12", description: "出入库、盘点、调拨" },
      { title: "采购管理", href: "/erp/purchase", icon: ShoppingCart, description: "订单、到货、对账" },
      { title: "销售订单", href: "/erp/orders", icon: Receipt, description: "整车 / 配件销售订单" },
    ],
  },
  {
    title: "CRM · 客户关系",
    short: "CRM",
    icon: Users,
    items: [
      { title: "客户管理", href: "/crm/customers", icon: Users, description: "潜客、保有客户、流失客户" },
      { title: "销售商机", href: "/crm/leads", icon: Target, badge: "8", description: "线索 → 商机 → 成交" },
      { title: "跟进任务", href: "/crm/tasks", icon: PhoneCall, description: "回访、试驾、邀约" },
      { title: "营销活动", href: "/crm/campaigns", icon: ClipboardList, description: "活动策划与效果跟踪" },
    ],
  },
  {
    title: "DMS · 经销商管理",
    short: "DMS",
    icon: Car,
    items: [
      { title: "整车库存", href: "/dms/vehicles", icon: Car, description: "在库、在途、待PDI" },
      { title: "售后维修", href: "/dms/service", icon: Wrench, badge: "新", description: "工单、工时、保养计划" },
      { title: "配件管理", href: "/dms/parts", icon: PackageSearch, description: "配件库存、订货、销售" },
      { title: "金融保险", href: "/dms/finance", icon: HandCoins, description: "贷款、按揭、保险方案" },
    ],
  },
  {
    title: "系统管理",
    short: "系统",
    icon: ShieldCheck,
    items: [
      { title: "用户管理", href: "/system/users", icon: UserCog, description: "员工账号、组织、岗位" },
      { title: "角色权限", href: "/system/roles", icon: KeyRound, description: "RBAC、数据权限" },
      { title: "菜单配置", href: "/system/menus", icon: MenuIcon, description: "菜单与按钮权限" },
      { title: "数据字典", href: "/system/dict", icon: BookOpenText, description: "枚举、字典维护" },
      { title: "操作日志", href: "/system/logs", icon: ScrollText, description: "操作 / 登录审计" },
      { title: "主题配色", href: "/system/theme", icon: Palette, badge: "新", description: "可视化配色方案推荐" },
    ],
  },
]

export function findNavMeta(pathname: string) {
  for (const group of navigation) {
    for (const item of group.items) {
      if (item.href === pathname) {
        return { group, item }
      }
    }
  }
  return null
}
