import {
  Plus,
  Filter,
  Download,
  Upload,
  Search,
  Users,
  UserPlus,
  Star,
  Phone,
  MoreHorizontal,
  Tag,
  TrendingUp,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Customer = {
  id: string
  name: string
  phone: string
  level: "A" | "B" | "C" | "D"
  intent: "高" | "中" | "低"
  brand: string
  model: string
  source: string
  owner: string
  status: "潜客" | "跟进中" | "试驾" | "已成交" | "战败"
  next: string
  budget: string
}

const customers: Customer[] = [
  { id: "C-26041201", name: "陈志远", phone: "138 **** 5612", level: "A", intent: "高", brand: "丰田", model: "凯美瑞 2.0G", source: "汽车之家", owner: "张敏", status: "试驾", next: "04-29 10:00", budget: "18-22 万" },
  { id: "C-26041158", name: "王思颖", phone: "139 **** 8821", level: "A", intent: "高", brand: "比亚迪", model: "汉 EV 700KM", source: "抖音直播", owner: "李伟", status: "跟进中", next: "今天 16:30", budget: "22-26 万" },
  { id: "C-26041132", name: "林浩然", phone: "186 **** 3399", level: "B", intent: "中", brand: "大众", model: "途观 L 380TSI", source: "门店进店", owner: "周倩", status: "潜客", next: "04-30 14:00", budget: "25-30 万" },
  { id: "C-26041088", name: "赵雪", phone: "150 **** 6677", level: "A", intent: "高", brand: "奥迪", model: "A4L 40TFSI", source: "懂车帝", owner: "张敏", status: "已成交", next: "—", budget: "30-35 万" },
  { id: "C-26041061", name: "黄海涛", phone: "159 **** 1023", level: "B", intent: "中", brand: "理想", model: "L7 Pro", source: "二网转介", owner: "孙磊", status: "试驾", next: "05-01 09:30", budget: "32-38 万" },
  { id: "C-26041009", name: "苏婉清", phone: "187 **** 4501", level: "C", intent: "低", brand: "丰田", model: "卡罗拉 1.5L", source: "微信社群", owner: "周倩", status: "跟进中", next: "05-02 11:00", budget: "11-13 万" },
  { id: "C-26040987", name: "范文杰", phone: "131 **** 7766", level: "B", intent: "中", brand: "大众", model: "帕萨特 330", source: "电话邀约", owner: "李伟", status: "战败", next: "—", budget: "20-24 万" },
  { id: "C-26040955", name: "崔嘉怡", phone: "176 **** 2233", level: "A", intent: "高", brand: "比亚迪", model: "海豹 EV", source: "汽车之家", owner: "孙磊", status: "已成交", next: "—", budget: "20-23 万" },
]

const statusColor: Record<Customer["status"], string> = {
  潜客: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-0",
  跟进中: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-0",
  试驾: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-0",
  已成交: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0",
  战败: "bg-destructive/15 text-destructive border-0",
}
const levelColor: Record<Customer["level"], string> = {
  A: "bg-primary text-primary-foreground",
  B: "bg-sky-500 text-white",
  C: "bg-muted text-muted-foreground",
  D: "bg-muted text-muted-foreground",
}

export default function CustomersPage() {
  return (
    <div>
      <PageHeader
        title="客户管理"
        description="集中管理潜在客户、保有客户、流失客户的全生命周期信息与跟进进度。"
        crumbs={[{ label: "CRM 客户关系", href: "/crm/customers" }, { label: "客户管理" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Upload className="size-4" /> 导入
            </Button>
            <Button variant="outline" size="sm">
              <Download className="size-4" /> 导出
            </Button>
            <Button size="sm">
              <UserPlus className="size-4" /> 新建客户
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="保有客户总数" value="12,486" trend={3.4} trendLabel="月增" icon={Users} accent="primary" />
          <StatCard label="本月新增" value="248" trend={8.1} trendLabel="环比" icon={UserPlus} accent="info" />
          <StatCard label="A 级高意向" value="186" trend={5.2} trendLabel="周增" icon={Star} accent="accent" />
          <StatCard label="本月转化率" value="32.4" unit="%" trend={1.8} trendLabel="较上月" icon={TrendingUp} accent="success" />
        </div>

        <Card>
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">全部 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">12,486</Badge></TabsTrigger>
                  <TabsTrigger value="lead">潜客 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">2,184</Badge></TabsTrigger>
                  <TabsTrigger value="active">跟进中 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">658</Badge></TabsTrigger>
                  <TabsTrigger value="won">已成交 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">9,212</Badge></TabsTrigger>
                  <TabsTrigger value="lost">流失 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">432</Badge></TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-wrap items-center gap-2">
                <InputGroup className="w-full sm:w-72">
                  <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                  <InputGroupInput placeholder="搜索姓名 / 手机号 / 客户编号" />
                </InputGroup>
                <Select defaultValue="all-brand">
                  <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-brand">全部品牌</SelectItem>
                    <SelectItem value="vw">大众</SelectItem>
                    <SelectItem value="ty">丰田</SelectItem>
                    <SelectItem value="byd">比亚迪</SelectItem>
                    <SelectItem value="audi">奥迪</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-owner">
                  <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-owner">全部顾问</SelectItem>
                    <SelectItem value="zm">张敏</SelectItem>
                    <SelectItem value="lw">李伟</SelectItem>
                    <SelectItem value="zq">周倩</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="size-4" /> 高级筛选
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="w-10"><Checkbox aria-label="全选" /></TableHead>
                    <TableHead>客户</TableHead>
                    <TableHead>等级 / 意向</TableHead>
                    <TableHead>意向车型</TableHead>
                    <TableHead>来源</TableHead>
                    <TableHead>跟进顾问</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>下次跟进</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((c) => (
                    <TableRow key={c.id} className="group">
                      <TableCell><Checkbox aria-label={`选择 ${c.name}`} /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">{c.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="text-sm font-medium">{c.name}</div>
                            <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                              <Phone className="size-3" /> {c.phone} · {c.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`size-6 rounded text-xs font-medium grid place-items-center ${levelColor[c.level]}`}>{c.level}</span>
                          <span className="text-xs text-muted-foreground">{c.intent}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{c.brand} · {c.model}</div>
                        <div className="text-xs text-muted-foreground">预算 {c.budget}</div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag className="size-3" /> {c.source}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{c.owner}</TableCell>
                      <TableCell>
                        <Badge className={statusColor[c.status]}>{c.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">{c.next}</TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 text-xs">跟进</Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">详情</Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8" aria-label="更多">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>转交他人</DropdownMenuItem>
                              <DropdownMenuItem>邀约试驾</DropdownMenuItem>
                              <DropdownMenuItem>新建商机</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">标记为战败</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm">
              <span className="text-muted-foreground">共 12,486 条记录,已选 0 条</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8">上一页</Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0">1</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">3</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">…</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">312</Button>
                <Button variant="outline" size="sm" className="h-8">下一页</Button>
                <Select defaultValue="20">
                  <SelectTrigger className="ml-2 h-8 w-[110px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20 条 / 页</SelectItem>
                    <SelectItem value="50">50 条 / 页</SelectItem>
                    <SelectItem value="100">100 条 / 页</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
