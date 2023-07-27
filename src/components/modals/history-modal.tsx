"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TableLoanModal from "../tables/table-loan-modal";
import { RentHistoryBook } from "@/types";

export const HistoryModal = ({
  history,
  children,
  bookID,
}: {
  history: RentHistoryBook[];
  children: React.ReactNode;
  bookID: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[1400px]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-base sm:text-lg md:text-xl text-left mt-2">
            Histórico de empréstimos do livro
          </DialogTitle>
          <TableLoanModal history={history} bookID={bookID} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
