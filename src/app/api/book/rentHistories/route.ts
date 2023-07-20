import prisma from "@/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const allHistories = await prisma.rentHistory.findMany();

  return NextResponse.json(allHistories);
}
