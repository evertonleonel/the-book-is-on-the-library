import { Book, CreateBook } from "@/types";
import { api } from "./api";

export const getAllBooks = async () => {
  const { data } = await api.get("/");
  return data;
};

export const getBook = async (id: string) => {
  const { data } = await api.get(`/${id}`);
  return data;
};

export const createBook = async (book: CreateBook) => {
  await api.post("/", book);
  return true;
};

export const updateBook = async (book: Book) => {
  const { data } = await api.put(`/${book.id}`, book);
  return data;
};

export const inactiveBook = async (book: any) => {
  await api.patch(`/${book.id}/inactive`, book);
  return true;
};

export const activeBook = async (bookID: string) => {
  await api.patch(`/${bookID}/active`);
  return true;
};

export const loanedBook = async (bookID: string) => {
  await api.patch(`/${bookID}/loaned`);
  return true;
};
