import { getAllBooks } from "@/lib/services";
import { GetBook } from "@/types";
import { useEffect, useState } from "react";

export function useGetBooks() {
  const [books, setBooks] = useState<GetBook[]>([]);

  useEffect(() => {
    getAllBooks().then((data) => setBooks(data));
  }, []);

  return { books };
}
