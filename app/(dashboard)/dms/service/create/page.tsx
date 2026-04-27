"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import Link from "next/link"
import {
  Plus,
  Trash2,
  Car,
  User,
  Wrench,
  Package,
  Save,
  Search,
  Loader2,
  Phone,
  ArrowLeft,
  FileText,
  Calculator,
  ChevronRight,
  X,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// ============ Mock Data & API ============

type Customer = {
  id: string
  name: string
  phone: string
  idCard?: string
  address?: string
}

type Vehicle = {
  id: string
  plate: string
  brand: string
  model: string
  vin?: string
  customerId: string
  customerName: string
}

type ServiceItem = {
  id: string
  code: string
  name: string
  category: string
  laborHours: number
  laborRate: number
}

type PartItem = {
  id: string
  code: string
  name: string
  category: string
  unit: string
  price: number
  stock: number
}

// Mock customers
const mockCustomers: Customer[] = Array.from({ length: 200 }, (_, i) => ({
  id: `c${i + 1}`,
  name: ["林浩然", "陈志远", "王思颖", "赵雪", "黄海涛", "苏婉清", "张伟", "刘芳", "李强", "周敏"][i % 10] + (i > 9 ? `${Math.floor(i / 10)}` : ""),
  phone: `1${["38", "39", "37", "36", "35", "58", "59", "86", "87", "88"][i % 10]}${String(10000000 + i * 1234).slice(-8)}`,
  idCard: `3301${String(1980 + (i % 30))}${String(101 + (i % 28)).padStart(4, "0")}${String(1000 + i).slice(-4)}`,
  address: `浙江省杭州市${["西湖区", "拱墅区", "滨江区", "余杭区", "萧山区"][i % 5]}某某路${100 + i}号`,
}))

// Mock vehicles
const mockVehicles: Vehicle[] = Array.from({ length: 300 }, (_, i) => {
  const customerIdx = i % mockCustomers.length
  return {
    id: `v${i + 1}`,
    plate: `浙${["A", "B", "C", "D", "E", "F"][i % 6]}·${String(Math.random()).slice(2, 7)}`,
    brand: ["大众", "奥迪", "丰田", "比亚迪", "理想", "宝马", "奔驰", "特斯拉", "蔚来", "本田"][i % 10],
    model: ["途观L", "A6L", "凯美瑞", "汉EV", "L7", "X3", "GLC", "Model Y", "ES6", "雅阁"][i % 10],
    vin: `LFV${String(Math.random()).slice(2, 18).toUpperCase()}`,
    customerId: mockCustomers[customerIdx].id,
    customerName: mockCustomers[customerIdx].name,
  }
})

// Mock service items
const mockServices: ServiceItem[] = Array.from({ length: 150 }, (_, i) => ({
  id: `s${i + 1}`,
  code: `SVC${String(1001 + i)}`,
  name: [
    "机油更换", "机油滤清器更换", "空气滤清器更换", "空调滤清器更换",
    "刹车片更换(前)", "刹车片更换(后)", "轮胎更换", "四轮定位",
    "发动机检测", "变速箱油更换", "火花塞更换", "蓄电池检测",
    "冷却液更换", "制动液更换", "转向助力油更换"
  ][i % 15] + (i >= 15 ? ` #${Math.floor(i / 15) + 1}` : ""),
  category: ["保养", "维修", "检测", "钣喷", "轮胎"][i % 5],
  laborHours: [0.5, 0.3, 0.2, 0.3, 1.0, 1.0, 0.5, 1.0, 1.5, 1.0, 0.8, 0.3, 0.5, 0.5, 0.5][i % 15],
  laborRate: [120, 80, 60, 80, 200, 200, 100, 180, 300, 250, 150, 60, 100, 100, 100][i % 15],
}))

// Mock parts
const mockParts: PartItem[] = Array.from({ length: 200 }, (_, i) => ({
  id: `p${i + 1}`,
  code: `PRT${String(2001 + i)}`,
  name: [
    "嘉实多极护 5W-40 机油 4L", "博世机油滤清器", "曼牌空气滤清器",
    "马勒空调滤清器", "博世刹车片(前)", "博世刹车片(后)",
    "米其林轮胎 225/45R17", "防冻液 2L", "雨刮片(对)", "火花塞(4支装)",
    "NGK火花塞", "德尔福点火线圈", "博世蓄电池", "壳牌机油 5W-30",
    "普利司通轮胎 215/55R16"
  ][i % 15] + (i >= 15 ? ` #${Math.floor(i / 15) + 1}` : ""),
  category: ["机油", "滤清器", "制动", "轮胎", "电器", "其他"][i % 6],
  unit: ["桶", "个", "套", "条", "瓶", "对"][i % 6],
  price: [388, 68, 128, 98, 580, 480, 780, 68, 128, 320, 45, 280, 650, 358, 620][i % 15] + i * 2,
  stock: Math.floor(Math.random() * 100) + 5,
}))

// Async search with delay
async function searchCustomers(query: string): Promise<Customer[]> {
  await new Promise((r) => setTimeout(r, 300))
  if (!query.trim()) return mockCustomers.slice(0, 30)
  const q = query.toLowerCase()
  return mockCustomers.filter((c) => 
    c.name.toLowerCase().includes(q) || c.phone.includes(q)
  ).slice(0, 30)
}

async function searchVehicles(query: string, customerId?: string): Promise<Vehicle[]> {
  await new Promise((r) => setTimeout(r, 300))
  let results = mockVehicles
  if (customerId) {
    results = results.filter((v) => v.customerId === customerId)
  }
  if (query.trim()) {
    const q = query.toLowerCase()
    results = results.filter((v) => 
      v.plate.toLowerCase().includes(q) || 
      v.brand.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.customerName.toLowerCase().includes(q)
    )
  }
  return results.slice(0, 30)
}

async function searchServices(query: string, category?: string): Promise<ServiceItem[]> {
  await new Promise((r) => setTimeout(r, 200))
  let results = mockServices
  if (category && category !== "all") {
    results = results.filter((s) => s.category === category)
  }
  if (query.trim()) {
    const q = query.toLowerCase()
    results = results.filter((s) => 
      s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    )
  }
  return results.slice(0, 30)
}

async function searchParts(query: string, category?: string): Promise<PartItem[]> {
  await new Promise((r) => setTimeout(r, 200))
  let results = mockParts
  if (category && category !== "all") {
    results = results.filter((p) => p.category === category)
  }
  if (query.trim()) {
    const q = query.toLowerCase()
    results = results.filter((p) => 
      p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
    )
  }
  return results.slice(0, 30)
}

// ============ Hooks ============

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

// ============ Types ============

type ServiceLineItem = {
  id: string
  type: "service"
  serviceId: string
  serviceName: string
  laborHours: number
  laborRate: number
}

type PartLineItem = {
  id: string
  type: "part"
  partId: string
  partName: string
  unit: string
  quantity: number
  unitPrice: number
}

type LineItem = ServiceLineItem | PartLineItem

// ============ Static Data ============

const technicians = [
  { id: "t1", name: "钱师傅", specialty: "保养/维修" },
  { id: "t2", name: "孙师傅", specialty: "底盘/制动" },
  { id: "t3", name: "李师傅", specialty: "电路/新能源" },
  { id: "t4", name: "周师傅", specialty: "钣喷" },
  { id: "t5", name: "吴师傅", specialty: "综合维修" },
]

const workBays = [
  { id: "b1", name: "工位 1" },
  { id: "b2", name: "工位 2" },
  { id: "b3", name: "工位 3" },
  { id: "b4", name: "工位 5" },
  { id: "b5", name: "钣喷间" },
]

// ============ Selection Dialogs ============

interface CustomerVehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (customer: Customer, vehicle: Vehicle) => void
}

function CustomerVehicleDialog({ open, onOpenChange, onSelect }: CustomerVehicleDialogProps) {
  const [tab, setTab] = useState<"customer" | "vehicle">("customer")
  const [customerQuery, setCustomerQuery] = useState("")
  const [vehicleQuery, setVehicleQuery] = useState("")
  const [customers, setCustomers] = useState<Customer[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const debouncedCustomerQuery = useDebounce(customerQuery, 300)
  const debouncedVehicleQuery = useDebounce(vehicleQuery, 300)

  // Search customers
  useEffect(() => {
    if (!open || tab !== "customer") return
    let cancelled = false
    setLoading(true)
    searchCustomers(debouncedCustomerQuery).then((data) => {
      if (!cancelled) {
        setCustomers(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [debouncedCustomerQuery, open, tab])

  // Search vehicles
  useEffect(() => {
    if (!open || tab !== "vehicle") return
    let cancelled = false
    setLoading(true)
    searchVehicles(debouncedVehicleQuery).then((data) => {
      if (!cancelled) {
        setVehicles(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [debouncedVehicleQuery, open, tab])

  // Load vehicles for selected customer
  useEffect(() => {
    if (!selectedCustomer) return
    let cancelled = false
    setLoading(true)
    searchVehicles("", selectedCustomer.id).then((data) => {
      if (!cancelled) {
        setVehicles(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [selectedCustomer])

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleSelectVehicle = (vehicle: Vehicle) => {
    const customer = selectedCustomer || mockCustomers.find((c) => c.id === vehicle.customerId)
    if (customer) {
      onSelect(customer, vehicle)
      onOpenChange(false)
      // Reset state
      setSelectedCustomer(null)
      setCustomerQuery("")
      setVehicleQuery("")
      setTab("customer")
    }
  }

  const handleVehicleFromList = (vehicle: Vehicle) => {
    const customer = mockCustomers.find((c) => c.id === vehicle.customerId)
    if (customer) {
      onSelect(customer, vehicle)
      onOpenChange(false)
      setSelectedCustomer(null)
      setCustomerQuery("")
      setVehicleQuery("")
      setTab("customer")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>选择客户与车辆</DialogTitle>
          <DialogDescription>
            可以先选客户再选车辆，或直接按车牌号搜索车辆
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "customer" | "vehicle")} className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="customer" className="gap-2">
              <User className="size-4" /> 按客户查找
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="gap-2">
              <Car className="size-4" /> 按车辆查找
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="flex-1 flex flex-col min-h-0 mt-4">
            {!selectedCustomer ? (
              <>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="输入客户姓名或手机号搜索..."
                    value={customerQuery}
                    onChange={(e) => setCustomerQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex-1 overflow-auto border rounded-lg min-h-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-32">姓名</TableHead>
                        <TableHead className="w-40">手机号</TableHead>
                        <TableHead>地址</TableHead>
                        <TableHead className="w-20 text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center">
                            <Loader2 className="size-5 animate-spin mx-auto text-muted-foreground" />
                          </TableCell>
                        </TableRow>
                      ) : customers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                            未找到匹配的客户
                          </TableCell>
                        </TableRow>
                      ) : (
                        customers.map((customer) => (
                          <TableRow 
                            key={customer.id} 
                            className="cursor-pointer"
                            onClick={() => handleSelectCustomer(customer)}
                          >
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell className="text-muted-foreground truncate max-w-xs">{customer.address}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="ghost">
                                选择 <ChevronRight className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg mb-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{selectedCustomer.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="size-3" /> {selectedCustomer.phone}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setSelectedCustomer(null)}>
                    <X className="size-4" /> 重新选择
                  </Button>
                </div>
                <div className="text-sm font-medium mb-2">选择该客户的车辆：</div>
                <div className="flex-1 overflow-auto border rounded-lg min-h-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-36">车牌号</TableHead>
                        <TableHead>品牌车型</TableHead>
                        <TableHead className="w-48">VIN</TableHead>
                        <TableHead className="w-20 text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center">
                            <Loader2 className="size-5 animate-spin mx-auto text-muted-foreground" />
                          </TableCell>
                        </TableRow>
                      ) : vehicles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                            该客户名下暂无车辆
                          </TableCell>
                        </TableRow>
                      ) : (
                        vehicles.map((vehicle) => (
                          <TableRow 
                            key={vehicle.id} 
                            className="cursor-pointer"
                            onClick={() => handleSelectVehicle(vehicle)}
                          >
                            <TableCell className="font-medium font-mono">{vehicle.plate}</TableCell>
                            <TableCell>{vehicle.brand} {vehicle.model}</TableCell>
                            <TableCell className="text-muted-foreground font-mono text-xs">{vehicle.vin}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="ghost">
                                选择
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="vehicle" className="flex-1 flex flex-col min-h-0 mt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="输入车牌号、品牌、车型或车主姓名搜索..."
                value={vehicleQuery}
                onChange={(e) => setVehicleQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex-1 overflow-auto border rounded-lg min-h-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-36">车牌号</TableHead>
                    <TableHead>品牌车型</TableHead>
                    <TableHead className="w-32">车主</TableHead>
                    <TableHead className="w-48">VIN</TableHead>
                    <TableHead className="w-20 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <Loader2 className="size-5 animate-spin mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : vehicles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                        未找到匹配的车辆
                      </TableCell>
                    </TableRow>
                  ) : (
                    vehicles.map((vehicle) => (
                      <TableRow 
                        key={vehicle.id} 
                        className="cursor-pointer"
                        onClick={() => handleVehicleFromList(vehicle)}
                      >
                        <TableCell className="font-medium font-mono">{vehicle.plate}</TableCell>
                        <TableCell>{vehicle.brand} {vehicle.model}</TableCell>
                        <TableCell>{vehicle.customerName}</TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">{vehicle.vin}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">
                            选择
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

interface ServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (service: ServiceItem) => void
}

function ServiceDialog({ open, onOpenChange, onSelect }: ServiceDialogProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [results, setResults] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setLoading(true)
    searchServices(debouncedQuery, category).then((data) => {
      if (!cancelled) {
        setResults(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [debouncedQuery, category, open])

  const handleSelect = (service: ServiceItem) => {
    onSelect(service)
    onOpenChange(false)
    setQuery("")
    setCategory("all")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="size-5" /> 添加维修项目
          </DialogTitle>
          <DialogDescription>
            搜索并选择维修项目，添加到工单中
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="输入项目名称或编码搜索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              <SelectItem value="保养">保养</SelectItem>
              <SelectItem value="维修">维修</SelectItem>
              <SelectItem value="检测">检测</SelectItem>
              <SelectItem value="钣喷">钣喷</SelectItem>
              <SelectItem value="轮胎">轮胎</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-auto border rounded-lg min-h-0 mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-28">编码</TableHead>
                <TableHead>项目名称</TableHead>
                <TableHead className="w-20 text-center">分类</TableHead>
                <TableHead className="w-24 text-right">工时</TableHead>
                <TableHead className="w-28 text-right">工时费</TableHead>
                <TableHead className="w-20 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Loader2 className="size-5 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    未找到匹配的维修项目
                  </TableCell>
                </TableRow>
              ) : (
                results.map((service) => (
                  <TableRow key={service.id} className="cursor-pointer" onClick={() => handleSelect(service)}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{service.code}</TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{service.laborHours}h</TableCell>
                    <TableCell className="text-right tabular-nums">¥{service.laborRate.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">添加</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PartDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (part: PartItem) => void
}

function PartDialog({ open, onOpenChange, onSelect }: PartDialogProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [results, setResults] = useState<PartItem[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setLoading(true)
    searchParts(debouncedQuery, category).then((data) => {
      if (!cancelled) {
        setResults(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [debouncedQuery, category, open])

  const handleSelect = (part: PartItem) => {
    onSelect(part)
    onOpenChange(false)
    setQuery("")
    setCategory("all")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="size-5" /> 添加配件
          </DialogTitle>
          <DialogDescription>
            搜索并选择配件，添加到工单中
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="输入配件名称或编码搜索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              <SelectItem value="机油">机油</SelectItem>
              <SelectItem value="滤清器">滤清器</SelectItem>
              <SelectItem value="制动">制动</SelectItem>
              <SelectItem value="轮胎">轮胎</SelectItem>
              <SelectItem value="电器">电器</SelectItem>
              <SelectItem value="其他">其他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-auto border rounded-lg min-h-0 mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-28">编码</TableHead>
                <TableHead>配件名称</TableHead>
                <TableHead className="w-20 text-center">分类</TableHead>
                <TableHead className="w-16 text-center">单位</TableHead>
                <TableHead className="w-20 text-right">库存</TableHead>
                <TableHead className="w-28 text-right">单价</TableHead>
                <TableHead className="w-20 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <Loader2 className="size-5 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    未找到匹配的配件
                  </TableCell>
                </TableRow>
              ) : (
                results.map((part) => (
                  <TableRow key={part.id} className="cursor-pointer" onClick={() => handleSelect(part)}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{part.code}</TableCell>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="text-xs">{part.category}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{part.unit}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      <span className={cn(part.stock < 10 && "text-destructive")}>{part.stock}</span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">¥{part.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">添加</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ============ Main Component ============

export default function CreateServiceOrderPage() {
  // Customer & Vehicle
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [customerVehicleDialogOpen, setCustomerVehicleDialogOpen] = useState(false)

  // Order info
  const [orderType, setOrderType] = useState("")
  const [technicianId, setTechnicianId] = useState("")
  const [bayId, setBayId] = useState("")
  const [estimatedDate, setEstimatedDate] = useState("")
  const [mileage, setMileage] = useState("")
  const [notes, setNotes] = useState("")
  const [discount, setDiscount] = useState(0)

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
  const [partDialogOpen, setPartDialogOpen] = useState(false)

  const handleSelectCustomerVehicle = useCallback((c: Customer, v: Vehicle) => {
    setCustomer(c)
    setVehicle(v)
  }, [])

  const addService = useCallback((service: ServiceItem) => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `line-${Date.now()}-${Math.random()}`,
        type: "service",
        serviceId: service.id,
        serviceName: service.name,
        laborHours: service.laborHours,
        laborRate: service.laborRate,
      },
    ])
  }, [])

  const addPart = useCallback((part: PartItem) => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `line-${Date.now()}-${Math.random()}`,
        type: "part",
        partId: part.id,
        partName: part.name,
        unit: part.unit,
        quantity: 1,
        unitPrice: part.price,
      },
    ])
  }, [])

  const removeLineItem = useCallback((id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateServiceItem = useCallback((id: string, field: "laborHours" | "laborRate", value: number) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id && item.type === "service" ? { ...item, [field]: value } : item
      )
    )
  }, [])

  const updatePartItem = useCallback((id: string, field: "quantity" | "unitPrice", value: number) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id && item.type === "part" ? { ...item, [field]: value } : item
      )
    )
  }, [])

  // Calculate totals
  const totals = useMemo(() => {
    let laborTotal = 0
    let partsTotal = 0
    lineItems.forEach((item) => {
      if (item.type === "service") {
        laborTotal += item.laborHours * item.laborRate
      } else {
        partsTotal += item.quantity * item.unitPrice
      }
    })
    const subtotal = laborTotal + partsTotal
    const discountAmount = subtotal * (discount / 100)
    const total = subtotal - discountAmount
    return { laborTotal, partsTotal, subtotal, discountAmount, total }
  }, [lineItems, discount])

  const serviceItems = lineItems.filter((i): i is ServiceLineItem => i.type === "service")
  const partItems = lineItems.filter((i): i is PartLineItem => i.type === "part")

  return (
    <div className="min-h-screen bg-muted/30">
      <PageHeader
        title="创建维修工单"
        description="录入客户车辆信息，添加维修项目和配件"
        crumbs={[
          { label: "DMS" },
          { label: "售后维修", href: "/dms/service" },
          { label: "创建工单" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dms/service">
                <ArrowLeft className="size-4" /> 返回列表
              </Link>
            </Button>
            <Button size="sm">
              <Save className="size-4" /> 保存工单
            </Button>
          </div>
        }
      />

      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Main Form */}
          <div className="xl:col-span-2 space-y-6">
            {/* Customer & Vehicle Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="size-4 text-primary" />
                  客户与车辆信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!customer || !vehicle ? (
                  <Button 
                    variant="outline" 
                    className="w-full h-24 border-dashed flex flex-col gap-2"
                    onClick={() => setCustomerVehicleDialogOpen(true)}
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="size-5" />
                      <span className="text-lg">/</span>
                      <Car className="size-5" />
                    </div>
                    <span className="text-sm">点击选择客户与车辆</span>
                  </Button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{customer.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="size-3" /> {customer.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Car className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium font-mono truncate">{vehicle.plate}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {vehicle.brand} {vehicle.model}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="self-start shrink-0"
                      onClick={() => setCustomerVehicleDialogOpen(true)}
                    >
                      更换
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  工单信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">工单类型 <span className="text-destructive">*</span></Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="保养">保养</SelectItem>
                        <SelectItem value="维修">维修</SelectItem>
                        <SelectItem value="钣喷">钣喷</SelectItem>
                        <SelectItem value="事故">事故</SelectItem>
                        <SelectItem value="PDI">PDI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">进店里程</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        className="pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">km</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">指派技师</Label>
                    <Select value={technicianId} onValueChange={setTechnicianId}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择技师" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name} <span className="text-muted-foreground text-xs">({t.specialty})</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">工位</Label>
                    <Select value={bayId} onValueChange={setBayId}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择工位" />
                      </SelectTrigger>
                      <SelectContent>
                        {workBays.map((b) => (
                          <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <Label className="text-sm">预计交车</Label>
                    <Input
                      type="datetime-local"
                      value={estimatedDate}
                      onChange={(e) => setEstimatedDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2 sm:col-span-3">
                    <Label className="text-sm">备注</Label>
                    <Textarea
                      placeholder="客户要求、注意事项等..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="resize-none h-9 min-h-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Items Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wrench className="size-4 text-primary" />
                    维修项目
                    {serviceItems.length > 0 && (
                      <Badge variant="secondary" className="ml-1">{serviceItems.length}</Badge>
                    )}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setServiceDialogOpen(true)}>
                    <Plus className="size-4" /> 添加项目
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {serviceItems.length === 0 ? (
                  <div 
                    className="h-24 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setServiceDialogOpen(true)}
                  >
                    点击添加维修项目
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>项目名称</TableHead>
                          <TableHead className="w-28 text-right">工时</TableHead>
                          <TableHead className="w-32 text-right">工时费</TableHead>
                          <TableHead className="w-28 text-right">小计</TableHead>
                          <TableHead className="w-16"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {serviceItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.serviceName}</TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                value={item.laborHours}
                                onChange={(e) => updateServiceItem(item.id, "laborHours", parseFloat(e.target.value) || 0)}
                                className="w-20 h-8 text-right ml-auto"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                min="0"
                                value={item.laborRate}
                                onChange={(e) => updateServiceItem(item.id, "laborRate", parseFloat(e.target.value) || 0)}
                                className="w-24 h-8 text-right ml-auto"
                              />
                            </TableCell>
                            <TableCell className="text-right tabular-nums font-medium">
                              ¥{(item.laborHours * item.laborRate).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeLineItem(item.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Parts Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="size-4 text-primary" />
                    配件材料
                    {partItems.length > 0 && (
                      <Badge variant="secondary" className="ml-1">{partItems.length}</Badge>
                    )}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setPartDialogOpen(true)}>
                    <Plus className="size-4" /> 添加配件
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {partItems.length === 0 ? (
                  <div 
                    className="h-24 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setPartDialogOpen(true)}
                  >
                    点击添加配件材料
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>配件名称</TableHead>
                          <TableHead className="w-20 text-center">单位</TableHead>
                          <TableHead className="w-24 text-right">数量</TableHead>
                          <TableHead className="w-32 text-right">单价</TableHead>
                          <TableHead className="w-28 text-right">小计</TableHead>
                          <TableHead className="w-16"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.partName}</TableCell>
                            <TableCell className="text-center text-muted-foreground">{item.unit}</TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updatePartItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                                className="w-16 h-8 text-right ml-auto"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                min="0"
                                value={item.unitPrice}
                                onChange={(e) => updatePartItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                                className="w-24 h-8 text-right ml-auto"
                              />
                            </TableCell>
                            <TableCell className="text-right tabular-nums font-medium">
                              ¥{(item.quantity * item.unitPrice).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeLineItem(item.id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Summary */}
          <div className="xl:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calculator className="size-4 text-primary" />
                    费用汇总
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">工时费</span>
                      <span className="tabular-nums">¥{totals.laborTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">配件费</span>
                      <span className="tabular-nums">¥{totals.partsTotal.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">小计</span>
                      <span className="tabular-nums font-medium">¥{totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">折扣优惠</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={discount}
                          onChange={(e) => setDiscount(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-16 h-7 text-right text-sm"
                        />
                        <span className="text-muted-foreground">%</span>
                      </div>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-destructive">
                        <span>优惠金额</span>
                        <span className="tabular-nums">-¥{totals.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium">应收金额</span>
                      <span className="text-2xl font-bold text-primary tabular-nums">
                        ¥{totals.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button className="w-full" size="lg">
                      <Save className="size-4" /> 保存工单
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dms/service">取消</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CustomerVehicleDialog
        open={customerVehicleDialogOpen}
        onOpenChange={setCustomerVehicleDialogOpen}
        onSelect={handleSelectCustomerVehicle}
      />
      <ServiceDialog
        open={serviceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        onSelect={addService}
      />
      <PartDialog
        open={partDialogOpen}
        onOpenChange={setPartDialogOpen}
        onSelect={addPart}
      />
    </div>
  )
}
