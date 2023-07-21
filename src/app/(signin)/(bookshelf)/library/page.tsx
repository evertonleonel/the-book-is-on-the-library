"use client";

import React, { useEffect, useState } from "react";

import { Metadata } from "next";

import { getAllBooks } from "@/lib/services";

import { Book, GetBook } from "@/types";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/cards/book-card";
import LinkBackHome from "@/components/link-back-home";
import { BookModal } from "@/components/modals/book-modal";

export const metadata: Metadata = {
  title: "Library - Archive",
};

const LibraryPage = () => {
  const [books, setBooks] = useState<GetBook[]>([]);

  useEffect(() => {
    getAllBooks().then((data) => setBooks(data));
  }, [books]);

  return (
    <>
      <LinkBackHome>Biblioteca</LinkBackHome>
      <section className="flex-1 grid gap-4 justify-center items-center w-full mb-4">
        <div className="container flex items-center justify-center gap-4 h-14 lg:min-w-[800px]  w-full ">
          <div className="w-full flex justify-center items-center rounded-md border border-input bg-background  p-2 focus-within:ring-2 ring-offset-background ring-slate-400 dark:ring-slate-950">
            <Icons.search />
            <Input
              className=" bg-transparent border-none ring-0  ring-transparent  focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none focus-visible:ring-offset-0"
              placeholder="Pesquisar livro..."
            />
            <Button onClick={() => toast("My first toast")}>Buscar</Button>
          </div>
          <Input className="w-2/5 h-full" placeholder="filtrar" />
        </div>
        <ul className="container grid sm:grid-auto-fit-xs  place-items-center gap-8">
          {books &&
            books.length !== 0 &&
            books.map((book) => {
              return (
                <>
                  <BookModal book={book}>
                    <BookCard key={book.id} title={book.title} />
                  </BookModal>
                </>
              );
            })}
        </ul>
      </section>
    </>
  );
};

export default LibraryPage;
