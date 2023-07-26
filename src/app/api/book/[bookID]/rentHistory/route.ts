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

  const { studentName, className, withdrawalDate, deliveryDate } = data;

  if (!studentName || !className || !withdrawalDate || !deliveryDate) {
    return NextResponse.json(
      "Possíveis informações ausentes: Nome do aluno, classe, data de empréstimo, data de devolução",
      { status: 400 }
    );
  }

  try {
    const newRentHistory = await prisma.rentHistory.create({
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
  } catch (error) {
    return NextResponse.json(
      "Ocorreu um erro ao criar o histórico de aluguel.",
      {
        status: 500,
      }
    );
  }
}
