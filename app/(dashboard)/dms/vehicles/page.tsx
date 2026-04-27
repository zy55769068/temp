import {
  Car,
  Plus,
  Filter,
  Download,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Truck,
  Search,
  MapPin,
  Calendar,
  Fuel,
  Palette,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Vehicle = {
  vin: string
  brand: string
  model: string
  trim: string
  color: string
  cost: string
  status: "在库" | "已锁定" | "在途" | "待PDI" | "库龄超期"
  age: number
  location: string
  arrival: string
  fuel: string
}

const vehicles: Vehicle[] = [
  { vin: "LFV2A21K8N31***124", brand: "大众", model: "途观 L", trim: "380TSI 旗舰版", color: "极地白", cost: "29.8 万", status: "在库", age: 12, location: "总仓 A-12", arrival: "2026-04-12", fuel: "汽油" },
  { vin: "LSGFB52H4PS5***088", brand: "比亚迪", model: "汉 EV", trim: "700KM 创世版", color: "时光灰", cost: "26.5 万", status: "已锁定", age: 5, location: "展厅 D-3", arrival: "2026-04-19", fuel: "纯电" },
  { vin: "JT2BG28K7L00***331", brand: "丰田", model: "凯美瑞", trim: "2.0G 豪华版", color: "珍珠白", cost: "16.2 万", status: "在库", age: 22, location: "总仓 A-08", arrival: "2026-04-02", fuel: "汽油" },
  { vin: "WAUZZZ8K9MA0***657", brand: "奥迪", model: "A4L", trim: "40 TFSI 时尚动感型", color: "玛雅蓝", cost: "28.6 万", status: "在途", age: 0, location: "上海港 → 仓", arrival: "预计 2026-04-30", fuel: "汽油" },
  { vin: "LRWZG9E51NC1***002", brand: "理想", model: "L7", trim: "Pro", color: "曜石黑", cost: "31.8 万", status: "待PDI", age: 3, location: "PDI 工位 P-2", arrival: "2026-04-21", fuel: "增程" },
  { vin: "LSGFB52H8PS5***412", brand: "比亚迪", model: "海豹", trim: "650KM 四驱版", color: "深空灰", cost: "21.6 万", status: "在库", age: 95, location: "总仓 B-04", arrival: "2026-01-18", fuel: "纯电" },
  { vin: "LFV3B12K0N31***995", brand: "大众", model: "帕萨特", trim: "330TSI 商务版", color: "钛灰色", cost: "20.4 万", status: "库龄超期", age: 132, location: "总仓 B-02", arrival: "2025-12-12", fuel: "汽油" },
  { vin: "JT3HL16K6N00***228", brand: "丰田", model: "卡罗拉", trim: "1.5L 精英版", color: "陶瓷白", cost: "10.8 万", status: "在库", age: 18, location: "总仓 A-05", arrival: "2026-04-06", fuel: "汽油" },
]

const statusColor: Record<Vehicle["status"], string> = {
  在库: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0",
  已锁定: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-0",
  在途: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-0",
  待PDI: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-0",
  库龄超期: "bg-destructive/15 text-destructive border-0",
}

export default function VehiclesPage() {
  return (
    <div>
      <PageHeader
        title="整车库存管理"
        description="实时跟踪全集团 12 家门店的整车在库、在途、PDI、锁车状态,辅助库存周转决策。"
        crumbs={[{ label: "DMS 经销商管理" }, { label: "整车库存" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-4" /> 导出库存
            </Button>
            <Button variant="outline" size="sm">
              <Truck className="size-4" /> 调拨申请
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> 整车入库
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="在库整车" value="1,248" unit="台" trend={2.1} trendLabel="较昨日" icon={Car} accent="primary" />
          <StatCard label="平均库龄" value="42" unit="天" trend={-3.5} trendLabel="周转加快" icon={Clock} accent="info" />
          <StatCard label="库龄 > 90 天" value="48" unit="台" trend={6.4} trendLabel="需关注" icon={AlertTriangle} accent="accent" />
          <StatCard label="本月入库" value="218" unit="台" trend={11.2} trendLabel="较上月" icon={CheckCircle2} accent="success" />
        </div>

        <Card>
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">全部 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">1,248</Badge></TabsTrigger>
                  <TabsTrigger value="ready">在库 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">768</Badge></TabsTrigger>
                  <TabsTrigger value="locked">已锁定 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">184</Badge></TabsTrigger>
                  <TabsTrigger value="transit">在途 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">156</Badge></TabsTrigger>
                  <TabsTrigger value="pdi">待PDI <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">92</Badge></TabsTrigger>
                  <TabsTrigger value="aged">库龄超期 <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">48</Badge></TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-wrap items-center gap-2">
                <InputGroup className="w-full sm:w-72">
                  <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                  <InputGroupInput placeholder="按 VIN / 车型 / 仓位搜索" />
                </InputGroup>
                <Select defaultValue="all-store">
                  <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-store">全部门店</SelectItem>
                    <SelectItem value="hz">杭州旗舰店</SelectItem>
                    <SelectItem value="sh">上海浦东店</SelectItem>
                    <SelectItem value="nb">宁波鄞州店</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="size-4" /> 筛选
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead>VIN / 车型</TableHead>
                    <TableHead>颜色</TableHead>
                    <TableHead>燃料</TableHead>
                    <TableHead>成本价</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>库龄</TableHead>
                    <TableHead>仓位 / 门店</TableHead>
                    <TableHead>入库 / 到港</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((v) => {
                    const aged = v.age >= 90
                    return (
                      <TableRow key={v.vin} className="group">
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <div className="size-9 rounded-md bg-muted text-muted-foreground grid place-items-center shrink-0">
                              <Car className="size-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium">{v.brand} · {v.model}</div>
                              <div className="text-xs text-muted-foreground">{v.trim}</div>
                              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{v.vin}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <Palette className="size-3.5 text-muted-foreground" /> {v.color}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <Fuel className="size-3.5 text-muted-foreground" /> {v.fuel}
                          </span>
                        </TableCell>
                        <TableCell className="tabular-nums text-sm">¥ {v.cost}</TableCell>
                        <TableCell><Badge className={statusColor[v.status]}>{v.status}</Badge></TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 text-sm tabular-nums ${aged ? "text-destructive font-medium" : ""}`}>
                            {v.age} 天
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <MapPin className="size-3.5 text-muted-foreground" /> {v.location}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="size-3" /> {v.arrival}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 text-xs">详情</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs">锁车</Button>
                            <Button variant="ghost" size="sm" className="h-8 text-xs">调拨</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
