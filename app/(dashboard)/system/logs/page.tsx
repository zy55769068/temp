import {
  ScrollText,
  Download,
  Filter,
  Search,
  Calendar,
  Globe,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

type Log = {
  id: string
  user: string
  role: string
  module: string
  action: string
  target: string
  ip: string
  ua: string
  result: "成功" | "失败" | "警告"
  time: string
  cost: string
}

const logs: Log[] = [
  { id: "L-26042815432", user: "刘涛", role: "系统管理员", module: "角色权限", action: "更新角色 [REGION_GM] 权限", target: "新增「整车采购审批」", ip: "10.21.45.112", ua: "Chrome 124 / macOS", result: "成功", time: "2026-04-28 15:42:18", cost: "126ms" },
  { id: "L-26042815385", user: "王建华", role: "区域总经理", module: "销售订单", action: "审批合同", target: "SO-26042810 ¥186,000", ip: "10.21.42.18", ua: "Chrome 124 / Windows", result: "成功", time: "2026-04-28 15:38:52", cost: "248ms" },
  { id: "L-26042815260", user: "陈蕾", role: "财务主管", module: "财务管理", action: "审批付款", target: "AP-2026-04-1102 ¥1,268,000", ip: "10.21.42.66", ua: "Chrome 124 / Windows", result: "成功", time: "2026-04-28 14:55:08", cost: "182ms" },
  { id: "L-26042814280", user: "周鹏", role: "库管员", module: "整车库存", action: "整车入库", target: "比亚迪汉 EV × 8", ip: "10.21.45.92", ua: "Edge 124 / Windows", result: "成功", time: "2026-04-28 14:20:14", cost: "412ms" },
  { id: "L-26042813920", user: "(未知用户)", role: "—", module: "登录", action: "尝试登录失败", target: "账号 admin", ip: "203.156.21.88", ua: "Curl 8.5", result: "失败", time: "2026-04-28 13:42:00", cost: "—" },
  { id: "L-26042813780", user: "孙磊", role: "销售顾问", module: "客户管理", action: "导出客户数据", target: "杭州旗舰店 / 86 条", ip: "10.21.45.46", ua: "Chrome 124 / macOS", result: "警告", time: "2026-04-28 13:28:42", cost: "1.8s" },
  { id: "L-26042813620", user: "张敏", role: "销售顾问", module: "销售商机", action: "新建商机", target: "客户 陈志远 / 凯美瑞", ip: "10.21.45.18", ua: "Chrome 124 / Windows", result: "成功", time: "2026-04-28 13:16:08", cost: "94ms" },
  { id: "L-26042813105", user: "李伟", role: "销售经理", module: "销售订单", action: "驳回合同", target: "SO-26042782", ip: "10.21.45.20", ua: "Chrome 124 / Windows", result: "成功", time: "2026-04-28 13:01:55", cost: "112ms" },
  { id: "L-26042812801", user: "刘涛", role: "系统管理员", module: "用户管理", action: "禁用用户", target: "U-1201 / 孙磊", ip: "10.21.45.112", ua: "Chrome 124 / macOS", result: "失败", time: "2026-04-28 12:47:12", cost: "208ms" },
  { id: "L-26042811600", user: "黄佳", role: "服务经理", module: "售后维修", action: "完工质检", target: "RO-26041901", ip: "10.21.50.18", ua: "Chrome 124 / Windows", result: "成功", time: "2026-04-28 11:38:46", cost: "144ms" },
  { id: "L-26042810420", user: "吴婷", role: "市场专员", module: "营销活动", action: "发布活动", target: "“五一焕新购车节”", ip: "10.21.45.220", ua: "Chrome 124 / macOS", result: "成功", time: "2026-04-28 11:08:32", cost: "318ms" },
]

const resultColor: Record<Log["result"], string> = {
  成功: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0",
  失败: "bg-destructive/15 text-destructive border-0",
  警告: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-0",
}

export default function LogsPage() {
  return (
    <div>
      <PageHeader
        title="操作日志"
        description="完整记录用户操作、系统事件与登录行为,满足合规审计与故障溯源需求。"
        crumbs={[{ label: "系统管理" }, { label: "操作日志" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Calendar className="size-4" /> 自定义时间
            </Button>
            <Button variant="outline" size="sm">
              <Download className="size-4" /> 导出日志
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="今日操作总量" value="12,486" trend={4.8} trendLabel="较昨日" icon={Activity} accent="primary" />
          <StatCard label="成功率" value="99.2" unit="%" trend={0.3} trendLabel="稳定" icon={CheckCircle2} accent="success" />
          <StatCard label="登录失败次数" value="38" trend={-12.4} trendLabel="风险下降" icon={XCircle} accent="info" />
          <StatCard label="高风险事件" value="3" trend={-50} trendLabel="较上周" icon={AlertTriangle} accent="accent" />
        </div>

        <Card>
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Tabs defaultValue="op">
                <TabsList>
                  <TabsTrigger value="op">操作日志</TabsTrigger>
                  <TabsTrigger value="login">登录日志</TabsTrigger>
                  <TabsTrigger value="sys">系统事件</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex flex-wrap items-center gap-2">
                <InputGroup className="w-full sm:w-72">
                  <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                  <InputGroupInput placeholder="搜索用户 / 模块 / IP" />
                </InputGroup>
                <Select defaultValue="all-mod">
                  <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-mod">全部模块</SelectItem>
                    <SelectItem value="erp">ERP</SelectItem>
                    <SelectItem value="crm">CRM</SelectItem>
                    <SelectItem value="dms">DMS</SelectItem>
                    <SelectItem value="sys">系统管理</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-result">
                  <SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-result">全部结果</SelectItem>
                    <SelectItem value="ok">成功</SelectItem>
                    <SelectItem value="warn">警告</SelectItem>
                    <SelectItem value="err">失败</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="size-4" /> 高级
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead>操作用户</TableHead>
                    <TableHead>模块</TableHead>
                    <TableHead>操作内容</TableHead>
                    <TableHead>操作对象</TableHead>
                    <TableHead>来源</TableHead>
                    <TableHead>结果</TableHead>
                    <TableHead>耗时</TableHead>
                    <TableHead>时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell>
                        <div className="text-sm font-medium">{l.user}</div>
                        <div className="text-xs text-muted-foreground">{l.role}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">{l.module}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{l.action}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{l.target}</TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Globe className="size-3" /> {l.ip}
                        </div>
                        <div className="text-xs text-muted-foreground">{l.ua}</div>
                      </TableCell>
                      <TableCell><Badge className={resultColor[l.result]}>{l.result}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums">{l.cost}</TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">{l.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm">
              <span className="text-muted-foreground">最近 7 天 · 共 86,420 条</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8">上一页</Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0">1</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">3</Button>
                <Button variant="outline" size="sm" className="h-8">下一页</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
