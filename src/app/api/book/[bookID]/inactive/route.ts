import prisma from "@/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const bookID = params.bookID;
  const { userId } = auth();
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const data = await request.json();
  const { description } = data;

  const findBook = await prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });

  if (!findBook) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  if (!description) {
    return NextResponse.json("Informe o motivo da inativação", {
      status: 400,
    });
  }

  const pathBook = await prisma.book.update({
    where: {
      id: bookID,
    },
    data: {
      status: false,
      description,
    },
  });

  return NextResponse.json(pathBook);
}
