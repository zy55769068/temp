"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const data = [
  { name: "在库可售", value: 768, color: "var(--chart-1)" },
  { name: "已锁定", value: 184, color: "var(--chart-2)" },
  { name: "在途", value: 156, color: "var(--chart-3)" },
  { name: "待PDI", value: 92, color: "var(--chart-5)" },
  { name: "库龄>90", value: 48, color: "var(--destructive)" },
]

const total = data.reduce((s, d) => s + d.value, 0)

const config = data.reduce((acc, d) => {
  acc[d.name] = { label: d.name, color: d.color }
  return acc
}, {} as ChartConfig)

export function InventoryDonut() {
  return (
    <div className="flex flex-col gap-4">
      <ChartContainer config={config} className="mx-auto aspect-square h-[180px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={52}
            outerRadius={78}
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col gap-1.5">
        {data.map((d) => {
          const pct = ((d.value / total) * 100).toFixed(1)
          return (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-sm" style={{ backgroundColor: d.color }} />
                <span className="text-foreground/80">{d.name}</span>
              </span>
              <span className="tabular-nums text-muted-foreground">
                {d.value} 台 · {pct}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
