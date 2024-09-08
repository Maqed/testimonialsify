"use client";
import Navbar from "@/components/navbar/navbar";
import CreateProjectCard from "@/components/testimonialsify/create-project-card";
import { useRouter } from "next/navigation";

function CreateProjectPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className="h-screen-without-navbar container flex items-center justify-center">
        <CreateProjectCard
          onSubmitSuccess={() => {
            router.push("/dashboard");
          }}
        />
      </main>
    </>
  );
}

export default CreateProjectPage;
