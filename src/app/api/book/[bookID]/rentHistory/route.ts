import prisma from "@/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { loanModalSchema } from "@/lib/validations/index";

export async function POST(request: NextRequest, { params }: { params: any }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  try {
    const { studentName, className, withdrawalDate, deliveryDate } =
      loanModalSchema.parse(await request.json());

    if (!studentName || !className || !withdrawalDate || !deliveryDate) {
      return new Response(
        "Possíveis informações ausentes: Nome do aluno, classe, data de empréstimo, data de devolução",
        { status: 400 }
      );
    }

    if (new Date(withdrawalDate) > new Date(deliveryDate)) {
      return new Response(
        "A data de entrada não pode ser maior que a data de retirada ",
        { status: 204 }
      );
    }

    const currentDate = new Date();

    const aggregatedRentHistory = await prisma.rentHistory.aggregate({
      where: {
        bookId: params.bookID,
        deliveryDate: {
          gte: currentDate,
        },
      },
      _count: {
        deliveryDate: true,
      },
    });

    if (aggregatedRentHistory._count.deliveryDate > 0) {
      return new Response("O livro já está emprestado", {
        status: 400,
      });
    }

    await prisma.book.update({
      where: {
        id: params.bookID,
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
        bookId: params.bookID,
      },
    });

    return NextResponse.json(newRentHistory);
  } catch (error) {
    return new Response("Ocorreu um erro ao criar o histórico de aluguel.", {
      status: 500,
    });
  }
}
