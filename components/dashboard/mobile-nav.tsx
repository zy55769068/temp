"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { navigation } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="打开导航">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border">
        <SheetHeader className="h-16 px-5 border-b border-sidebar-border flex-row items-center gap-3 space-y-0">
          <div className="size-9 rounded-md bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center">
            <Car className="size-5" />
          </div>
          <SheetTitle className="text-sidebar-foreground text-sm font-semibold">智驰云</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="px-3 py-4 flex flex-col gap-5">
            {navigation.map((group) => (
              <div key={group.title} className="flex flex-col gap-1">
                <div className="px-2 pb-1 flex items-center gap-2">
                  <group.icon className="size-3.5 text-sidebar-foreground/60" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/60">
                    {group.title}
                  </span>
                </div>
                <ul className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const active =
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm",
                            active
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60",
                          )}
                        >
                          {Icon ? <Icon className="size-4" /> : null}
                          <span className="flex-1">{item.title}</span>
                          {item.badge ? (
                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-sidebar-primary/15 text-sidebar-primary border-0">
                              {item.badge}
                            </Badge>
                          ) : null}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
