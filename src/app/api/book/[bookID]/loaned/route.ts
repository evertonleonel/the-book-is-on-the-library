import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const bookID = params.bookID;

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

  const updateHistory = await prisma.rentHistory.update({
    where: {
      id: latestRentHistory?.id,
    },
    data: {
      deliveryDate: new Date().toISOString(),
    },
  });

  console.log(updateHistory, "update--- rent data");

  return NextResponse.json(updateLoaned);
}
