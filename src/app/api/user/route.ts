import { getServerAuthSession } from "@/server/auth";
import { userSettingsSchema } from "@/zod/user-settings";
import { db } from "@/server/db";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  const valuesRequest = await request.json();
  const values = userSettingsSchema.safeParse(valuesRequest);
  if (values.error) {
    return NextResponse.json({ error: values.error, status: 401 });
  }

  if (!session)
    return NextResponse.json({ error: "You must be logged in!", status: 401 });

  const updatedUser = await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...values.data,
    },
  });
  return NextResponse.json({ updatedUser });
}

export async function DELETE() {
  const session = await getServerAuthSession();
  if (!session) return { error: "You must be logged in!" };
  let deletedUser: User | undefined = undefined;
  try {
    deletedUser = await db.user.delete({ where: { id: session.user.id } });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
  return NextResponse.json({ deletedUser, status: 200 });
}
