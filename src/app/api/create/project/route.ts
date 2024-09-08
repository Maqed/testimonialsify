import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { createProjectsSchema } from "@/zod/projects";

export async function POST(request: Request) {
  const data = await request.json();
  const validatedValues = createProjectsSchema.safeParse(data);
  if (!validatedValues?.data) {
    return NextResponse.json({ error: "Invalid data" }, { status: 401 });
  }
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: userId, tierId } = session.user;
  // Check user's project count and tier limits
  const userProjects = await db.project.count({ where: { userId } });
  const tier = await db.tier.findUnique({ where: { id: tierId } });

  if (!tier) {
    return NextResponse.json({ error: "User has no tier" }, { status: 403 });
  }

  if (userProjects >= tier.maxProjects) {
    return NextResponse.json(
      { error: "Project limit exceeded" },
      { status: 403 },
    );
  }
  const project = await db.project.create({
    data: {
      name: validatedValues.data.name,
      userId,
    },
  });

  return NextResponse.json(project);
}
