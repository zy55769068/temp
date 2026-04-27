"use client"

import {
  Search,
  Bell,
  Globe,
  Sun,
  Moon,
  HelpCircle,
  Settings,
  LogOut,
  UserRound,
  Maximize2,
  KeyRound,
  PanelLeft,
  Palette as PaletteIcon,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { useSidebar } from "@/lib/sidebar-context"
import { useThemePalette } from "@/lib/theme-palette-context"
import { cn } from "@/lib/utils"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { toggle: toggleSidebar } = useSidebar()
  const { palette, paletteId, setPaletteId, palettes, mode } = useThemePalette()

  return (
    <TooltipProvider delayDuration={150}>
      <header className="sticky top-0 z-30 h-16 bg-card/80 supports-[backdrop-filter]:bg-card/70 backdrop-blur border-b border-border">
        <div className="h-full px-4 lg:px-6 flex items-center gap-3">
          <MobileNav />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="切换侧边栏"
                onClick={toggleSidebar}
                className="hidden lg:inline-flex"
              >
                <PanelLeft className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>收起 / 展开侧边栏</TooltipContent>
          </Tooltip>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="搜索菜单、客户、车辆 VIN、订单号…"
                aria-label="全局搜索"
              />
              <InputGroupAddon align="inline-end" className="gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex items-center gap-1">
            {/* Palette quick switcher */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="切换主题配色"
                      className="relative"
                    >
                      <PaletteIcon className="size-4" />
                      <span
                        className="absolute bottom-1 right-1 size-2 rounded-full ring-1 ring-background"
                        style={{ backgroundColor: palette[mode].primary }}
                        aria-hidden
                      />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>主题配色</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>主题配色</span>
                  <Badge variant="secondary" className="font-normal">
                    当前：{palette.name}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-72 overflow-y-auto thin-scrollbar">
                  {palettes.map((p) => {
                    const c = p[mode]
                    const active = p.id === paletteId
                    return (
                      <DropdownMenuItem
                        key={p.id}
                        onClick={() => setPaletteId(p.id)}
                        className={cn("gap-2", active && "bg-accent/40")}
                      >
                        <div className="flex h-5 w-10 shrink-0 overflow-hidden rounded-sm ring-1 ring-border">
                          <span className="flex-1" style={{ backgroundColor: c.primary }} />
                          <span className="flex-1" style={{ backgroundColor: c.accent }} />
                          <span className="flex-1" style={{ backgroundColor: c.bg }} />
                          <span className="flex-1" style={{ backgroundColor: c.fg }} />
                        </div>
                        <div className="flex flex-1 flex-col leading-tight">
                          <span className="text-sm">{p.name}</span>
                          <span className="text-[10.5px] text-muted-foreground truncate">
                            {p.vibe}
                          </span>
                        </div>
                        {active ? <Check className="size-4 text-primary" /> : null}
                      </DropdownMenuItem>
                    )
                  })}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/system/theme" className="text-sm justify-center">
                    打开主题配色管理
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              aria-label="语言:简体中文"
              className="hidden md:inline-flex"
            >
              <Globe className="size-4" />
              <span className="sr-only">语言切换</span>
            </Button>

            <Button variant="ghost" size="icon" aria-label="全屏" className="hidden md:inline-flex">
              <Maximize2 className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="切换主题"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="帮助中心"
              className="hidden md:inline-flex"
            >
              <HelpCircle className="size-4" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="消息通知">
                  <Bell className="size-4" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>消息通知</span>
                  <Badge variant="secondary" className="font-normal">5 条未读</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  { t: "采购到货异常", d: "PO-2026-0428 缺货 2 件,需复核", time: "10 分钟前", color: "bg-destructive" },
                  { t: "新签合同待审批", d: "客户:杭州长安 4S · 金额 ¥168.6 万", time: "32 分钟前", color: "bg-amber-500" },
                  { t: "售后工单完工", d: "工单 RO-26041901 已完成质检", time: "1 小时前", color: "bg-emerald-500" },
                  { t: "月度对账提醒", d: "财务对账截至 4/30 23:59", time: "今早 09:00", color: "bg-sky-500" },
                ].map((n) => (
                  <DropdownMenuItem key={n.t} className="flex items-start gap-3 py-2.5">
                    <span className={`mt-1.5 size-1.5 rounded-full ${n.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{n.t}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.d}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-sm">查看全部消息</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mx-2 h-6 w-px bg-border" />

            {/* User */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-muted transition-colors">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                      王
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-sm font-medium">王经理</span>
                    <span className="text-[11px] text-muted-foreground">华东大区 · 总经理</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserRound className="size-4" /> 个人中心
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-4" /> 偏好设置
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <KeyRound className="size-4" /> 修改密码
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="size-4" /> 退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}
