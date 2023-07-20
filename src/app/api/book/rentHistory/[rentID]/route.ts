import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const rentID = params.rentID;

  const historyBook = await prisma.rentHistory.findFirst({
    where: {
      id: rentID,
    },
  });

  if (!historyBook) {
    return NextResponse.json("Histórico não encontrado", { status: 404 });
  }

  return NextResponse.json(historyBook);
}
