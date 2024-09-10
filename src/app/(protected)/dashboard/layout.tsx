import DashboardLayoutUI from "@/app/(protected)/dashboard/_components/dashboard/dashboard-layout";
import { type Metadata } from "next";
import { type ReactNode } from "react";
import CreateProjectAlertDialog from "./_components/create-project-alert-dialog";
type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard",
};

function DashboardLayout({ children }: Props) {
  return (
    <DashboardLayoutUI>
      <CreateProjectAlertDialog />
      {children}
    </DashboardLayoutUI>
  );
}

export default DashboardLayout;
