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
      id: findBook.id,
    },
    data: {
      loaned: false,
    },
  });

  const lastRentHistory = await prisma.rentHistory.findFirst({
    orderBy: { withdrawalDate: "desc" },
  });

  if (!lastRentHistory) {
    return NextResponse.json("Histórico não encontrado", { status: 404 });
  }

  const updateLastRentHistory = await prisma.rentHistory.update({
    where: {
      id: lastRentHistory.id,
    },
    data: { withdrawalDate: new Date().toISOString() },
  });

  return NextResponse.json(updateLastRentHistory);
}
