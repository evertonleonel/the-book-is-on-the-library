import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

//Get All Books
export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const allBooks = await prisma.book.findMany();

  return NextResponse.json(allBooks);
}

// Create New Book
export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await request.json();
  const { title, author, genre, synopsis, image, systemEntryDate } = data;

  if (!title || !author || !genre || !synopsis || !systemEntryDate || !image) {
    return NextResponse.json(
      "Possíveis informações ausentes: título, autor, gênero, imagem, data de entrada, sinopse",
      { status: 400 }
    );
  }

  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      synopsis,
      genre,
      image,
      description: "",
    },
  });

  return NextResponse.json(newBook);
}
