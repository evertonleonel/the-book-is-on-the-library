import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

//Get All Books
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let pagination: { skip?: number; take?: number } = {};
  let where: Prisma.BookWhereInput = {};

  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (searchParams) {
    const parseSearchparams = Object.fromEntries(searchParams);
    const { skip, take, search, date, genre } = parseSearchparams as {
      take?: string;
      skip?: string;
      search?: string;
      date?: string;
      genre?: string;
    };

    if (skip && take)
      pagination = {
        take: +take,
        skip: +skip,
      };

    if (date) {
      const parseDate = new Date(`${date}T23:59:59z`);
      where = {
        ...where,
        systemEntryDate: {
          gte: new Date(date).toISOString(),
          lte: new Date(parseDate).toISOString(),
        },
      };
    }

    if (genre) {
      where = {
        ...where,
        genre: genre,
      };
    }

    if (search) {
      where.OR = [
        {
          title: {
            startsWith: search,
            mode: "insensitive",
          },
        },
        {
          author: {
            startsWith: search,
            mode: "insensitive",
          },
        },
      ] as any;
    }
  }

  const allBooks = await prisma.book.findMany({
    where,
    ...pagination,
    include: { rentHistory: true },
  });

  const countBooks = await prisma.book.count({
    where,
  });

  const responseBooks = {
    allBooks,
    countBooks,
  };

  return NextResponse.json(responseBooks);
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
      image,
      description: "",
      systemEntryDate,
      genre,
    },
  });

  return NextResponse.json(newBook);
}
