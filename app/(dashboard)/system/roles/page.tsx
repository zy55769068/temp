import {
  Plus,
  KeyRound,
  ShieldCheck,
  Users,
  Search,
  ChevronRight,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

type Role = {
  id: string
  name: string
  code: string
  scope: string
  members: number
  desc: string
  active?: boolean
  builtin?: boolean
}

const roles: Role[] = [
  { id: "R-001", name: "超级管理员", code: "SUPER_ADMIN", scope: "全集团", members: 3, desc: "拥有所有模块的查看与操作权限", builtin: true },
  { id: "R-002", name: "区域总经理", code: "REGION_GM", scope: "本大区", members: 6, desc: "区域内全部业务数据查看,审批合同 / 采购", active: true },
  { id: "R-101", name: "店总经理", code: "STORE_GM", scope: "本门店", members: 12, desc: "门店全业务管理,营运指标查看" },
  { id: "R-201", name: "销售经理", code: "SALES_MGR", scope: "本部门", members: 24, desc: "本部门客户、商机、合同审批" },
  { id: "R-202", name: "销售顾问", code: "SALES_ADV", scope: "本人", members: 86, desc: "维护本人客户、商机、试驾记录" },
  { id: "R-301", name: "服务经理", code: "SERVICE_MGR", scope: "本部门", members: 18, desc: "派工、工时审核、质检与索赔" },
  { id: "R-302", name: "服务顾问", code: "SERVICE_ADV", scope: "本人", members: 64, desc: "工单接待、回访,本人创建的工单" },
  { id: "R-401", name: "财务主管", code: "FINANCE_MGR", scope: "本大区", members: 8, desc: "应收应付、凭证审核、报表导出" },
  { id: "R-402", name: "出纳", code: "CASHIER", scope: "本门店", members: 16, desc: "收付款记录、银行对账" },
  { id: "R-501", name: "库管员", code: "WAREHOUSE", scope: "本仓库", members: 14, desc: "整车 / 配件出入库、盘点、调拨" },
  { id: "R-901", name: "系统管理员", code: "SYS_ADMIN", scope: "全集团", members: 4, desc: "用户、角色、字典、日志管理", builtin: true },
]

const permissionTree = [
  {
    name: "工作台", checked: true, items: [
      { name: "运营概览", checked: true },
      { name: "经营分析", checked: true },
    ],
  },
  {
    name: "ERP 企业资源", checked: true, partial: true, items: [
      { name: "财务管理", checked: true, sub: ["查看", "新建凭证", "审批", "导出"], subChecked: [true, true, false, true] },
      { name: "库存管理", checked: true, sub: ["查看", "出入库", "盘点", "调拨"], subChecked: [true, true, true, false] },
      { name: "采购管理", checked: true, sub: ["查看", "新建", "审批", "对账"], subChecked: [true, true, true, true] },
      { name: "销售订单", checked: true, sub: ["查看", "新建", "审批", "作废"], subChecked: [true, true, false, false] },
    ],
  },
  {
    name: "CRM 客户关系", checked: true, partial: true, items: [
      { name: "客户管理", checked: true, sub: ["查看本人", "查看部门", "查看全集团", "导出"], subChecked: [true, true, false, false] },
      { name: "销售商机", checked: true, sub: ["查看", "分配", "战败", "导出"], subChecked: [true, true, true, false] },
      { name: "跟进任务", checked: true },
      { name: "营销活动", checked: false },
    ],
  },
  {
    name: "DMS 经销商管理", checked: true, items: [
      { name: "整车库存", checked: true },
      { name: "售后维修", checked: true },
      { name: "配件管理", checked: false },
      { name: "金融保险", checked: false },
    ],
  },
  {
    name: "系统管理", checked: false, items: [
      { name: "用户管理", checked: false },
      { name: "角色权限", checked: false },
      { name: "数据字典", checked: false },
      { name: "操作日志", checked: false },
    ],
  },
]

export default function RolesPage() {
  return (
    <div>
      <PageHeader
        title="角色与权限"
        description="基于 RBAC 的角色管理:维护菜单 / 按钮权限与数据范围,支撑差异化的岗位授权。"
        crumbs={[{ label: "系统管理" }, { label: "角色权限" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <KeyRound className="size-4" /> 同步至生产
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> 新建角色
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        {/* Roles list */}
        <Card className="h-fit">
          <CardHeader className="gap-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> 角色列表
              </CardTitle>
              <Badge variant="secondary" className="font-normal">{roles.length} 个</Badge>
            </div>
            <InputGroup>
              <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
              <InputGroupInput placeholder="搜索角色名称 / 代码" />
            </InputGroup>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col gap-1">
            {roles.map((r) => (
              <button
                key={r.id}
                className={`text-left flex items-start gap-3 rounded-md p-2.5 hover:bg-muted transition-colors ${
                  r.active ? "bg-primary/8 ring-1 ring-primary/20" : ""
                }`}
              >
                <span className={`size-8 rounded-md grid place-items-center shrink-0 ${r.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <ShieldCheck className="size-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium truncate">{r.name}</span>
                    {r.builtin ? <Badge variant="secondary" className="font-normal h-4 text-[10px] px-1">内置</Badge> : null}
                  </div>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-2 mt-0.5">
                    <span className="font-mono">{r.code}</span>
                    <span>·</span>
                    <span>{r.scope}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                    <Users className="size-3" /> {r.members} 名成员
                  </div>
                </div>
                <ChevronRight className="size-3.5 text-muted-foreground mt-1.5" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Permission editor */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="flex-row items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base inline-flex items-center gap-2">
                  区域总经理 <Badge variant="secondary" className="font-normal">REGION_GM</Badge>
                </CardTitle>
                <CardDescription>区域内全部业务数据查看,负责合同与采购审批 · 6 名成员</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">查看成员</Button>
                <Button size="sm">保存权限</Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
              <PermissionPanel title="数据范围" hint="本角色可查看的数据范围">
                {[
                  { label: "全集团数据", checked: false },
                  { label: "本大区数据", checked: true },
                  { label: "本部门数据", checked: true },
                  { label: "本人数据", checked: true },
                  { label: "自定义部门", checked: false },
                ].map((d) => (
                  <label key={d.label} className="flex items-center gap-2 py-1 cursor-pointer">
                    <Checkbox defaultChecked={d.checked} />
                    <span className="text-sm">{d.label}</span>
                  </label>
                ))}
              </PermissionPanel>

              <PermissionPanel title="审批权限" hint="可发起 / 审批的单据">
                {[
                  { label: "整车销售合同", checked: true },
                  { label: "整车采购订单", checked: true },
                  { label: "费用报销", checked: true },
                  { label: "客户战败申请", checked: false },
                  { label: "退车 / 退款", checked: true },
                ].map((d) => (
                  <label key={d.label} className="flex items-center gap-2 py-1 cursor-pointer">
                    <Checkbox defaultChecked={d.checked} />
                    <span className="text-sm">{d.label}</span>
                  </label>
                ))}
              </PermissionPanel>

              <PermissionPanel title="高级权限" hint="影响系统行为的特殊操作">
                {[
                  { label: "导出报表", checked: true },
                  { label: "查看成本价", checked: true },
                  { label: "查看其他顾问客户", checked: false },
                  { label: "调整他人订单", checked: false },
                  { label: "操作日志查询", checked: true },
                ].map((d) => (
                  <label key={d.label} className="flex items-center gap-2 py-1 cursor-pointer">
                    <Checkbox defaultChecked={d.checked} />
                    <span className="text-sm">{d.label}</span>
                  </label>
                ))}
              </PermissionPanel>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">菜单与按钮权限</CardTitle>
              <CardDescription>勾选模块以授予访问权限,可对每个菜单进一步设置按钮级别的操作权限。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {permissionTree.map((g) => (
                <div key={g.name} className="rounded-md border border-border">
                  <div className="flex items-center justify-between px-3 py-2 bg-muted/40">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox defaultChecked={g.checked} />
                      <span className="text-sm font-medium">{g.name}</span>
                      {g.partial ? (
                        <Badge variant="secondary" className="font-normal h-4 text-[10px] px-1">部分授权</Badge>
                      ) : null}
                    </label>
                  </div>
                  <ul className="divide-y divide-border">
                    {g.items.map((it: any) => (
                      <li key={it.name} className="px-3 py-2.5 flex flex-col md:flex-row md:items-center gap-2">
                        <label className="flex items-center gap-2 md:w-44 cursor-pointer">
                          <Checkbox defaultChecked={it.checked} />
                          <span className="text-sm">{it.name}</span>
                        </label>
                        {it.sub ? (
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 md:pl-3 md:border-l md:border-border">
                            {it.sub.map((s: string, i: number) => (
                              <label key={s} className="flex items-center gap-1.5 cursor-pointer">
                                <Checkbox defaultChecked={it.subChecked[i]} />
                                <span className="text-xs text-foreground/80">{s}</span>
                              </label>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PermissionPanel({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-border p-4 flex flex-col gap-2 bg-muted/20">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
