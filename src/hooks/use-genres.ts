import { defaultGenres } from "@/config/site";
import { getAllBooks } from "@/lib/services";
import { Book } from "@/types";
import { useEffect, useState } from "react";

export function useGenres() {
  const [genre, setGenre] = useState<String[]>([]);

  useEffect(() => {
    getAllBooks().then((data: { allBooks: Book[]; countBooks: number }) => {
      const genres = data.allBooks.map((el) => {
        return el.genre;
      });

      const updatedGenresSet = new Set([...genres, ...defaultGenres]);

      const updatedGenres = Array.from(updatedGenresSet).sort();

      setGenre(updatedGenres);
    });
  }, []);

  return { genre, defaultGenres };
}
