import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const historyBook = await prisma.rentHistory.findFirst({
    where: {
      id: params.ID,
    },
    orderBy: {
      deliveryDate: "desc",
    },
    take: 1,
  });

  if (!historyBook) {
    return NextResponse.json("Histórico não encontrado", { status: 404 });
  }

  return NextResponse.json(historyBook);
}
