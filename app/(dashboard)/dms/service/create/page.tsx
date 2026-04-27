"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Plus,
  Trash2,
  Car,
  User,
  ChevronsUpDown,
  Check,
  Wrench,
  Package,
  Save,
  X,
  Search,
  Loader2,
  Phone,
  Clock,
  ArrowLeft,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// ============ Mock API Functions (simulate async search) ============

// Simulated customer database
const mockCustomers = Array.from({ length: 500 }, (_, i) => ({
  id: `c${i + 1}`,
  name: ["林浩然", "陈志远", "王思颖", "赵雪", "黄海涛", "苏婉清", "张伟", "刘芳", "李强", "周敏"][i % 10] + (i > 9 ? `${Math.floor(i / 10)}` : ""),
  phone: `1${["38", "39", "37", "36", "35", "58", "59", "86", "87", "88"][i % 10]}****${String(1000 + i).slice(-4)}`,
  vehicles: [
    `浙${["A", "B", "C", "D", "E", "F"][i % 6]}·${String(Math.random()).slice(2, 7)} ${["大众途观L", "奥迪A6L", "丰田凯美瑞", "比亚迪汉EV", "理想L7", "宝马X3"][i % 6]}`,
    ...(i % 3 === 0 ? [`沪${["A", "B", "C"][i % 3]}·${String(Math.random()).slice(2, 7)} ${["奔驰GLC", "特斯拉Model Y", "蔚来ES6"][i % 3]}`] : []),
  ],
}))

const mockServiceItems = Array.from({ length: 200 }, (_, i) => ({
  id: `s${i + 1}`,
  name: [
    "机油更换", "机油滤清器更换", "空气滤清器更换", "空调滤清器更换",
    "刹车片更换(前)", "刹车片更换(后)", "轮胎更换", "四轮定位",
    "发动机检测", "变速箱油更换", "火花塞更换", "蓄电池检测",
    "冷却液更换", "制动液更换", "转向助力油更换", "雨刮片更换",
    "灯泡更换", "皮带检查", "底盘检查", "全车检测"
  ][i % 20] + (i >= 20 ? ` (套餐${Math.floor(i / 20) + 1})` : ""),
  laborHours: [0.5, 0.3, 0.2, 0.3, 1.0, 1.0, 0.5, 1.0, 1.5, 1.0, 0.8, 0.3, 0.5, 0.5, 0.5, 0.2, 0.2, 0.5, 1.0, 2.0][i % 20],
  laborRate: [120, 80, 60, 80, 200, 200, 100, 180, 300, 250, 150, 60, 100, 100, 100, 50, 40, 80, 150, 350][i % 20],
}))

const mockParts = Array.from({ length: 300 }, (_, i) => ({
  id: `p${i + 1}`,
  name: [
    "嘉实多极护 5W-40 机油 4L", "博世机油滤清器", "曼牌空气滤清器",
    "马勒空调滤清器", "博世刹车片(前)", "博世刹车片(后)",
    "米其林轮胎 225/45R17", "防冻液 2L", "雨刮片(对)", "火花塞(4支装)",
    "NGK火花塞", "德尔福点火线圈", "博世蓄电池", "壳牌机油 5W-30",
    "普利司通轮胎 215/55R16", "大陆轮胎 225/50R17", "ATE制动液",
    "嘉实多变速箱油", "德尔福燃油滤清器", "博世空气流量计"
  ][i % 20] + (i >= 20 ? ` #${Math.floor(i / 20) + 1}` : ""),
  unit: ["桶", "个", "个", "个", "套", "套", "条", "瓶", "对", "套", "个", "个", "个", "桶", "条", "条", "瓶", "桶", "个", "个"][i % 20],
  price: [388, 68, 128, 98, 580, 480, 780, 68, 128, 320, 45, 280, 650, 358, 620, 720, 88, 268, 158, 890][i % 20] + (i >= 20 ? i * 2 : 0),
}))

// Async search functions with simulated delay
async function searchCustomers(query: string): Promise<typeof mockCustomers> {
  await new Promise((r) => setTimeout(r, 300)) // Simulate network delay
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return mockCustomers
    .filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
    .slice(0, 20) // Limit results
}

async function searchServices(query: string): Promise<typeof mockServiceItems> {
  await new Promise((r) => setTimeout(r, 200))
  if (!query.trim()) return mockServiceItems.slice(0, 10) // Show recent/popular when empty
  const q = query.toLowerCase()
  return mockServiceItems.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 15)
}

async function searchParts(query: string): Promise<typeof mockParts> {
  await new Promise((r) => setTimeout(r, 200))
  if (!query.trim()) return mockParts.slice(0, 10)
  const q = query.toLowerCase()
  return mockParts.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 15)
}

// ============ Custom Hooks ============

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

// ============ Types ============

type Customer = (typeof mockCustomers)[0]
type ServiceItem = (typeof mockServiceItems)[0]
type Part = (typeof mockParts)[0]

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
  quantity: number
  unitPrice: number
}

type LineItem = ServiceLineItem | PartLineItem

// ============ Async Search Combobox Component ============

interface AsyncComboboxProps<T> {
  placeholder: string
  searchPlaceholder: string
  value: T | null
  onSelect: (item: T) => void
  searchFn: (query: string) => Promise<T[]>
  renderItem: (item: T, isSelected: boolean) => React.ReactNode
  renderValue: (item: T) => React.ReactNode
  getKey: (item: T) => string
  emptyText?: string
  className?: string
}

function AsyncCombobox<T>({
  placeholder,
  searchPlaceholder,
  value,
  onSelect,
  searchFn,
  renderItem,
  renderValue,
  getKey,
  emptyText = "未找到结果",
  className,
}: AsyncComboboxProps<T>) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    async function doSearch() {
      setLoading(true)
      try {
        const data = await searchFn(debouncedQuery)
        if (!cancelled) setResults(data)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    if (open) doSearch()
    return () => { cancelled = true }
  }, [debouncedQuery, open, searchFn])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal h-10", className)}
        >
          {value ? renderValue(value) : <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <div className="flex items-center border-b px-3 py-2 gap-2">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {loading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
        </div>
        <div className="max-h-64 overflow-y-auto p-1">
          {!loading && results.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">{emptyText}</div>
          )}
          {results.map((item) => (
            <button
              key={getKey(item)}
              onClick={() => {
                onSelect(item)
                setOpen(false)
              }}
              className="w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors text-left"
            >
              {renderItem(item, value ? getKey(value) === getKey(item) : false)}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

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

// ============ Main Component ============

export default function CreateServiceOrderPage() {
  // Form state
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [vehicleId, setVehicleId] = useState("")
  const [orderType, setOrderType] = useState("")
  const [technicianId, setTechnicianId] = useState("")
  const [bayId, setBayId] = useState("")
  const [estimatedDate, setEstimatedDate] = useState("")
  const [mileage, setMileage] = useState("")
  const [notes, setNotes] = useState("")
  const [discount, setDiscount] = useState(0)

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([])

  // Popovers for adding items
  const [serviceOpen, setServiceOpen] = useState(false)
  const [partOpen, setPartOpen] = useState(false)
  const [serviceQuery, setServiceQuery] = useState("")
  const [partQuery, setPartQuery] = useState("")
  const [serviceResults, setServiceResults] = useState<ServiceItem[]>([])
  const [partResults, setPartResults] = useState<Part[]>([])
  const [serviceLoading, setServiceLoading] = useState(false)
  const [partLoading, setPartLoading] = useState(false)

  const debouncedServiceQuery = useDebounce(serviceQuery, 250)
  const debouncedPartQuery = useDebounce(partQuery, 250)

  // Search services
  useEffect(() => {
    if (!serviceOpen) return
    let cancelled = false
    setServiceLoading(true)
    searchServices(debouncedServiceQuery).then((data) => {
      if (!cancelled) {
        setServiceResults(data)
        setServiceLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [debouncedServiceQuery, serviceOpen])

  // Search parts
  useEffect(() => {
    if (!partOpen) return
    let cancelled = false
    setPartLoading(true)
    searchParts(debouncedPartQuery).then((data) => {
      if (!cancelled) {
        setPartResults(data)
        setPartLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [debouncedPartQuery, partOpen])

  // Clear vehicle when customer changes
  useEffect(() => {
    setVehicleId("")
  }, [customer])

  // Add service
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
    setServiceOpen(false)
    setServiceQuery("")
  }, [])

  // Add part
  const addPart = useCallback((part: Part) => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `line-${Date.now()}-${Math.random()}`,
        type: "part",
        partId: part.id,
        partName: part.name,
        quantity: 1,
        unitPrice: part.price,
      },
    ])
    setPartOpen(false)
    setPartQuery("")
  }, [])

  // Remove line item
  const removeLineItem = useCallback((id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  // Update service line
  const updateServiceItem = useCallback((id: string, field: "laborHours" | "laborRate", value: number) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id && item.type === "service" ? { ...item, [field]: value } : item
      )
    )
  }, [])

  // Update part line
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

  const serviceCount = lineItems.filter((i) => i.type === "service").length
  const partCount = lineItems.filter((i) => i.type === "part").length

  return (
    <div className="min-h-screen bg-muted/40">
      <PageHeader
        title="创建维修工单"
        description="填写客户与车辆信息，添加维修项目和配件"
        crumbs={[
          { label: "DMS" },
          { label: "售后维修", href: "/dms/service" },
          { label: "创建工单" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dms/service">
                <ArrowLeft className="size-4" /> 返回
              </Link>
            </Button>
            <Button size="sm">
              <Save className="size-4" /> 保存工单
            </Button>
          </div>
        }
      />

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Customer & Vehicle Section */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <User className="size-4 text-primary" />
                  客户与车辆
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Customer Search */}
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      客户 <span className="text-destructive">*</span>
                    </Label>
                    <AsyncCombobox<Customer>
                      placeholder="搜索客户姓名或手机号..."
                      searchPlaceholder="输入姓名或手机号搜索..."
                      value={customer}
                      onSelect={setCustomer}
                      searchFn={searchCustomers}
                      getKey={(c) => c.id}
                      emptyText="请输入关键词搜索客户"
                      renderValue={(c) => (
                        <span className="flex items-center gap-2 truncate">
                          <User className="size-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{c.name}</span>
                          <span className="text-muted-foreground text-xs">{c.phone}</span>
                        </span>
                      )}
                      renderItem={(c, selected) => (
                        <>
                          <Check className={cn("size-4 shrink-0", selected ? "opacity-100" : "opacity-0")} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{c.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <Phone className="size-3" /> {c.phone}
                              <span className="text-muted-foreground/60">·</span>
                              <Car className="size-3" /> {c.vehicles.length} 台车
                            </div>
                          </div>
                        </>
                      )}
                    />
                  </div>

                  {/* Vehicle Select */}
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      车辆 <span className="text-destructive">*</span>
                    </Label>
                    <Select value={vehicleId} onValueChange={setVehicleId} disabled={!customer}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder={customer ? "选择车辆" : "请先选择客户"} />
                      </SelectTrigger>
                      <SelectContent>
                        {customer?.vehicles.map((vehicle, idx) => (
                          <SelectItem key={idx} value={vehicle}>
                            <span className="flex items-center gap-2">
                              <Car className="size-4 text-muted-foreground" />
                              {vehicle}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Info Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">工单类型 <span className="text-destructive">*</span></Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger className="h-10">
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
                        className="h-10 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        km
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">指派技师</Label>
                    <Select value={technicianId} onValueChange={setTechnicianId}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="选择技师" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((tech) => (
                          <SelectItem key={tech.id} value={tech.id}>
                            {tech.name}
                            <span className="text-xs text-muted-foreground ml-1">({tech.specialty})</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">工位</Label>
                    <Select value={bayId} onValueChange={setBayId}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="选择工位" />
                      </SelectTrigger>
                      <SelectContent>
                        {workBays.map((bay) => (
                          <SelectItem key={bay.id} value={bay.id}>
                            {bay.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date and Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">预计交车时间</Label>
                    <Input
                      type="datetime-local"
                      value={estimatedDate}
                      onChange={(e) => setEstimatedDate(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">备注</Label>
                    <Input
                      placeholder="客户反馈、特殊要求..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Line Items Section */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Wrench className="size-4 text-primary" />
                    维修项目与配件
                    {lineItems.length > 0 && (
                      <Badge variant="secondary" className="ml-2 font-normal">
                        {lineItems.length} 项
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {/* Add Service Popover */}
                    <Popover open={serviceOpen} onOpenChange={(o) => { setServiceOpen(o); if (!o) setServiceQuery("") }}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Wrench className="size-4" />
                          <span className="hidden sm:inline">维修项目</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="end">
                        <div className="flex items-center border-b px-3 py-2 gap-2">
                          <Search className="size-4 text-muted-foreground" />
                          <input
                            value={serviceQuery}
                            onChange={(e) => setServiceQuery(e.target.value)}
                            placeholder="搜索维修项目..."
                            className="flex-1 bg-transparent text-sm outline-none"
                            autoFocus
                          />
                          {serviceLoading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
                        </div>
                        <div className="max-h-64 overflow-y-auto p-1">
                          {!serviceLoading && serviceResults.length === 0 && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                              {serviceQuery ? "未找到匹配项目" : "输入关键词搜索"}
                            </div>
                          )}
                          {serviceResults.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => addService(service)}
                              className="w-full flex items-start gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors text-left"
                            >
                              <Wrench className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{service.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                  <Clock className="size-3" /> {service.laborHours}h
                                  <span>·</span>
                                  <span>¥{service.laborRate}/h</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Add Part Popover */}
                    <Popover open={partOpen} onOpenChange={(o) => { setPartOpen(o); if (!o) setPartQuery("") }}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Package className="size-4" />
                          <span className="hidden sm:inline">配件</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="end">
                        <div className="flex items-center border-b px-3 py-2 gap-2">
                          <Search className="size-4 text-muted-foreground" />
                          <input
                            value={partQuery}
                            onChange={(e) => setPartQuery(e.target.value)}
                            placeholder="搜索配件名称..."
                            className="flex-1 bg-transparent text-sm outline-none"
                            autoFocus
                          />
                          {partLoading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
                        </div>
                        <div className="max-h-64 overflow-y-auto p-1">
                          {!partLoading && partResults.length === 0 && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                              {partQuery ? "未找到匹配配件" : "输入关键词搜索"}
                            </div>
                          )}
                          {partResults.map((part) => (
                            <button
                              key={part.id}
                              onClick={() => addPart(part)}
                              className="w-full flex items-start gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors text-left"
                            >
                              <Package className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{part.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  ¥{part.price}/{part.unit}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {lineItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center border-t border-dashed">
                    <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Plus className="size-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">暂无项目</p>
                    <p className="text-xs text-muted-foreground mt-1">点击上方按钮添加维修项目或配件</p>
                  </div>
                ) : (
                  <div className="border-t">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
                      <div className="col-span-5 sm:col-span-6">项目 / 配件</div>
                      <div className="col-span-2 text-center">工时/数量</div>
                      <div className="col-span-2 text-center">单价</div>
                      <div className="col-span-2 text-right">小计</div>
                      <div className="col-span-1"></div>
                    </div>
                    {/* Table Body */}
                    <div className="divide-y">
                      {lineItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-muted/30 transition-colors">
                          <div className="col-span-5 sm:col-span-6 flex items-center gap-2 min-w-0">
                            <Badge
                              variant={item.type === "service" ? "secondary" : "outline"}
                              className="shrink-0 text-[10px] px-1.5"
                            >
                              {item.type === "service" ? "维修" : "配件"}
                            </Badge>
                            <span className="text-sm font-medium truncate">
                              {item.type === "service" ? item.serviceName : item.partName}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              min={item.type === "service" ? 0.1 : 1}
                              step={item.type === "service" ? 0.1 : 1}
                              value={item.type === "service" ? item.laborHours : item.quantity}
                              onChange={(e) =>
                                item.type === "service"
                                  ? updateServiceItem(item.id, "laborHours", parseFloat(e.target.value) || 0)
                                  : updatePartItem(item.id, "quantity", parseInt(e.target.value) || 1)
                              }
                              className="h-8 text-center text-sm"
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              min={0}
                              value={item.type === "service" ? item.laborRate : item.unitPrice}
                              onChange={(e) =>
                                item.type === "service"
                                  ? updateServiceItem(item.id, "laborRate", parseFloat(e.target.value) || 0)
                                  : updatePartItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)
                              }
                              className="h-8 text-center text-sm"
                            />
                          </div>
                          <div className="col-span-2 text-right tabular-nums text-sm font-medium">
                            ¥
                            {item.type === "service"
                              ? (item.laborHours * item.laborRate).toFixed(2)
                              : (item.quantity * item.unitPrice).toFixed(2)}
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7 text-muted-foreground hover:text-destructive"
                              onClick={() => removeLineItem(item.id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Summary */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">费用汇总</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary Rows */}
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">维修工时费</span>
                      <span className="tabular-nums">¥ {totals.laborTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">配件材料费</span>
                      <span className="tabular-nums">¥ {totals.partsTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">小计</span>
                    <span className="tabular-nums font-medium">¥ {totals.subtotal.toFixed(2)}</span>
                  </div>

                  {/* Discount */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">折扣</span>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        className="w-16 h-8 text-center text-sm"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>优惠金额</span>
                      <span className="tabular-nums">-¥ {totals.discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between items-baseline">
                    <span className="font-medium">应收金额</span>
                    <span className="text-2xl font-bold text-primary tabular-nums">
                      ¥ {totals.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Item Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      <Wrench className="size-3 mr-1" />
                      {serviceCount} 项维修
                    </Badge>
                    <Badge variant="outline" className="text-xs font-normal">
                      <Package className="size-3 mr-1" />
                      {partCount} 项配件
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full" size="lg">
                      <Save className="size-4" />
                      保存并派工
                    </Button>
                    <Button variant="outline" className="w-full">
                      保存为草稿
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">操作提示</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 输入姓名或手机号搜索客户</li>
                    <li>• 工时费 = 工时 × 单价</li>
                    <li>• 折扣按总金额百分比计算</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
