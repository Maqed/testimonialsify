import Navbar from "@/components/navbar/navbar";
import { checkIfLoggedIn } from "@/lib/server-utils";
import { db } from "@/server/db";
import { FrownIcon } from "lucide-react";
import Link from "next/link";

async function ProjectsPage() {
  const { session } = await checkIfLoggedIn();
  const projects = await db.project.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <>
      <Navbar />
      <main className="container">
        {projects.length ? (
          projects.map((project) => {
            return <h1>{project.name}</h1>;
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <FrownIcon className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              You don&apos;t have any projects
            </h1>
            <p className="text-lg">
              do you want to
              <Link className="ms-1 text-primary" href="/create/project">
                create a new project?
              </Link>
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default ProjectsPage;
