"use client"

import { Bar, BarChart, CartesianGrid, Line, ComposedChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"

const data = [
  { m: "5月", 流入: 1820, 流出: 1480, 净流: 340 },
  { m: "6月", 流入: 2010, 流出: 1620, 净流: 390 },
  { m: "7月", 流入: 1960, 流出: 1710, 净流: 250 },
  { m: "8月", 流入: 2240, 流出: 1820, 净流: 420 },
  { m: "9月", 流入: 2350, 流出: 1980, 净流: 370 },
  { m: "10月", 流入: 2480, 流出: 1960, 净流: 520 },
  { m: "11月", 流入: 2660, 流出: 2090, 净流: 570 },
  { m: "12月", 流入: 2820, 流出: 2350, 净流: 470 },
  { m: "1月", 流入: 2120, 流出: 1880, 净流: 240 },
  { m: "2月", 流入: 2340, 流出: 1990, 净流: 350 },
  { m: "3月", 流入: 2510, 流出: 2080, 净流: 430 },
  { m: "4月", 流入: 2680, 流出: 2260, 净流: 420 },
]

const config = {
  流入: { label: "现金流入", color: "var(--chart-1)" },
  流出: { label: "现金流出", color: "var(--chart-3)" },
  净流: { label: "净流入", color: "var(--chart-2)" },
} satisfies ChartConfig

export function CashflowChart() {
  return (
    <ChartContainer config={config} className="aspect-[16/6] w-full">
      <ComposedChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={11} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} fontSize={11} width={40} />
        <ChartTooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="流入" fill="var(--color-流入)" radius={[3, 3, 0, 0]} maxBarSize={22} />
        <Bar dataKey="流出" fill="var(--color-流出)" radius={[3, 3, 0, 0]} maxBarSize={22} />
        <Line type="monotone" dataKey="净流" stroke="var(--color-净流)" strokeWidth={2.5} dot={{ r: 3 }} />
      </ComposedChart>
    </ChartContainer>
  )
}
