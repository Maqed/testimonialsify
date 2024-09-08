"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "./collapse-menu-button";

export function Menu() {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                {groupLabel}
              </p>
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <Button
                        variant={active ? "secondary" : "ghost"}
                        className="mb-1 h-10 w-full justify-start"
                        asChild
                      >
                        <Link href={href}>
                          <span className={cn("mr-4")}>
                            <Icon size={18} />
                          </span>
                          <p className={cn("max-w-[200px] truncate")}>
                            {label}
                          </p>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}
