import type React from "react"
import Link from "next/link"
import { Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Crumb = { label: string; href?: string }

export function PageHeader({
  title,
  description,
  crumbs = [],
  actions,
  className,
}: {
  title: string
  description?: string
  crumbs?: Crumb[]
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("border-b border-border bg-card", className)}>
      <div className="px-4 lg:px-6 pt-4 pb-5 flex flex-col gap-3">
        <nav aria-label="面包屑" className="flex items-center text-xs text-muted-foreground gap-1">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground">
            <Home className="size-3.5" /> 首页
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <ChevronRight className="size-3.5" />
              {c.href ? (
                <Link href={c.href} className="hover:text-foreground">
                  {c.label}
                </Link>
              ) : (
                <span className="text-foreground/80">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl lg:text-2xl font-semibold tracking-tight text-balance">{title}</h1>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground text-pretty">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      </div>
    </div>
  )
}
