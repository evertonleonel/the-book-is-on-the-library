import prisma from "@/db";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let pagination: { skip?: number; take?: number } = {};
  let where: Prisma.RentHistoryWhereInput = {};

  const { userId } = auth();
  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  if (searchParams) {
    const parseSearchparams = Object.fromEntries(searchParams);
    const {
      skip,
      take,
      searchStudent,
      searchClass,
      searchTitle,
      entryDate,
      deliveryDate,
    } = parseSearchparams as {
      searchStudent?: string;
      searchClass?: string;
      searchTitle?: string;
      take?: string;
      skip?: string;
      entryDate?: string;
      deliveryDate?: string;
      genre?: string;
    };

    if (skip && take)
      pagination = {
        take: +take,
        skip: +skip,
      };

    if (entryDate) {
      const maxDate = await prisma.rentHistory.findFirst({
        orderBy: [{ withdrawalDate: "desc" }, { deliveryDate: "desc" }],
      });

      where = {
        withdrawalDate: {
          gte: new Date(entryDate).toISOString(),
          lte: maxDate?.withdrawalDate,
        },
      };
    }

    if (deliveryDate) {
      const parseDate = new Date(`${deliveryDate}T23:59:59z`);

      where = {
        ...where,
        deliveryDate: {
          gte: new Date(deliveryDate).toISOString(),
          lte: new Date(parseDate).toISOString(),
        },
      };
    }

    if (searchStudent) {
      where.OR = [
        {
          ...where,
          studentName: {
            startsWith: searchStudent,
            mode: "insensitive",
          },
        },
      ] as any;
    }

    if (searchClass) {
      where.OR = [
        {
          ...where,
          className: {
            startsWith: searchClass,
            mode: "insensitive",
          },
        },
      ] as any;
    }

    if (searchTitle) {
      where.OR = [
        {
          ...where,
          Book: {
            title: {
              startsWith: searchTitle,
              mode: "insensitive",
            },
          },
        },
      ] as any;
    }
  }

  const allHistories = await prisma.rentHistory.findMany({
    where,
    ...pagination,
    include: {
      Book: {
        select: {
          title: true,
        },
      },
    },
  });

  const historiesWithTitles = allHistories.map((history) => ({
    id: history.id,
    studentName: history.studentName,
    className: history.className,
    withdrawalDate: history.withdrawalDate,
    deliveryDate: history.deliveryDate,
    title: history.Book?.title,
  }));

  return NextResponse.json(historiesWithTitles);
}
