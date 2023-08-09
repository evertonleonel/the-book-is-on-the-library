import prisma from "@/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { bookID: string } }
) {
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

  const actualStatus = findBook.status;

  if (actualStatus) {
    return new Response("Livro está ativado", { status: 404 });
  }

  const updateStatus = await prisma.book.update({
    where: {
      id: params.bookID,
    },
    data: {
      status: true,
      description: "",
    },
  });

  return NextResponse.json(updateStatus);
}
