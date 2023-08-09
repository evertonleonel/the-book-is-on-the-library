import prisma from "@/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { lockBookModalSchema } from "@/lib/validations/index";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }
  try {
    const { description } = lockBookModalSchema.parse(await request.json());
    const findBook = await prisma.book.findFirst({
      where: {
        id: params.bookID,
      },
    });

    if (!findBook) {
      return new Response("Livro não encontrado", { status: 404 });
    }

    if (!description) {
      return new Response("Informe o motivo da inativação", {
        status: 400,
      });
    }

    const pathBook = await prisma.book.update({
      where: {
        id: params.bookID,
      },
      data: {
        status: false,
        description,
      },
    });

    return NextResponse.json(pathBook);
  } catch (error) {
    return new Response("Entidade não processável", { status: 442 });
  }
}
