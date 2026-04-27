"use client"

import { useState, useMemo } from "react"
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
  CalendarIcon,
  FileText,
  Save,
  X,
  Search,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Mock data
const customers = [
  { id: "c1", name: "林浩然", phone: "138****1234", vehicles: ["浙A·8K39M 大众途观L", "浙A·9X88K 奥迪A6L"] },
  { id: "c2", name: "陈志远", phone: "139****5678", vehicles: ["沪B·F992K 丰田凯美瑞"] },
  { id: "c3", name: "王思颖", phone: "137****9012", vehicles: ["浙B·K612D 比亚迪汉EV"] },
  { id: "c4", name: "赵雪", phone: "136****3456", vehicles: ["苏E·9988L 奥迪A4L"] },
  { id: "c5", name: "黄海涛", phone: "135****7890", vehicles: ["浙A·12X88 理想L7"] },
  { id: "c6", name: "苏婉清", phone: "158****2345", vehicles: ["浙A·R773P 丰田卡罗拉"] },
]

const serviceItems = [
  { id: "s1", name: "机油更换", laborHours: 0.5, laborRate: 120 },
  { id: "s2", name: "机油滤清器更换", laborHours: 0.3, laborRate: 80 },
  { id: "s3", name: "空气滤清器更换", laborHours: 0.2, laborRate: 60 },
  { id: "s4", name: "空调滤清器更换", laborHours: 0.3, laborRate: 80 },
  { id: "s5", name: "刹车片更换(前)", laborHours: 1.0, laborRate: 200 },
  { id: "s6", name: "刹车片更换(后)", laborHours: 1.0, laborRate: 200 },
  { id: "s7", name: "轮胎更换", laborHours: 0.5, laborRate: 100 },
  { id: "s8", name: "四轮定位", laborHours: 1.0, laborRate: 180 },
  { id: "s9", name: "发动机检测", laborHours: 1.5, laborRate: 300 },
  { id: "s10", name: "变速箱油更换", laborHours: 1.0, laborRate: 250 },
]

const parts = [
  { id: "p1", name: "嘉实多极护 5W-40 机油 4L", unit: "桶", price: 388 },
  { id: "p2", name: "博世机油滤清器", unit: "个", price: 68 },
  { id: "p3", name: "曼牌空气滤清器", unit: "个", price: 128 },
  { id: "p4", name: "马勒空调滤清器", unit: "个", price: 98 },
  { id: "p5", name: "博世刹车片(前)", unit: "套", price: 580 },
  { id: "p6", name: "博世刹车片(后)", unit: "套", price: 480 },
  { id: "p7", name: "米其林轮胎 225/45R17", unit: "条", price: 780 },
  { id: "p8", name: "防冻液 2L", unit: "瓶", price: 68 },
  { id: "p9", name: "雨刮片(对)", unit: "对", price: 128 },
  { id: "p10", name: "火花塞(4支装)", unit: "套", price: 320 },
]

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

export default function CreateServiceOrderPage() {
  // Header form state
  const [customerId, setCustomerId] = useState("")
  const [vehicleId, setVehicleId] = useState("")
  const [orderType, setOrderType] = useState("")
  const [technicianId, setTechnicianId] = useState("")
  const [bayId, setBayId] = useState("")
  const [estimatedDate, setEstimatedDate] = useState("")
  const [notes, setNotes] = useState("")

  // Line items state
  const [lineItems, setLineItems] = useState<LineItem[]>([])

  // Combobox open states
  const [customerOpen, setCustomerOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const [partOpen, setPartOpen] = useState(false)

  // Discount
  const [discount, setDiscount] = useState(0)

  // Get selected customer
  const selectedCustomer = customers.find((c) => c.id === customerId)

  // Add service line item
  const addServiceItem = (serviceId: string) => {
    const service = serviceItems.find((s) => s.id === serviceId)
    if (!service) return

    const newItem: ServiceLineItem = {
      id: `line-${Date.now()}`,
      type: "service",
      serviceId: service.id,
      serviceName: service.name,
      laborHours: service.laborHours,
      laborRate: service.laborRate,
    }
    setLineItems([...lineItems, newItem])
    setServiceOpen(false)
  }

  // Add part line item
  const addPartItem = (partId: string) => {
    const part = parts.find((p) => p.id === partId)
    if (!part) return

    const newItem: PartLineItem = {
      id: `line-${Date.now()}`,
      type: "part",
      partId: part.id,
      partName: part.name,
      quantity: 1,
      unitPrice: part.price,
    }
    setLineItems([...lineItems, newItem])
    setPartOpen(false)
  }

  // Remove line item
  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  // Update service line item
  const updateServiceItem = (id: string, field: "laborHours" | "laborRate", value: number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id && item.type === "service" ? { ...item, [field]: value } : item
      )
    )
  }

  // Update part line item
  const updatePartItem = (id: string, field: "quantity" | "unitPrice", value: number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id && item.type === "part" ? { ...item, [field]: value } : item
      )
    )
  }

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

  return (
    <div className="min-h-screen bg-muted/30">
      <PageHeader
        title="创建维修工单"
        description="填写客户、车辆信息，添加维修项目和配件，生成售后维修工单。"
        crumbs={[
          { label: "DMS 经销商管理" },
          { label: "售后维修", href: "/dms/service" },
          { label: "创建工单" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dms/service">
                <X className="size-4" /> 取消
              </Link>
            </Button>
            <Button size="sm">
              <Save className="size-4" /> 保存工单
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Main form */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            {/* Order Header Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  工单基本信息
                </CardTitle>
                <CardDescription>选择客户、车辆及工单类型</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Customer Combobox */}
                  <div className="space-y-2">
                    <Label>
                      客户 <span className="text-destructive">*</span>
                    </Label>
                    <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={customerOpen}
                          className="w-full justify-between font-normal"
                        >
                          {selectedCustomer ? (
                            <span className="flex items-center gap-2 truncate">
                              <User className="size-4 text-muted-foreground shrink-0" />
                              {selectedCustomer.name}
                              <span className="text-muted-foreground text-xs">
                                {selectedCustomer.phone}
                              </span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground">搜索或选择客户...</span>
                          )}
                          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="start">
                        <Command>
                          <CommandInput placeholder="输入姓名或手机号搜索..." />
                          <CommandList>
                            <CommandEmpty>未找到客户</CommandEmpty>
                            <CommandGroup>
                              {customers.map((customer) => (
                                <CommandItem
                                  key={customer.id}
                                  value={`${customer.name} ${customer.phone}`}
                                  onSelect={() => {
                                    setCustomerId(customer.id)
                                    setVehicleId("")
                                    setCustomerOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "size-4 mr-2",
                                      customerId === customer.id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{customer.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {customer.phone} · {customer.vehicles.length} 台车
                                    </span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Vehicle Select */}
                  <div className="space-y-2">
                    <Label>
                      车辆 <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={vehicleId}
                      onValueChange={setVehicleId}
                      disabled={!selectedCustomer}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择车辆" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCustomer?.vehicles.map((vehicle, idx) => (
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

                  {/* Order Type */}
                  <div className="space-y-2">
                    <Label>
                      工单类型 <span className="text-destructive">*</span>
                    </Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger className="w-full">
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

                  {/* Technician */}
                  <div className="space-y-2">
                    <Label>指派技师</Label>
                    <Select value={technicianId} onValueChange={setTechnicianId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择技师" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((tech) => (
                          <SelectItem key={tech.id} value={tech.id}>
                            <span className="flex items-center gap-2">
                              {tech.name}
                              <span className="text-xs text-muted-foreground">{tech.specialty}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Work Bay */}
                  <div className="space-y-2">
                    <Label>工位</Label>
                    <Select value={bayId} onValueChange={setBayId}>
                      <SelectTrigger className="w-full">
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

                  {/* Estimated Date */}
                  <div className="space-y-2">
                    <Label>预计交车时间</Label>
                    <div className="relative">
                      <Input
                        type="datetime-local"
                        value={estimatedDate}
                        onChange={(e) => setEstimatedDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-4 space-y-2">
                  <Label>备注说明</Label>
                  <Textarea
                    placeholder="客户反馈、特殊要求等..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Line Items Card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Wrench className="size-4 text-primary" />
                      维修项目与配件
                    </CardTitle>
                    <CardDescription className="mt-1">添加维修服务项目和所需配件</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Add Service Button */}
                    <Popover open={serviceOpen} onOpenChange={setServiceOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Wrench className="size-4" />
                          添加维修项目
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="end">
                        <Command>
                          <CommandInput placeholder="搜索维修项目..." />
                          <CommandList>
                            <CommandEmpty>未找到维修项目</CommandEmpty>
                            <CommandGroup>
                              {serviceItems.map((service) => (
                                <CommandItem
                                  key={service.id}
                                  value={service.name}
                                  onSelect={() => addServiceItem(service.id)}
                                >
                                  <Wrench className="size-4 mr-2 text-muted-foreground" />
                                  <div className="flex-1">
                                    <div className="font-medium">{service.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {service.laborHours}h · ¥{service.laborRate}/h
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Add Part Button */}
                    <Popover open={partOpen} onOpenChange={setPartOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Package className="size-4" />
                          添加配件
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="end">
                        <Command>
                          <CommandInput placeholder="搜索配件..." />
                          <CommandList>
                            <CommandEmpty>未找到配件</CommandEmpty>
                            <CommandGroup>
                              {parts.map((part) => (
                                <CommandItem
                                  key={part.id}
                                  value={part.name}
                                  onSelect={() => addPartItem(part.id)}
                                >
                                  <Package className="size-4 mr-2 text-muted-foreground" />
                                  <div className="flex-1">
                                    <div className="font-medium">{part.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      ¥{part.price}/{part.unit}
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {lineItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Plus className="size-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">暂无项目</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      点击上方按钮添加维修项目或配件
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent bg-muted/50">
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>项目/配件</TableHead>
                          <TableHead className="w-28 text-center">工时/数量</TableHead>
                          <TableHead className="w-28 text-center">单价</TableHead>
                          <TableHead className="w-28 text-right">小计</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lineItems.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell className="text-muted-foreground text-sm">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {item.type === "service" ? (
                                  <Badge variant="secondary" className="shrink-0">
                                    <Wrench className="size-3 mr-1" />
                                    维修
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="shrink-0">
                                    <Package className="size-3 mr-1" />
                                    配件
                                  </Badge>
                                )}
                                <span className="font-medium text-sm">
                                  {item.type === "service" ? item.serviceName : item.partName}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {item.type === "service" ? (
                                <Input
                                  type="number"
                                  min={0.1}
                                  step={0.1}
                                  value={item.laborHours}
                                  onChange={(e) =>
                                    updateServiceItem(item.id, "laborHours", parseFloat(e.target.value) || 0)
                                  }
                                  className="w-20 h-8 text-center mx-auto"
                                />
                              ) : (
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updatePartItem(item.id, "quantity", parseInt(e.target.value) || 1)
                                  }
                                  className="w-20 h-8 text-center mx-auto"
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {item.type === "service" ? (
                                <Input
                                  type="number"
                                  min={0}
                                  value={item.laborRate}
                                  onChange={(e) =>
                                    updateServiceItem(item.id, "laborRate", parseFloat(e.target.value) || 0)
                                  }
                                  className="w-24 h-8 text-center mx-auto"
                                />
                              ) : (
                                <Input
                                  type="number"
                                  min={0}
                                  value={item.unitPrice}
                                  onChange={(e) =>
                                    updatePartItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)
                                  }
                                  className="w-24 h-8 text-center mx-auto"
                                />
                              )}
                            </TableCell>
                            <TableCell className="text-right tabular-nums font-medium">
                              ¥
                              {item.type === "service"
                                ? (item.laborHours * item.laborRate).toFixed(2)
                                : (item.quantity * item.unitPrice).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="size-8 p-0 text-muted-foreground hover:text-destructive"
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
            <div className="sticky top-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">费用汇总</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary rows */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">维修工时费</span>
                      <span className="tabular-nums">¥ {totals.laborTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">配件材料费</span>
                      <span className="tabular-nums">¥ {totals.partsTotal.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">小计</span>
                      <span className="tabular-nums font-medium">¥ {totals.subtotal.toFixed(2)}</span>
                    </div>

                    {/* Discount input */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">折扣优惠</span>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={discount}
                          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                          className="w-16 h-8 text-center"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-destructive">
                        <span>优惠金额</span>
                        <span className="tabular-nums">-¥ {totals.discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-medium">应收金额</span>
                      <span className="text-xl font-semibold text-primary tabular-nums">
                        ¥ {totals.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Item counts */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="secondary" className="font-normal">
                        <Wrench className="size-3 mr-1" />
                        {lineItems.filter((i) => i.type === "service").length} 项维修
                      </Badge>
                      <Badge variant="outline" className="font-normal">
                        <Package className="size-3 mr-1" />
                        {lineItems.filter((i) => i.type === "part").length} 项配件
                      </Badge>
                    </div>
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

              {/* Quick Tips */}
              <Card className="mt-4">
                <CardContent className="pt-4">
                  <h4 className="text-sm font-medium mb-2">操作提示</h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li>• 选择客户后可选择其名下车辆</li>
                    <li>• 维修项目可调整工时和工时费率</li>
                    <li>• 配件可调整数量和单价</li>
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
