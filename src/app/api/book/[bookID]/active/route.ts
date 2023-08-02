import prisma from "@/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const bookID = params.bookID;

  const { userId } = auth();
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

  const actualStatus = findBook.status;

  if (actualStatus) {
    return NextResponse.json("Livro está ativado", { status: 404 });
  }

  const updateStatus = await prisma.book.update({
    where: {
      id: bookID,
    },
    data: {
      status: true,
      description: "",
    },
  });

  return NextResponse.json(updateStatus);
}
