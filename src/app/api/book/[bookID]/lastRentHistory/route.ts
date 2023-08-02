import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const rentID = params.ID;
  const historyBook = await prisma.rentHistory.findFirst({
    where: {
      id: rentID,
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
