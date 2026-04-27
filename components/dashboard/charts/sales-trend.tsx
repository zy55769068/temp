"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const data = [
  { d: "04-01", 整车: 86, 售后: 32 },
  { d: "04-02", 整车: 92, 售后: 38 },
  { d: "04-03", 整车: 78, 售后: 30 },
  { d: "04-04", 整车: 110, 售后: 41 },
  { d: "04-05", 整车: 132, 售后: 47 },
  { d: "04-06", 整车: 124, 售后: 44 },
  { d: "04-07", 整车: 98, 售后: 35 },
  { d: "04-08", 整车: 102, 售后: 39 },
  { d: "04-09", 整车: 118, 售后: 42 },
  { d: "04-10", 整车: 134, 售后: 46 },
  { d: "04-11", 整车: 150, 售后: 51 },
  { d: "04-12", 整车: 142, 售后: 48 },
  { d: "04-13", 整车: 128, 售后: 45 },
  { d: "04-14", 整车: 138, 售后: 49 },
  { d: "04-15", 整车: 156, 售后: 54 },
  { d: "04-16", 整车: 168, 售后: 58 },
  { d: "04-17", 整车: 162, 售后: 56 },
  { d: "04-18", 整车: 144, 售后: 50 },
  { d: "04-19", 整车: 158, 售后: 55 },
  { d: "04-20", 整车: 176, 售后: 61 },
  { d: "04-21", 整车: 188, 售后: 64 },
  { d: "04-22", 整车: 174, 售后: 60 },
  { d: "04-23", 整车: 162, 售后: 57 },
  { d: "04-24", 整车: 182, 售后: 63 },
  { d: "04-25", 整车: 198, 售后: 68 },
  { d: "04-26", 整车: 210, 售后: 71 },
  { d: "04-27", 整车: 196, 售后: 66 },
  { d: "04-28", 整车: 218, 售后: 74 },
  { d: "04-29", 整车: 232, 售后: 78 },
  { d: "04-30", 整车: 246, 售后: 82 },
]

const config = {
  整车: { label: "整车销售", color: "var(--chart-1)" },
  售后: { label: "售后服务", color: "var(--chart-3)" },
} satisfies ChartConfig

export function SalesTrendChart() {
  return (
    <ChartContainer config={config} className="aspect-[16/6] w-full">
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillVeh" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-整车)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-整车)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillSrv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-售后)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-售后)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="d" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} interval={4} />
        <YAxis tickLine={false} axisLine={false} fontSize={11} width={32} />
        <ChartTooltip cursor={{ stroke: "var(--border)" }} content={<ChartTooltipContent indicator="line" />} />
        <Area
          type="monotone"
          dataKey="整车"
          stroke="var(--color-整车)"
          strokeWidth={2}
          fill="url(#fillVeh)"
          stackId="a"
        />
        <Area
          type="monotone"
          dataKey="售后"
          stroke="var(--color-售后)"
          strokeWidth={2}
          fill="url(#fillSrv)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
