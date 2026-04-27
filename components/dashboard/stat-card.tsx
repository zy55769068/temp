import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  unit,
  trend,
  trendLabel,
  icon: Icon,
  hint,
  accent = "primary",
}: {
  label: string
  value: string
  unit?: string
  trend?: number
  trendLabel?: string
  icon?: LucideIcon
  hint?: string
  accent?: "primary" | "accent" | "success" | "info"
}) {
  const up = (trend ?? 0) >= 0
  const accentMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent-foreground",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    info: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  }

  return (
    <Card className="p-5 gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <span className="text-xs text-muted-foreground">{label}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold tabular-nums tracking-tight">{value}</span>
            {unit ? <span className="text-xs text-muted-foreground">{unit}</span> : null}
          </div>
        </div>
        {Icon ? (
          <div className={cn("size-9 rounded-md grid place-items-center shrink-0", accentMap[accent])}>
            <Icon className="size-4.5" />
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between text-xs">
        {typeof trend === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium",
              up
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(trend).toFixed(1)}%
          </span>
        ) : (
          <span />
        )}
        <span className="text-muted-foreground">{trendLabel ?? hint}</span>
      </div>
    </Card>
  )
}
