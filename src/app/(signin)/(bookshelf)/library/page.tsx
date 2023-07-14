"use client";

import React from "react";

import { Metadata } from "next";

import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import BookCard from "@/components/cards/book-card";
import LinkBackHome from "@/components/link-back-home";
import { LockModal } from "@/components/modals/lock-modal";
import { LoanModal } from "@/components/modals/loan-modal";
import { BookModal } from "@/components/modals/book-modal";
import { HistoryModal } from "@/components/modals/history-modal";

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
            <Button onClick={() => toast("My first toast")}>Buscar</Button>
          </div>
          <Input className="w-2/5 h-full" placeholder="filtrar" />
        </div>
        <BookModal>Book Modal</BookModal>
        <LockModal>Lock Modal</LockModal>
        <LoanModal>Loan Modal</LoanModal>
        <HistoryModal>History Modal</HistoryModal>
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
