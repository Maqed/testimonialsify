import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "@/app/(protected)/dashboard/_components/dashboard/menu";
import Logo from "@/components/testimonialsify/logo";

export function Sidebar() {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen w-72 -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
      )}
    >
      <div className="relative flex h-full flex-col px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn("mb-1 transition-transform duration-300 ease-in-out")}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo />
          </Link>
        </Button>
        <Menu />
      </div>
    </aside>
  );
}
