import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

//Get book
export async function GET(request: NextRequest, { params }: { params: any }) {
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
  const { title, author, genre, synopsis, image, description, status } = data;

  const findBook = await prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });

  if (!findBook) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  if (
    !title ||
    !author ||
    !genre ||
    !synopsis ||
    !image ||
    !description ||
    status
  ) {
    return NextResponse.json(
      "Possíveis informações ausentes: título, autor, gênero, imagem, motivo da inativação, sinopse, status",
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
      description,
      status,
    },
  });

  return NextResponse.json(updateBook);
}
