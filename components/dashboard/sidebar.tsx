"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"
import { useSidebar } from "@/lib/sidebar-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { collapsed, toggle, isSectionOpen, toggleSection } = useSidebar()

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "hidden lg:flex flex-col shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-[width] duration-200 ease-in-out",
          collapsed ? "w-[68px]" : "w-64",
        )}
      >
        {/* Logo + collapse toggle */}
        <div
          className={cn(
            "h-16 flex items-center border-b border-sidebar-border shrink-0",
            collapsed ? "px-2 justify-center" : "px-4 gap-3",
          )}
        >
          <div className="size-9 rounded-md bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center shadow-sm shrink-0">
            <Car className="size-5" aria-hidden />
          </div>
          {!collapsed ? (
            <>
              <div className="flex-1 min-w-0 flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-wide truncate">智驰云</span>
                <span className="text-[11px] text-sidebar-foreground/60 truncate">汽车经销商一体化</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="收起侧边栏"
                onClick={toggle}
                className="size-7 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
              >
                <PanelLeftClose className="size-4" />
              </Button>
            </>
          ) : null}
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 thin-scrollbar">
          <nav className={cn("py-3 flex flex-col", collapsed ? "px-1.5 gap-1" : "px-3 gap-1")}>
            {navigation.map((group) => {
              const open = isSectionOpen(group.title)
              const GroupIcon = group.icon
              return (
                <div key={group.title} className="flex flex-col">
                  {/* Group header */}
                  {collapsed ? (
                    <div className="my-1 mx-2 h-px bg-sidebar-border first:hidden" aria-hidden />
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleSection(group.title)}
                      className="group/group mt-2 mb-0.5 px-2 py-1 flex items-center gap-2 rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
                      aria-expanded={open}
                    >
                      <GroupIcon className="size-3.5" aria-hidden />
                      <span className="text-[11px] font-medium uppercase tracking-wider flex-1 text-left">
                        {group.title}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform",
                          !open && "-rotate-90",
                        )}
                        aria-hidden
                      />
                    </button>
                  )}

                  {/* Items */}
                  {(collapsed || open) ? (
                    <ul className="flex flex-col gap-0.5">
                      {group.items.map((item) => {
                        const active =
                          pathname === item.href ||
                          (item.href !== "/" && pathname.startsWith(item.href))
                        const Icon = item.icon

                        const link = (
                          <Link
                            href={item.href}
                            className={cn(
                              "group/item flex items-center rounded-md text-sm transition-colors",
                              collapsed
                                ? "h-9 justify-center px-0"
                                : "gap-2.5 px-2.5 py-2",
                              active
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                            )}
                          >
                            {Icon ? (
                              <Icon
                                className={cn(
                                  "size-4 shrink-0",
                                  active ? "text-sidebar-primary" : "text-sidebar-foreground/60",
                                )}
                                aria-hidden
                              />
                            ) : null}
                            {!collapsed ? (
                              <>
                                <span className="flex-1 truncate">{item.title}</span>
                                {item.badge ? (
                                  <Badge
                                    variant="secondary"
                                    className="h-5 px-1.5 text-[10px] bg-sidebar-primary/15 text-sidebar-primary border-0"
                                  >
                                    {item.badge}
                                  </Badge>
                                ) : (
                                  <ChevronRight
                                    className={cn(
                                      "size-3.5 opacity-0 transition-opacity",
                                      active && "opacity-100 text-sidebar-primary",
                                    )}
                                    aria-hidden
                                  />
                                )}
                              </>
                            ) : item.badge ? (
                              <span className="absolute right-1 top-1 inline-flex h-3 min-w-3 items-center justify-center rounded-full bg-sidebar-primary px-1 text-[9px] font-medium text-sidebar-primary-foreground">
                                {item.badge}
                              </span>
                            ) : null}
                          </Link>
                        )

                        return (
                          <li key={item.href} className="relative">
                            {collapsed ? (
                              <Tooltip>
                                <TooltipTrigger asChild>{link}</TooltipTrigger>
                                <TooltipContent side="right" className="flex flex-col gap-0.5">
                                  <span className="font-medium">{item.title}</span>
                                  {item.description ? (
                                    <span className="text-[11px] text-muted-foreground">
                                      {item.description}
                                    </span>
                                  ) : null}
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              link
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </div>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div
          className={cn(
            "border-t border-sidebar-border shrink-0",
            collapsed ? "px-2 py-2 flex flex-col items-center gap-2" : "px-4 py-3",
          )}
        >
          {collapsed ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="展开侧边栏"
                    onClick={toggle}
                    className="size-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <PanelLeftOpen className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">展开侧边栏</TooltipContent>
              </Tooltip>
              <span className="size-1.5 rounded-full bg-emerald-400" aria-label="运行正常" />
            </>
          ) : (
            <div className="flex items-center justify-between text-[11px] text-sidebar-foreground/55">
              <span>v 4.2.1 · 生产环境</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                运行正常
              </span>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
