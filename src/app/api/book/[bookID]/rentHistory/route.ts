import prisma from "@/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { loanModalSchema } from "@/lib/validations/index";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const rentID = params.rentID;

  const historyBook = await prisma.rentHistory.findMany({
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
  const { userId } = auth();
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const bookID = params.bookID;

  try {
    const { studentName, className, withdrawalDate, deliveryDate } =
      loanModalSchema.parse(await request.json());

    if (!studentName || !className || !withdrawalDate || !deliveryDate) {
      return NextResponse.json(
        "Possíveis informações ausentes: Nome do aluno, classe, data de empréstimo, data de devolução",
        { status: 400 }
      );
    }
    await prisma.book.update({
      where: {
        id: bookID,
      },
      data: {
        loaned: true,
      },
    });

    const newRentHistory = await prisma.rentHistory.create({
      data: {
        studentName,
        className,
        withdrawalDate,
        deliveryDate,
        bookId: bookID,
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
