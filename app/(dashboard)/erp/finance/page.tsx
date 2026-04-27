import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ReceiptText,
  Plus,
  Download,
  CreditCard,
  Building2,
  CalendarDays,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CashflowChart } from "@/components/dashboard/charts/cashflow"

type Tx = {
  id: string
  type: "收款" | "付款" | "凭证"
  party: string
  amount: number
  status: "已完成" | "待审批" | "已驳回" | "处理中"
  account: string
  date: string
  category: string
}

const txs: Tx[] = [
  { id: "AR-2026-04-2418", type: "收款", party: "客户:陈志远", amount: 186000, status: "已完成", account: "招行 · 6612", date: "04-28 15:42", category: "整车销售" },
  { id: "AP-2026-04-1102", type: "付款", party: "供应商:一汽大众", amount: 1268000, status: "待审批", account: "工行 · 9908", date: "04-28 14:55", category: "整车采购" },
  { id: "AR-2026-04-2417", type: "收款", party: "客户:崔嘉怡", amount: 218000, status: "已完成", account: "支付宝企业账户", date: "04-28 11:28", category: "整车销售" },
  { id: "AP-2026-04-1095", type: "付款", party: "国寿财险", amount: 86400, status: "处理中", account: "招行 · 6612", date: "04-28 10:14", category: "保险代付" },
  { id: "JV-2026-04-0820", type: "凭证", party: "差旅费报销 · 销售部", amount: 12480, status: "已完成", account: "—", date: "04-28 09:30", category: "费用核算" },
  { id: "AR-2026-04-2402", type: "收款", party: "客户:王思颖 (定金)", amount: 30000, status: "已完成", account: "微信支付", date: "04-27 17:08", category: "整车销售" },
  { id: "AP-2026-04-1080", type: "付款", party: "宁波港务公司 · 港杂费", amount: 28600, status: "已驳回", account: "工行 · 9908", date: "04-27 16:21", category: "物流运输" },
  { id: "AR-2026-04-2389", type: "收款", party: "客户:赵雪 (尾款)", amount: 248000, status: "已完成", account: "招行 · 6612", date: "04-27 14:46", category: "整车销售" },
]

const statusColor: Record<Tx["status"], string> = {
  已完成: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0",
  待审批: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-0",
  已驳回: "bg-destructive/15 text-destructive border-0",
  处理中: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-0",
}
const typeColor: Record<Tx["type"], string> = {
  收款: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  付款: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  凭证: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
}

const fmt = (n: number) =>
  "¥ " + new Intl.NumberFormat("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)

export default function FinancePage() {
  return (
    <div>
      <PageHeader
        title="财务管理"
        description="应收应付、资金日记、凭证审批与对账核销中心。"
        crumbs={[{ label: "ERP 企业资源" }, { label: "财务管理" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-4" /> 导出报表
            </Button>
            <Button variant="outline" size="sm">
              <ReceiptText className="size-4" /> 期末结账
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> 新建凭证
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="本月营收" value="¥ 2,486.3" unit="万元" trend={6.8} trendLabel="环比" icon={Wallet} accent="primary" />
          <StatCard label="应收账款" value="¥ 386.4" unit="万元" trend={-4.2} trendLabel="账龄改善" icon={ArrowDownLeft} accent="info" />
          <StatCard label="应付账款" value="¥ 1,182.6" unit="万元" trend={2.6} trendLabel="环比" icon={ArrowUpRight} accent="accent" />
          <StatCard label="资金净流入" value="¥ 416.8" unit="万元" trend={8.4} trendLabel="较上月" icon={CreditCard} accent="success" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">现金流入流出</CardTitle>
              <CardDescription>近 12 个月经营性现金流(单位:万元)</CardDescription>
            </CardHeader>
            <CardContent>
              <CashflowChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">应收账款账龄</CardTitle>
              <CardDescription>合计 ¥ 386.4 万元</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {[
                { label: "0-30 天", val: 218, total: 386, color: "bg-emerald-500" },
                { label: "31-60 天", val: 96, total: 386, color: "bg-sky-500" },
                { label: "61-90 天", val: 42, total: 386, color: "bg-amber-500" },
                { label: "90 天以上", val: 30, total: 386, color: "bg-destructive" },
              ].map((r) => (
                <div key={r.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/80">{r.label}</span>
                    <span className="tabular-nums text-muted-foreground">¥ {r.val.toFixed(1)} 万 · {((r.val / r.total) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${r.color}`} style={{ width: `${(r.val / r.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">资金日记 · 最近交易</CardTitle>
              <CardDescription className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" /> 2026 年 4 月 · 期间 04-01 至 04-30
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">查看全部</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/50">
                  <TableHead>单据号</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>对方 / 摘要</TableHead>
                  <TableHead>核算科目</TableHead>
                  <TableHead>账户</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {txs.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs ${typeColor[t.type]}`}>
                        {t.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{t.party}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.category}</TableCell>
                    <TableCell className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
                      <Building2 className="size-3.5" /> {t.account}
                    </TableCell>
                    <TableCell className={`text-right tabular-nums font-medium ${t.type === "付款" ? "text-rose-600 dark:text-rose-400" : t.type === "收款" ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                      {t.type === "付款" ? "-" : t.type === "收款" ? "+" : ""}{fmt(t.amount)}
                    </TableCell>
                    <TableCell><Badge className={statusColor[t.status]}>{t.status}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground tabular-nums">{t.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
