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

  return NextResponse.json(updateLoaned);
}
