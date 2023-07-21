import { Book } from "@/types";
import { api } from "./api";

export const getAllBooks = async () => {
  const { data } = await api.get("/");
  return data;
};

export const createBook = async (book: Book) => {
  await api.post("/", book);
  return true;
};

export const updateBook = async (book: Book) => {
  const { data } = await api.put(`/${book.id}`, book);
  return data;
};
