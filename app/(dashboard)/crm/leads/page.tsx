import {
  Plus,
  Filter,
  Target,
  ArrowRight,
  Phone,
  Calendar,
  TrendingUp,
  Search,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

type Stage = {
  key: string
  title: string
  hint: string
  tone: string
}

const stages: Stage[] = [
  { key: "new", title: "新线索", hint: "12", tone: "border-l-slate-400" },
  { key: "contact", title: "首次接触", hint: "9", tone: "border-l-sky-500" },
  { key: "demo", title: "试驾邀约", hint: "7", tone: "border-l-amber-500" },
  { key: "quote", title: "报价中", hint: "5", tone: "border-l-violet-500" },
  { key: "won", title: "已成交", hint: "本月 36", tone: "border-l-emerald-500" },
]

type Lead = {
  customer: string
  phone: string
  vehicle: string
  amount: string
  source: string
  owner: string
  next: string
  stage: string
  hot?: boolean
}

const leads: Lead[] = [
  { customer: "陈志远", phone: "138 **** 5612", vehicle: "丰田凯美瑞 2.0G", amount: "¥18.6 万", source: "汽车之家", owner: "张敏", next: "今晚 19:00 试驾", stage: "demo", hot: true },
  { customer: "王思颖", phone: "139 **** 8821", vehicle: "比亚迪汉 EV 700KM", amount: "¥24.8 万", source: "抖音直播", owner: "李伟", next: "今天 16:30 回访", stage: "contact", hot: true },
  { customer: "林浩然", phone: "186 **** 3399", vehicle: "大众途观 L 380TSI", amount: "¥29.8 万", source: "门店进店", owner: "周倩", next: "明天 10:00 预约", stage: "new" },
  { customer: "赵雪", phone: "150 **** 6677", vehicle: "奥迪 A4L 40TFSI", amount: "¥31.4 万", source: "懂车帝", owner: "张敏", next: "—", stage: "won" },
  { customer: "黄海涛", phone: "159 **** 1023", vehicle: "理想 L7 Pro", amount: "¥33.8 万", source: "二网转介", owner: "孙磊", next: "5/1 09:30 试驾", stage: "demo" },
  { customer: "苏婉清", phone: "187 **** 4501", vehicle: "丰田卡罗拉 1.5L", amount: "¥12.4 万", source: "微信社群", owner: "周倩", next: "5/2 11:00 沟通", stage: "new" },
  { customer: "范文杰", phone: "131 **** 7766", vehicle: "大众帕萨特 330", amount: "¥22.6 万", source: "电话邀约", owner: "李伟", next: "等待方案确认", stage: "quote" },
  { customer: "崔嘉怡", phone: "176 **** 2233", vehicle: "比亚迪海豹 EV", amount: "¥21.8 万", source: "汽车之家", owner: "孙磊", next: "—", stage: "won" },
  { customer: "贺天宇", phone: "182 **** 1190", vehicle: "奥迪 Q5L 45TFSI", amount: "¥42.6 万", source: "门店进店", owner: "李伟", next: "5/3 报价确认", stage: "quote" },
  { customer: "钱玥", phone: "189 **** 8821", vehicle: "理想 L9 Max", amount: "¥45.8 万", source: "汽车之家", owner: "张敏", next: "今天 17:00 复访", stage: "contact" },
  { customer: "齐昊", phone: "180 **** 4002", vehicle: "丰田汉兰达 2.5HV", amount: "¥28.9 万", source: "抖音直播", owner: "周倩", next: "明天首次接触", stage: "new" },
  { customer: "汪悦", phone: "133 **** 5599", vehicle: "比亚迪宋 PLUS DM-i", amount: "¥16.4 万", source: "门店进店", owner: "孙磊", next: "周末试驾", stage: "demo" },
]

export default function LeadsPage() {
  return (
    <div>
      <PageHeader
        title="销售商机"
        description="可视化销售管道:线索 → 接触 → 试驾 → 报价 → 成交,实时把控转化漏斗。"
        crumbs={[{ label: "CRM 客户关系" }, { label: "销售商机" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="size-4" /> 筛选
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> 新建商机
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="本月新建商机" value="248" trend={9.2} trendLabel="较上月" icon={Target} accent="primary" />
          <StatCard label="管道总金额" value="¥ 5,680" unit="万元" trend={12.8} trendLabel="加权" icon={TrendingUp} accent="accent" />
          <StatCard label="平均成交周期" value="14.2" unit="天" trend={-1.6} trendLabel="缩短" icon={Calendar} accent="info" />
          <StatCard label="本月成交率" value="32.4" unit="%" trend={2.1} trendLabel="转化提升" icon={ArrowRight} accent="success" />
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-3 flex-wrap">
            <div>
              <CardTitle className="text-base">商机看板</CardTitle>
              <CardDescription>拖拽卡片可在阶段间流转</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <InputGroup className="w-64">
                <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                <InputGroupInput placeholder="搜索客户 / 车型" />
              </InputGroup>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {stages.map((s) => {
                const items = leads.filter((l) => l.stage === s.key)
                return (
                  <div key={s.key} className="flex flex-col gap-3 min-w-0">
                    <div className={`flex items-center justify-between border-l-2 pl-2 ${s.tone}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{s.title}</span>
                        <Badge variant="secondary" className="font-normal h-5 px-1.5 text-[10px]">{items.length}</Badge>
                      </div>
                      <span className="text-[11px] text-muted-foreground">{s.hint}</span>
                    </div>
                    <div className="flex flex-col gap-2.5 min-h-[120px]">
                      {items.map((l) => (
                        <div
                          key={l.customer + l.vehicle}
                          className="rounded-md border border-border bg-card p-3 flex flex-col gap-2 hover:border-primary/40 hover:shadow-sm transition-all cursor-grab"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Avatar className="size-7">
                                <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px]">{l.customer.slice(0, 1)}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="text-sm font-medium truncate">{l.customer}</div>
                                <div className="text-[11px] text-muted-foreground inline-flex items-center gap-1 truncate">
                                  <Phone className="size-2.5" /> {l.phone}
                                </div>
                              </div>
                            </div>
                            {l.hot ? (
                              <Badge className="bg-destructive/15 text-destructive border-0 h-5 px-1.5 text-[10px]">热</Badge>
                            ) : null}
                          </div>
                          <div className="text-xs text-foreground/80 leading-relaxed">{l.vehicle}</div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-muted-foreground">{l.source}</span>
                            <span className="font-medium tabular-nums text-primary">{l.amount}</span>
                          </div>
                          <div className="flex items-center justify-between pt-1.5 border-t border-border">
                            <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                              <Calendar className="size-2.5" /> {l.next}
                            </span>
                            <span className="text-[11px] text-foreground/70">{l.owner}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
