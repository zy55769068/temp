import type { LucideIcon } from "lucide-react"
import { Construction, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function ComingSoon({
  title,
  description,
  crumbs,
  icon: Icon = Construction,
  features = [],
}: {
  title: string
  description: string
  crumbs: { label: string; href?: string }[]
  icon?: LucideIcon
  features?: { title: string; desc: string }[]
}) {
  return (
    <div>
      <PageHeader title={title} description={description} crumbs={crumbs} />
      <div className="p-4 lg:p-6">
        <Card>
          <CardContent className="py-10">
            <Empty className="border-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Icon />
                </EmptyMedia>
                <EmptyTitle>该模块正在建设中</EmptyTitle>
                <EmptyDescription>
                  我们正在打磨「{title}」的体验,以下能力将在下个迭代上线。
                </EmptyDescription>
              </EmptyHeader>
              {features.length ? (
                <EmptyContent className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
                  {features.map((f) => (
                    <div
                      key={f.title}
                      className="rounded-md border border-border p-3 text-left bg-muted/30"
                    >
                      <div className="text-sm font-medium mb-1">{f.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                    </div>
                  ))}
                </EmptyContent>
              ) : null}
              <EmptyContent>
                <Button asChild variant="outline" size="sm">
                  <Link href="/">
                    <ArrowLeft className="size-4" /> 返回工作台
                  </Link>
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
