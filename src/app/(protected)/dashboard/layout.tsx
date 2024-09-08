import DashboardLayoutUI from "@/app/(protected)/dashboard/_components/dashboard/dashboard-layout";
import { Metadata } from "next";
import { type ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard",
};

function DashboardLayout({ children }: Props) {
  return <DashboardLayoutUI>{children}</DashboardLayoutUI>;
}

export default DashboardLayout;
