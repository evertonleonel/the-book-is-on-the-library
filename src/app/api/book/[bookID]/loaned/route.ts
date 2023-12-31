import prisma from "@/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const findBook = await prisma.book.findFirst({
    where: {
      id: params.bookID,
    },
  });

  if (!findBook) {
    return new Response("Livro não encontrado", { status: 404 });
  }

  const updateLoaned = await prisma.book.update({
    where: {
      id: params.bookID,
    },
    data: {
      loaned: false,
    },
  });

  const latestRentHistory = await prisma.rentHistory.findFirst({
    where: {
      bookId: params.bookID,
    },
    orderBy: {
      deliveryDate: "desc",
    },
    take: 1,
  });

  if (!latestRentHistory) {
    // Caso não haja histórico de empréstimo
    return new Response("Histórico de empréstimo não encontrado", {
      status: 404,
    });
  }

  await prisma.rentHistory.update({
    where: {
      id: latestRentHistory?.id,
    },
    data: {
      deliveryDate: new Date().toISOString(),
    },
  });

  return NextResponse.json(updateLoaned);
}
