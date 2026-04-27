"use client"

import { useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, RotateCw, X, XCircle, MoreHorizontal, ArrowRightToLine, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTabs } from "@/lib/tabs-context"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TabsBar() {
  const { tabs, activeHref, switchTo, close, closeOthers, closeRight, closeAll, refresh } = useTabs()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  // Keep active tab visible
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [activeHref])

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" })
  }

  return (
    <div className="sticky top-16 z-20 h-10 flex items-center gap-1 bg-card/90 supports-[backdrop-filter]:bg-card/75 backdrop-blur border-b border-border px-2">
      <Button
        variant="ghost"
        size="icon"
        className="size-7 shrink-0"
        aria-label="向左滚动"
        onClick={() => scrollBy(-200)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div
        ref={scrollerRef}
        className="flex-1 min-w-0 flex items-center gap-1 overflow-x-auto thin-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = tab.href === activeHref
          return (
            <ContextMenu key={tab.href}>
              <ContextMenuTrigger asChild>
                <button
                  ref={active ? activeRef : undefined}
                  onClick={() => switchTo(tab.href)}
                  onAuxClick={(e) => {
                    // Middle-click closes a tab
                    if (e.button === 1 && tab.closable) {
                      e.preventDefault()
                      close(tab.href)
                    }
                  }}
                  className={cn(
                    "group h-7 shrink-0 inline-flex items-center gap-1.5 rounded-md border px-2.5 text-xs transition-colors",
                    active
                      ? "bg-primary/10 border-primary/40 text-foreground font-medium"
                      : "bg-muted/40 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                  title={tab.href}
                >
                  {active ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                  {Icon ? <Icon className={cn("size-3.5", active ? "text-primary" : "text-muted-foreground")} /> : null}
                  <span className="truncate max-w-[10rem]">{tab.title}</span>
                  {tab.closable ? (
                    <span
                      role="button"
                      aria-label={`关闭 ${tab.title}`}
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation()
                        close(tab.href)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          e.stopPropagation()
                          close(tab.href)
                        }
                      }}
                      className={cn(
                        "ml-0.5 inline-flex size-4 items-center justify-center rounded-sm transition-colors",
                        active
                          ? "text-foreground/60 hover:bg-primary/20 hover:text-foreground"
                          : "opacity-0 group-hover:opacity-100 text-muted-foreground hover:bg-muted-foreground/15 hover:text-foreground",
                      )}
                    >
                      <X className="size-3" />
                    </span>
                  ) : null}
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-44">
                <ContextMenuItem onClick={() => refresh(tab.href)}>
                  <RotateCw className="size-3.5" /> 刷新
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem disabled={!tab.closable} onClick={() => close(tab.href)}>
                  <X className="size-3.5" /> 关闭当前
                </ContextMenuItem>
                <ContextMenuItem onClick={() => closeOthers(tab.href)}>
                  <XCircle className="size-3.5" /> 关闭其他
                </ContextMenuItem>
                <ContextMenuItem onClick={() => closeRight(tab.href)}>
                  <ArrowRightToLine className="size-3.5" /> 关闭右侧
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={closeAll} className="text-destructive focus:text-destructive">
                  <Trash2 className="size-3.5" /> 关闭全部
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          )
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="size-7 shrink-0"
        aria-label="向右滚动"
        onClick={() => scrollBy(200)}
      >
        <ChevronRight className="size-4" />
      </Button>

      <div className="mx-1 h-5 w-px bg-border" />

      <Button
        variant="ghost"
        size="icon"
        className="size-7 shrink-0"
        aria-label="刷新当前页"
        onClick={() => refresh(activeHref)}
      >
        <RotateCw className="size-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-7 shrink-0" aria-label="标签操作">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            已打开 {tabs.length} 个页面
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => closeOthers(activeHref)}>
            <XCircle className="size-3.5" /> 关闭其他
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => closeRight(activeHref)}>
            <ArrowRightToLine className="size-3.5" /> 关闭右侧
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={closeAll} className="text-destructive focus:text-destructive">
            <Trash2 className="size-3.5" /> 关闭全部
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
