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

export async function POST(request: NextRequest, { params }: { params: any }) {
  const bookID = params.bookID;
  const data = await request.json();
  console.log(
    data,
    "---------------------------------------------------------------------"
  );

  const { studentName, className, withdrawalDate, deliveryDate } = data;

  if (!studentName || !className || !withdrawalDate || !deliveryDate) {
    return NextResponse.json(
      "Possíveis informações ausentes: Nome do aluno, classe, data de empréstimo, data de devolução",
      { status: 400 }
    );
  }

  const newRentHistory = prisma.rentHistory.create({
    data: {
      studentName,
      className,
      withdrawalDate,
      deliveryDate,
      bookId: bookID,
      id: bookID,
    },
  });

  return NextResponse.json(newRentHistory);
}
