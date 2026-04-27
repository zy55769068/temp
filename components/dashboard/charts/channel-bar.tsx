"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"

const data = [
  { 渠道: "门店进店", 线索: 420, 成交: 168 },
  { 渠道: "电话邀约", 线索: 286, 成交: 92 },
  { 渠道: "汽车之家", 线索: 512, 成交: 158 },
  { 渠道: "懂车帝", 线索: 478, 成交: 142 },
  { 渠道: "抖音直播", 线索: 624, 成交: 188 },
  { 渠道: "微信社群", 线索: 348, 成交: 124 },
  { 渠道: "二网转介", 线索: 196, 成交: 98 },
]

const config = {
  线索: { label: "线索数", color: "var(--chart-1)" },
  成交: { label: "成交数", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChannelBarChart() {
  return (
    <ChartContainer config={config} className="aspect-[16/6] w-full">
      <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="渠道" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
        <YAxis tickLine={false} axisLine={false} fontSize={11} width={32} />
        <ChartTooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="线索" fill="var(--color-线索)" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="成交" fill="var(--color-成交)" radius={[4, 4, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ChartContainer>
  )
}
