"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";

export default function DashboardLayoutUI({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900 lg:ml-72",
        )}
      >
        {children}
      </main>
    </>
  );
}
