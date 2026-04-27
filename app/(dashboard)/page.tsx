import {
  Car,
  Wallet,
  Users,
  Wrench,
  Download,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Boxes,
  Receipt,
  PhoneCall,
  Target,
  PackageSearch,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SalesTrendChart } from "@/components/dashboard/charts/sales-trend"
import { ChannelBarChart } from "@/components/dashboard/charts/channel-bar"
import { InventoryDonut } from "@/components/dashboard/charts/inventory-donut"

export default function WorkbenchPage() {
  return (
    <div>
      <PageHeader
        title="运营概览 · 您好,王经理"
        description="欢迎回到智驰云,以下是华东大区今日的业务全景与待办。"
        crumbs={[{ label: "工作台" }, { label: "运营概览" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-4" /> 导出日报
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> 新建业务
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="今日整车销售"
            value="38"
            unit="台"
            trend={12.4}
            trendLabel="较昨日"
            icon={Car}
            accent="primary"
          />
          <StatCard
            label="本月营收"
            value="¥ 2,486.3"
            unit="万元"
            trend={6.8}
            trendLabel="环比上月"
            icon={Wallet}
            accent="accent"
          />
          <StatCard
            label="新增意向客户"
            value="156"
            trend={-3.2}
            trendLabel="较上周"
            icon={Users}
            accent="info"
          />
          <StatCard
            label="售后工单"
            value="284"
            unit="完工 / 312"
            trend={4.1}
            trendLabel="完工率 91%"
            icon={Wrench}
            accent="success"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <CardHeader className="flex-row items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">销售趋势 · 整车 & 售后</CardTitle>
                <CardDescription>近 30 天合同金额走势,单位:万元</CardDescription>
              </div>
              <Tabs defaultValue="30d">
                <TabsList className="h-8">
                  <TabsTrigger value="7d" className="text-xs px-2.5">7 天</TabsTrigger>
                  <TabsTrigger value="30d" className="text-xs px-2.5">30 天</TabsTrigger>
                  <TabsTrigger value="ytd" className="text-xs px-2.5">本年</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <SalesTrendChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">库存结构</CardTitle>
              <CardDescription>整车在库 1,248 台</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryDonut />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">渠道线索来源</CardTitle>
              <CardDescription>本月各渠道客户线索 / 成交转化率</CardDescription>
            </CardHeader>
            <CardContent>
              <ChannelBarChart />
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">快捷入口</CardTitle>
              <CardDescription>常用业务一键直达</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              {[
                { t: "新建商机", h: "/crm/leads", i: Target, c: "bg-primary/10 text-primary" },
                { t: "录入工单", h: "/dms/service", i: Wrench, c: "bg-emerald-500/10 text-emerald-600" },
                { t: "采购订单", h: "/erp/purchase", i: PackageSearch, c: "bg-sky-500/10 text-sky-600" },
                { t: "整车入库", h: "/dms/vehicles", i: Car, c: "bg-accent/30 text-accent-foreground" },
                { t: "客户回访", h: "/crm/tasks", i: PhoneCall, c: "bg-violet-500/10 text-violet-600" },
                { t: "财务凭证", h: "/erp/finance", i: Receipt, c: "bg-rose-500/10 text-rose-600" },
                { t: "员工开户", h: "/system/users", i: Users, c: "bg-amber-500/10 text-amber-600" },
                { t: "库存调拨", h: "/erp/inventory", i: Boxes, c: "bg-teal-500/10 text-teal-600" },
                { t: "经营分析", h: "/analytics", i: TrendingUp, c: "bg-indigo-500/10 text-indigo-600" },
              ].map((q) => (
                <Link
                  key={q.t}
                  href={q.h}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-md border border-border hover:border-primary/40 hover:bg-muted transition-colors text-center"
                >
                  <span className={`size-8 rounded-md grid place-items-center ${q.c}`}>
                    <q.i className="size-4" />
                  </span>
                  <span className="text-xs">{q.t}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom row: tasks + activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">销售目标进度</CardTitle>
                <CardDescription>各品牌 4 月达成情况</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">查看详情 <ArrowRight className="size-3.5" /></Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {[
                { brand: "大众", target: 320, actual: 268, color: "bg-chart-1" },
                { brand: "丰田", target: 260, actual: 241, color: "bg-chart-2" },
                { brand: "比亚迪", target: 200, actual: 218, color: "bg-emerald-500" },
                { brand: "奥迪", target: 120, actual: 86, color: "bg-chart-3" },
                { brand: "理想", target: 90, actual: 72, color: "bg-chart-5" },
              ].map((b) => {
                const pct = Math.min(150, Math.round((b.actual / b.target) * 100))
                const over = b.actual >= b.target
                return (
                  <div key={b.brand} className="grid grid-cols-12 items-center gap-3">
                    <div className="col-span-2 text-sm font-medium">{b.brand}</div>
                    <div className="col-span-7">
                      <Progress value={Math.min(100, pct)} className="h-2" />
                    </div>
                    <div className="col-span-3 text-right tabular-nums text-sm">
                      <span className={over ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}>{b.actual}</span>
                      <span className="text-muted-foreground"> / {b.target} 台</span>
                      <span className={`ml-2 text-[11px] ${over ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                        {pct}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">待办事项</CardTitle>
              <Badge variant="secondary" className="font-normal">12</Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {[
                { i: AlertTriangle, t: "PO-2026-0428 采购到货异常", d: "需要您审批", time: "10 分钟前", type: "warn" },
                { i: Clock, t: "杭州长安 4S 合同待审批", d: "金额 ¥168.6 万", time: "30 分钟前", type: "info" },
                { i: CheckCircle2, t: "RO-26041901 工单已完工", d: "等待质检确认", time: "1 小时前", type: "ok" },
                { i: Clock, t: "月度对账提醒", d: "截止 4/30 23:59", time: "今早", type: "info" },
                { i: AlertTriangle, t: "理想 L7 库龄 > 90 天", d: "建议促销", time: "今天", type: "warn" },
              ].map((todo) => {
                const colors = {
                  warn: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
                  info: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
                  ok: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                }[todo.type as "warn" | "info" | "ok"]
                return (
                  <div key={todo.t} className="flex items-start gap-3">
                    <span className={`size-7 rounded-md grid place-items-center shrink-0 ${colors}`}>
                      <todo.i className="size-3.5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{todo.t}</p>
                      <p className="text-xs text-muted-foreground truncate">{todo.d}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">{todo.time}</span>
                  </div>
                )
              })}
              <Separator />
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs">查看全部 <ArrowRight className="size-3.5" /></Button>
            </CardContent>
          </Card>
        </div>

        {/* Activity feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">团队动态</CardTitle>
            <CardDescription>最近的关键业务操作</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              { who: "张敏", role: "销售顾问", what: "签约新车销售合同", obj: "丰田凯美瑞 2.0G · ¥18.6 万", time: "15:42" },
              { who: "李强", role: "服务经理", what: "创建售后工单", obj: "RO-26042310 · 大众途观 L 5 万公里保养", time: "15:18" },
              { who: "陈蕾", role: "财务", what: "审批付款", obj: "采购单 PO-2026-0455 · ¥1,260,000", time: "14:55" },
              { who: "周鹏", role: "库管", what: "完成整车入库", obj: "比亚迪汉 EV 8 台 · 仓位 A-12", time: "14:20" },
              { who: "吴婷", role: "市场", what: "发布营销活动", obj: "“五一焕新购车节” · 全集团 12 家店", time: "11:30" },
              { who: "刘涛", role: "管理员", what: "调整角色权限", obj: "新增「区域经理」数据范围", time: "10:08" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">{a.who.slice(-1)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{a.who}</span>
                    <span className="text-muted-foreground"> · {a.role}</span>
                    <span className="text-muted-foreground"> · {a.what}</span>
                  </p>
                  <p className="text-sm text-foreground/80 truncate">{a.obj}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
