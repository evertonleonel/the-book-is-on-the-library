import prisma from "@/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { lockBookModalSchema } from "@/lib/validations/index";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const bookID = params.bookID;
  const user = await currentUser();
  if (!user) {
    return new Response("Não autorizado", { status: 401 });
  }
  try {
    const { description } = lockBookModalSchema.parse(await request.json());
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
  } catch (error) {
    return new Response("Entidade não processável", { status: 442 });
  }
}
