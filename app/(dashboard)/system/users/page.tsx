import {
  Plus,
  Filter,
  Download,
  Search,
  UserCog,
  Building2,
  ChevronRight,
  MoreHorizontal,
  Mail,
  Phone,
  ShieldCheck,
  KeyRound,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type User = {
  id: string
  name: string
  email: string
  phone: string
  dept: string
  role: string
  position: string
  enabled: boolean
  lastLogin: string
}

const orgTree = [
  {
    name: "智驰云汽车集团", count: 386, children: [
      { name: "华东大区", count: 168, active: true, children: [
        { name: "杭州旗舰店", count: 48 },
        { name: "上海浦东店", count: 56 },
        { name: "宁波鄞州店", count: 32 },
        { name: "苏州工业园店", count: 32 },
      ]},
      { name: "华南大区", count: 124, children: [] },
      { name: "西南大区", count: 94, children: [] },
    ]
  },
]

const users: User[] = [
  { id: "U-1042", name: "王建华", email: "wang.jh@zhichi.cn", phone: "138-0571-8888", dept: "华东大区 / 总经办", role: "区域总经理", position: "总经理", enabled: true, lastLogin: "今天 09:12" },
  { id: "U-1108", name: "张敏", email: "zhang.m@zhichi.cn", phone: "139-0571-2233", dept: "杭州旗舰店 / 销售部", role: "销售顾问", position: "高级顾问", enabled: true, lastLogin: "今天 15:42" },
  { id: "U-1112", name: "李伟", email: "li.w@zhichi.cn", phone: "150-0571-7711", dept: "杭州旗舰店 / 销售部", role: "销售经理", position: "经理", enabled: true, lastLogin: "今天 14:25" },
  { id: "U-1156", name: "陈蕾", email: "chen.l@zhichi.cn", phone: "186-0571-3344", dept: "华东大区 / 财务部", role: "财务主管", position: "主管", enabled: true, lastLogin: "今天 14:55" },
  { id: "U-1188", name: "周倩", email: "zhou.q@zhichi.cn", phone: "131-0571-9012", dept: "上海浦东店 / 销售部", role: "销售顾问", position: "顾问", enabled: true, lastLogin: "今天 11:38" },
  { id: "U-1201", name: "孙磊", email: "sun.l@zhichi.cn", phone: "176-0571-2299", dept: "宁波鄞州店 / 销售部", role: "销售顾问", position: "顾问", enabled: false, lastLogin: "3 天前" },
  { id: "U-1245", name: "刘涛", email: "liu.t@zhichi.cn", phone: "187-0571-6605", dept: "集团 / 信息技术部", role: "系统管理员", position: "架构师", enabled: true, lastLogin: "今天 10:08" },
  { id: "U-1267", name: "吴婷", email: "wu.t@zhichi.cn", phone: "159-0571-7782", dept: "集团 / 市场部", role: "市场专员", position: "专员", enabled: true, lastLogin: "今天 11:30" },
  { id: "U-1289", name: "赵铭", email: "zhao.m@zhichi.cn", phone: "181-0571-4416", dept: "杭州旗舰店 / 售后服务部", role: "服务顾问", position: "顾问", enabled: true, lastLogin: "昨天 17:55" },
  { id: "U-1310", name: "黄佳", email: "huang.j@zhichi.cn", phone: "133-0571-3120", dept: "苏州工业园店 / 售后服务部", role: "服务经理", position: "经理", enabled: true, lastLogin: "今天 08:42" },
]

export default function UsersPage() {
  return (
    <div>
      <PageHeader
        title="用户管理"
        description="维护组织架构、员工账号、岗位与角色,支撑全集团 386 名员工的统一身份与权限管理。"
        crumbs={[{ label: "系统管理" }, { label: "用户管理" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-4" /> 导出
            </Button>
            <Button variant="outline" size="sm">
              <KeyRound className="size-4" /> 批量重置密码
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> 新建用户
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
        {/* Org tree */}
        <Card className="h-fit">
          <CardHeader className="gap-2">
            <CardTitle className="text-base inline-flex items-center gap-2">
              <Building2 className="size-4 text-primary" /> 组织架构
            </CardTitle>
            <InputGroup>
              <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
              <InputGroupInput placeholder="搜索部门" />
            </InputGroup>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm">
              {renderTree(orgTree, 0)}
            </ul>
          </CardContent>
        </Card>

        {/* Users table */}
        <Card>
          <CardHeader className="gap-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <CardTitle className="text-base">华东大区 / 杭州旗舰店</CardTitle>
                <CardDescription>共 48 人 · 已启用 46 · 已禁用 2</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <InputGroup className="w-full sm:w-64">
                  <InputGroupAddon><Search className="size-4 text-muted-foreground" /></InputGroupAddon>
                  <InputGroupInput placeholder="搜索姓名 / 工号 / 邮箱" />
                </InputGroup>
                <Select defaultValue="all-role">
                  <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-role">全部角色</SelectItem>
                    <SelectItem value="mgr">销售经理</SelectItem>
                    <SelectItem value="adv">销售顾问</SelectItem>
                    <SelectItem value="fin">财务</SelectItem>
                    <SelectItem value="adm">系统管理员</SelectItem>
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
                    <TableHead className="w-10"><Checkbox aria-label="全选" /></TableHead>
                    <TableHead>员工</TableHead>
                    <TableHead>所属部门 / 岗位</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>联系方式</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>最后登录</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell><Checkbox aria-label={`选择 ${u.name}`} /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">{u.name.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="text-sm font-medium">{u.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">{u.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{u.dept}</div>
                        <div className="text-xs text-muted-foreground">{u.position}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal inline-flex items-center gap-1">
                          <ShieldCheck className="size-3" /> {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Mail className="size-3" /> {u.email}
                        </div>
                        <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Phone className="size-3" /> {u.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center gap-2">
                          <Switch defaultChecked={u.enabled} aria-label={`切换 ${u.name} 启用状态`} />
                          <span className={`text-xs ${u.enabled ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                            {u.enabled ? "已启用" : "已禁用"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums">{u.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 text-xs">编辑</Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">分配角色</Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8" aria-label="更多">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>重置密码</DropdownMenuItem>
                              <DropdownMenuItem>查看登录日志</DropdownMenuItem>
                              <DropdownMenuItem>调整组织</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">删除账号</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm">
              <span className="text-muted-foreground">共 48 条记录</span>
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

function renderTree(nodes: any[], level: number) {
  return nodes.map((n) => (
    <li key={n.name}>
      <div
        className={`flex items-center gap-1.5 py-1.5 px-2 rounded-md hover:bg-muted cursor-pointer ${
          n.active ? "bg-primary/8 text-primary font-medium" : ""
        }`}
        style={{ paddingLeft: 8 + level * 14 }}
      >
        {n.children && n.children.length ? (
          <ChevronRight className={`size-3.5 ${level === 0 ? "rotate-90 text-primary" : level === 1 && n.active ? "rotate-90" : ""}`} />
        ) : (
          <span className="size-3.5 inline-block" />
        )}
        <span className="flex-1 truncate">{n.name}</span>
        <span className="text-xs text-muted-foreground tabular-nums">{n.count}</span>
      </div>
      {n.children && n.children.length ? <ul>{renderTree(n.children, level + 1)}</ul> : null}
    </li>
  ))
}
