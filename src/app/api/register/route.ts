import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { email, password } = data;

  console.log("Route Handler", data);

  if (!email || !password) {
    return NextResponse.json("Dados inválidos", { status: 400 });
  }

  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserExists) {
    return NextResponse.json(
      { error: "Este e-mail já existe" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return NextResponse.json(user);
}
