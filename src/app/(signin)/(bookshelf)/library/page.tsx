"use client";

import React, { useEffect, useState } from "react";

import { Metadata } from "next";

import { GetBook } from "@/types";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/cards/book-card";
import LinkBackHome from "@/components/link-back-home";
import { BookModal } from "@/components/modals/book-modal";
import FilterComponent from "./filter-component";
import { useRequest } from "@/hooks/useRequest";
import useDebounce from "@/hooks/useDebounce";
import { catchError } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Library - Archive",
};

const LibraryPage = () => {
  const { apiRequest } = useRequest();
  const [books, setBooks] = useState<GetBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState<string>("");
  const [filterDate, setFilterDate] = useState("");

  const debounced = useDebounce(search);

  const getBooks = async (params: {
    search?: string;
    take?: number;
    skip?: number;
    date?: string;
    genre?: string;
  }) => {
    await apiRequest("get", "/book", {
      params: {
        ...params,
      },
    })
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((error) => {
        catchError(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    (async () => {
      await apiRequest("get", "/book", {
        params: {
          take: 10,
          skip: 0,
        },
      })
        .then(({ data }) => {
          setBooks(data);
        })
        .catch((error) => {
          catchError(error);
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  console.log(books);

  useEffect(() => {
    getBooks({
      search: debounced,
      take: 10,
      skip: 0,
      date: filterDate,
      genre: filterGenre,
    });
  }, [debounced]);

  const applyFilter = () => {
    getBooks({
      date: filterDate,
      genre: filterGenre,
    });
  };

  const clearFilters = () => {
    setFilterGenre("");
    setFilterDate("");
    getBooks({});
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
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
              className=" bg-transparent border-none ring-0  ring-transparent  focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none focus-visible:ring-offset-0"
              placeholder="Pesquisar livro..."
            />
          </div>
          <FilterComponent
            setFilterGenre={setFilterGenre}
            setFilterDate={setFilterDate}
            filterGenre={filterGenre}
            filterDate={filterDate}
            applyFilter={applyFilter}
            clearFilters={clearFilters}
          />
        </div>
        <ul className="container grid sm:grid-auto-fit-xs  place-items-center gap-8">
          {books &&
            books.map((book) => {
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
