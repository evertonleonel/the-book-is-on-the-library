import prisma from "@/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

//Get book
export async function GET({ params }: { params: any }) {
  const bookID = params.bookID;

  const book = await prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });

  if (!book) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  return NextResponse.json(book);
}

//Update Book
export async function PUT(request: NextRequest, { params }: { params: any }) {
  const bookID = params.bookID;
  const data = await request.json();

  const { title, author, genre, synopsis, image, systemEntryDate } = data;

  const findBook = await prisma.book.findFirst({
    where: {
      id: bookID,
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
      id: bookID,
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
    console.error("Error deleting book:", error);
    return NextResponse.json("Erro ao excluir livro", { status: 500 });
  }
}
