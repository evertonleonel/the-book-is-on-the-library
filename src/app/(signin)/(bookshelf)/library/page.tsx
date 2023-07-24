"use client";

import React, { useEffect, useState } from "react";

import { Metadata } from "next";

import { getAllBooks } from "@/lib/services";

import { GetBook } from "@/types";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/cards/book-card";
import LinkBackHome from "@/components/link-back-home";
import { BookModal } from "@/components/modals/book-modal";
import FilterComponent from "./filter-component";

export const metadata: Metadata = {
  title: "Library - Archive",
};

const LibraryPage = () => {
  const [books, setBooks] = useState<GetBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<GetBook[]>();

  const [filterBooks, setFilterBooks] = useState<{
    genre: string;
    createdAt: string;
    searchText: string;
  }>({
    genre: "0",
    createdAt: "",
    searchText: "",
  });

  useEffect(() => {
    getAllBooks().then((data) => setBooks(data));
  }, [books]);

  const handleClickFilter = () => {
    const filteredBooks = books.filter((book) => {
      const genre = filterBooks.genre == "0" || book.genre == filterBooks.genre;
      const searchText =
        !filterBooks.searchText ||
        book.author
          .toLocaleLowerCase()
          .includes(filterBooks.searchText.toLocaleLowerCase()) ||
        book.title
          .toLocaleLowerCase()
          .includes(filterBooks.searchText.toLocaleLowerCase());

      const createdAt =
        !filterBooks.createdAt ||
        new Date(book.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(
            filterBooks.createdAt.split("-").reverse().join("/").toLowerCase()
          );

      return genre && searchText && createdAt;
    });

    setFilteredBooks(filteredBooks);
  };

  const handleFilterData = (value: string, name: string) => {
    setFilterBooks({ ...filterBooks, [name]: value });
  };

  const searchDateOrGenre = () => {
    handleClickFilter();
  };

  const clearFields = () => {
    setFilterBooks({
      genre: "0",
      createdAt: "",
      searchText: "",
    });
  };

  return (
    <>
      <LinkBackHome>Biblioteca</LinkBackHome>
      <section className="flex-1 grid gap-4 justify-center items-center w-full mb-4">
        <div className="container flex items-center justify-center gap-4 h-14 lg:min-w-[800px]  w-full ">
          <div className="w-full flex justify-center items-center rounded-md border border-input bg-background  p-2 focus-within:ring-2 ring-offset-background ring-slate-400 dark:ring-slate-950">
            <Icons.search />
            <Input
              name="searchText"
              value={filterBooks.searchText}
              onChange={(e) => handleFilterData(e.target.value, "searchText")}
              className=" bg-transparent border-none ring-0  ring-transparent  focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none focus-visible:ring-offset-0"
              placeholder="Pesquisar livro..."
            />
            <Button onClick={handleClickFilter}>Buscar</Button>
          </div>
          <FilterComponent
            handleFilterData={handleFilterData}
            searchDateOrGenre={searchDateOrGenre}
            clearFields={clearFields}
            filterBooks={filterBooks}
          />
        </div>
        <ul className="container grid sm:grid-auto-fit-xs  place-items-center gap-8">
          {books && filteredBooks
            ? filteredBooks.map((book) => {
                return (
                  <BookModal key={book.id} book={book}>
                    <BookCard image={String(book.image)} title={book.title} />
                  </BookModal>
                );
              })
            : books.map((book) => {
                return (
                  <BookModal key={book.id} book={book}>
                    <BookCard image={String(book.image)} title={book.title} />
                  </BookModal>
                );
              })}
        </ul>
      </section>
    </>
  );
};

export default LibraryPage;
