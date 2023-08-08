import prisma from "@/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

//Get book
export async function GET(request: NextRequest, { params }: { params: any }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const book = await prisma.book.findFirst({
    where: {
      id: params.bookID,
    },
  });

  if (!book) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  return NextResponse.json(book);
}

//Update Book
export async function PUT(request: NextRequest, { params }: { params: any }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const data = await request.json();

  const { title, author, genre, synopsis, image, systemEntryDate } = data;

  const findBook = await prisma.book.findFirst({
    where: {
      id: params.bookID,
    },
  });

  if (!findBook) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  if (!title || !author || !genre || !synopsis || !image || !systemEntryDate) {
    return NextResponse.json(
      "Possíveis informações ausentes: título, autor, gênero, imagem, motivo da inativação, sinopse, status, data de entrada",
      { status: 400 }
    );
  }

  const updateBook = await prisma.book.update({
    where: {
      id: params.bookID,
    },
    data: {
      title,
      author,
      genre,
      synopsis,
      image,
      systemEntryDate,
    },
  });

  return NextResponse.json(updateBook);
}

//Delete Book
export async function DELETE(
  request: NextRequest,
  { params }: { params: { bookID: string } }
) {
  const bookID = params.bookID;

  const { userId } = getAuth(request);
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }
  const book = await prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });

  if (!book) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  try {
    const transaction = await prisma.$transaction([
      prisma.rentHistory.deleteMany({
        where: {
          bookId: bookID,
        },
      }),
      prisma.book.delete({
        where: {
          id: bookID,
        },
      }),
    ]);
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json("Erro ao excluir livro", { status: 500 });
  }
}
