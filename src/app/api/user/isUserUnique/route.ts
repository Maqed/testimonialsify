import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "";

  const user = await db.user.findUnique({
    where: { username },
  });

  return NextResponse.json({ isUnique: !user });
}
