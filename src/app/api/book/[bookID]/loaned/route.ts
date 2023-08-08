import prisma from "@/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const bookID = params.bookID;

  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const findBook = await prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });

  if (!findBook) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  const updateLoaned = await prisma.book.update({
    where: {
      id: bookID,
    },
    data: {
      loaned: false,
    },
  });

  const latestRentHistory = await prisma.rentHistory.findFirst({
    where: {
      bookId: bookID,
    },
    orderBy: {
      deliveryDate: "desc",
    },
    take: 1,
  });

  if (!latestRentHistory) {
    // Caso não haja histórico de empréstimo
    return NextResponse.json("Histórico de empréstimo não encontrado", {
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
