"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { LoanModalForm } from "../forms/loan-modal-form";
import { getBooksFunction } from "./book-modal";

export const LoanModal = ({
  children,
  disabled,
  bookId,
  getBooks,
  updateBook,
}: {
  children: React.ReactNode;
  disabled: boolean;
  bookId: string;
  getBooks: (params: getBooksFunction) => Promise<void>;
  updateBook: () => void;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={disabled}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl text-left mt-2">
            Informe os dados do aluno
          </DialogTitle>
          <LoanModalForm
            getBooks={getBooks}
            bookId={bookId}
            onClick={() => setOpen(false)}
            updateBook={updateBook}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
