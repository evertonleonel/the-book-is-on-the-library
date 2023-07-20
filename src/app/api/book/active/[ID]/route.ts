import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const bookID = params.ID;
  const data = await request.json();
  const { status } = data;

  const findBook = await prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });

  if (!findBook) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  if (!status) {
    return NextResponse.json("Informe o status", {
      status: 400,
    });
  }

  const pathBook = await prisma.book.update({
    where: {
      id: bookID,
    },
    data: {
      status: true,
      description: "",
    },
  });

  return NextResponse.json(pathBook);
}
