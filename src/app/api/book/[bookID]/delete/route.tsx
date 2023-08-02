import prisma from "@/db";
import { NextResponse } from "next/server";

//Delete Book
export async function Delete({ params }: { params: any }) {
  const bookID = params.bookID;

  const book = await prisma.book.findFirst({
    where: {
      id: bookID,
    },
  });

  console.log(bookID, "ID BOOK");

  if (!book) {
    return NextResponse.json("Livro não encontrado", { status: 404 });
  }

  const deleteBook = await prisma.book.delete({
    where: {
      id: book.id,
    },
  });

  return NextResponse.json(deleteBook);
}
