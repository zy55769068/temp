import Link from "next/link"
import {
  Wrench,
  Plus,
  Filter,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  User,
  Car,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Order = {
  id: string
  plate: string
  vehicle: string
  customer: string
  type: "保养" | "维修" | "钣喷" | "事故" | "PDI"
  technician: string
  bay: string
  status: "已派工" | "施工中" | "待质检" | "完工" | "等待客户"
  enter: string
  est: string
  progress: number
  amount: string
  hot?: boolean
}

const orders: Order[] = [
  { id: "RO-26042310", plate: "浙A·8K39M", vehicle: "大众途观 L 5万公里保养", customer: "林浩然", type: "保养", technician: "钱师傅", bay: "工位 3", status: "施工中", enter: "10:24", est: "12:00", progress: 64, amount: "¥ 1,820" },
  { id: "RO-26042309", plate: "沪B·F992K", vehicle: "丰田凯美瑞 刹车异响检修", customer: "陈志远", type: "维修", technician: "孙师傅", bay: "工位 5", status: "待质检", enter: "09:18", est: "11:30", progress: 95, amount: "¥ 860" },
  { id: "RO-26042308", plate: "浙B·K612D", vehicle: "比亚迪汉 EV 三电检测", customer: "王思颖", type: "保养", technician: "李师傅", bay: "工位 2", status: "施工中", enter: "09:02", est: "11:00", progress: 48, amount: "¥ 460" },
  { id: "RO-26042307", plate: "苏E·9988L", vehicle: "奥迪 A4L 右前门钣喷", customer: "赵雪", type: "钣喷", technician: "周师傅", bay: "钣喷间", status: "施工中", enter: "08:42", est: "次日 16:00", progress: 22, amount: "¥ 4,680", hot: true },
  { id: "RO-26042306", plate: "浙A·12X88", vehicle: "理想 L7 OTA 升级 + 软件检测", customer: "黄海涛", type: "维修", technician: "吴师傅", bay: "工位 1", status: "已派工", enter: "08:30", est: "10:00", progress: 0, amount: "¥ 280" },
  { id: "RO-26042305", plate: "浙A·R773P", vehicle: "丰田卡罗拉 1万公里首保", customer: "苏婉清", type: "保养", technician: "钱师傅", bay: "工位 3", status: "完工", enter: "08:00", est: "09:30", progress: 100, amount: "¥ 320" },
  { id: "RO-26042304", plate: "浙E·7700Q", vehicle: "大众帕萨特 事故定损", customer: "范文杰", type: "事故", technician: "—", bay: "停放区", status: "等待客户", enter: "昨天", est: "等保险", progress: 30, amount: "评估中", hot: true },
  { id: "RO-26042303", plate: "浙B·E408Y", vehicle: "比亚迪海豹 PDI 出厂检测", customer: "—(车辆库存)", type: "PDI", technician: "李师傅", bay: "工位 2", status: "待质检", enter: "08:10", est: "10:00", progress: 90, amount: "—" },
]

const statusColor: Record<Order["status"], string> = {
  已派工: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-0",
  施工中: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-0",
  待质检: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-0",
  完工: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0",
  等待客户: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-0",
}
const typeColor: Record<Order["type"], string> = {
  保养: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  维修: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  钣喷: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  事故: "bg-destructive/10 text-destructive",
  PDI: "bg-primary/10 text-primary",
}

export default function ServicePage() {
  return (
    <div>
      <PageHeader
        title="售后维修工单"
        description="今日车间排产、施工进度与质检流程一目了然,掌控售后产值与效率。"
        crumbs={[{ label: "DMS 经销商管理" }, { label: "售后维修" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Calendar className="size-4" /> 排产看板
            </Button>
            <Button size="sm" asChild>
              <Link href="/dms/service/create">
                <Plus className="size-4" /> 创建工单
              </Link>
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="今日工单" value="312" trend={4.6} trendLabel="较昨日" icon={Wrench} accent="primary" />
          <StatCard label="进行中" value="86" trend={2.1} trendLabel="工位占用 78%" icon={Clock} accent="info" />
          <StatCard label="完工率" value="91.2" unit="%" trend={1.4} trendLabel="较上周" icon={CheckCircle2} accent="success" />
          <StatCard label="超时预警" value="6" unit="单" trend={-2.0} trendLabel="改善中" icon={AlertTriangle} accent="accent" />
        </div>

        <Card>
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">全部 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">312</Badge></TabsTrigger>
                  <TabsTrigger value="now">施工中 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">86</Badge></TabsTrigger>
                  <TabsTrigger value="qc">待质检 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">24</Badge></TabsTrigger>
                  <TabsTrigger value="done">已完工 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">186</Badge></TabsTrigger>
                  <TabsTrigger value="hold">待客户 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">16</Badge></TabsTrigger>
                </TabsList>
              </Tabs>
              <InputGroup className="w-full sm:w-72">
                <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                <InputGroupInput placeholder="搜索车牌 / 工单号 / 客户" />
              </InputGroup>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead>工单 / 车辆</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>客户</TableHead>
                    <TableHead>技师 / 工位</TableHead>
                    <TableHead>进度</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>进场 / 预计完工</TableHead>
                    <TableHead className="text-right">工单金额</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="size-9 rounded-md bg-muted text-muted-foreground grid place-items-center shrink-0">
                            <Car className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium flex items-center gap-1.5">
                              {o.plate}
                              {o.hot ? <Badge className="bg-destructive/15 text-destructive border-0 h-4 px-1 text-[10px]">急</Badge> : null}
                            </div>
                            <div className="text-xs text-muted-foreground">{o.vehicle}</div>
                            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{o.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs ${typeColor[o.type]}`}>{o.type}</span>
                      </TableCell>
                      <TableCell className="text-sm inline-flex items-center gap-1.5">
                        <User className="size-3.5 text-muted-foreground" /> {o.customer}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{o.technician}</div>
                        <div className="text-xs text-muted-foreground">{o.bay}</div>
                      </TableCell>
                      <TableCell className="w-40">
                        <div className="flex items-center gap-2">
                          <Progress value={o.progress} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground tabular-nums w-9 text-right">{o.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge className={statusColor[o.status]}>{o.status}</Badge></TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground">进 {o.enter}</div>
                        <div className="text-xs text-muted-foreground">出 {o.est}</div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm font-medium">{o.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
