import React from "react";

import { Metadata } from "next";
import { Icons } from "@/components/icons";
import BookCard from "@/components/cards/book-card";
import LinkBackHome from "@/components/link-back-home";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockBookModal } from "@/components/modals/lock-book-modal";

export const metadata: Metadata = {
  title: "Library - Archive",
};

const LibraryPage = () => {
  return (
    <>
      <LinkBackHome>Biblioteca</LinkBackHome>
      <section className="flex-1 grid gap-4 justify-center items-center w-full mb-4">
        <div className="container flex items-center justify-center w-full gap-4 h-14">
          <div className="w-full flex justify-center items-center rounded-md border border-input bg-background  p-2 focus-within:ring-2 ring-offset-background ring-slate-400 dark:ring-slate-950">
            <Icons.search />
            <Input
              className=" bg-transparent border-none ring-0  ring-transparent  focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none focus-visible:ring-offset-0"
              placeholder="Pesquisar livro..."
            />
            <Button>Buscar</Button>
          </div>
          <Input className="w-2/5 h-full" placeholder="filtrar" />
        </div>
        <LockBookModal>Abrir modal</LockBookModal>
        <ul className="container grid sm:grid-auto-fit-xs  place-items-center gap-8">
          <BookCard title="Testando 1 2" />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </ul>
      </section>
    </>
  );
};

export default LibraryPage;
