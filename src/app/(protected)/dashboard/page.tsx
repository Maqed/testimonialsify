"use client";
import { useSession } from "next-auth/react";
import CreateProjectCard from "@/components/testimonialsify/create-project-card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/client-side";
import { ContentLayout } from "@/app/(protected)/dashboard/_components/dashboard/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: projects, isFetched } = useQuery({
    queryKey: ["projects", session],
    queryFn: async () => {
      const response = await fetch(`/api/projects`);
      return response.json();
    },
    initialData: [],
  });

  const handleDialogClose = () => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    router.refresh();
  };
  if (!projects.length && isFetched) {
    return (
      <AlertDialog open={true}>
        <VisuallyHidden.Root>
          <AlertDialogTitle>CreateProjectCard</AlertDialogTitle>
        </VisuallyHidden.Root>
        <AlertDialogContent className="w-max p-0">
          <CreateProjectCard onSubmitSuccess={handleDialogClose} />
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>Content</div>
    </ContentLayout>
  );
}

export default DashboardPage;
