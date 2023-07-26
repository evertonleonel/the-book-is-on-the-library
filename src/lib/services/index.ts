import { Book, CreateBook, GetBook, RentHistoryBook } from "@/types";
import { api } from "./api";

export const getAllBooks = async () => {
  const { data } = await api.get("/book/");
  return data;
};

export const getBook = async (id: string) => {
  const { data } = await api.get(`/book/${id}`);
  return data;
};

export const createBook = async (book: CreateBook) => {
  await api.post("/book/", book);
  return true;
};
export const createRentHistory = async (book: RentHistoryBook) => {
  await api.post(`/book/${book.id}/rentHistory`, book);
  return true;
};

export const updateBook = async (book: GetBook) => {
  const { data } = await api.put(`/book/${book.id}`, book);
  return data;
};

export const inactiveBook = async (book: any) => {
  await api.patch(`/book/${book.id}/inactive`, book);
  return true;
};

export const activeBook = async (bookID: string) => {
  await api.patch(`/book/${bookID}/active`);
  return true;
};

export const loanedBook = async (bookID: string) => {
  await api.patch(`/book/${bookID}/loaned`);
  return true;
};
