"use client";
import React, { ReactNode, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconInput } from "@/components/icon-input";
import { Icons } from "@/components/icons";
import { RentHistoryBook } from "@/types";
import { Input } from "../ui/input";
import { getRentHistory } from "@/lib/services";
import { catchError } from "@/lib/utils";

const TableLoanModal = ({
  history,
  bookID,
}: {
  history: RentHistoryBook[];
  bookID: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [rentHistory, setRentHistory] = useState<RentHistoryBook[]>([]);
  const [historyBook, setHistoryBook] = useState<RentHistoryBook[]>([]);

  useEffect(() => {
    (async () => {
      await getRentHistory(bookID)
        .then((data) => setHistoryBook(data))
        .catch((error) => catchError(`Ops..., ${error}`))
        .finally(() => setLoading(false));
    })();
  }, [bookID]);

  useEffect(() => {
    if (historyBook) {
      const parseRentHistory = history.map((element) => {
        return {
          ...element,
          deliveryDate: new Date(element.deliveryDate).toLocaleDateString(),
          withdrawalDate: new Date(element.withdrawalDate).toLocaleDateString(),
        };
      });
      setRentHistory(parseRentHistory);
    }
  }, [historyBook]);

  return (
    <div className="max-w-[1400px] mx-auto w-full overflow-auto">
      <Table className=" shadow-md rounded bg-background px-4 mb-2">
        <TableCaption>Histórico de empréstimos.</TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-950">
            <TableHead className="font-bold">Aluno</TableHead>
            <TableHead className="font-bold">Livro</TableHead>
            <TableHead className="text-right  font-bold">
              Data Empréstimo
            </TableHead>
            <TableHead className="text-right  font-bold">
              Data Devolução
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-1/5">
              <IconInput className="bg-transparent" icon={Icons.filter} />
            </TableCell>
            <TableCell className="w-1/5">
              <IconInput className="bg-transparent" icon={Icons.filter} />
            </TableCell>
            <TableCell className="w-1/5">
              <Input type="date" className="bg-transparent" />
            </TableCell>
            <TableCell className="w-1/5">
              <Input type="date" className="bg-transparent" />
            </TableCell>
          </TableRow>

          {rentHistory &&
            rentHistory.map(
              (
                { id, className, deliveryDate, studentName, withdrawalDate },
                index
              ) => {
                return (
                  <>
                    <TableRow key={`${index}-${id}`}>
                      <TableCell className={`font-medium`}>
                        {studentName}
                      </TableCell>
                      <TableCell className={`font-medium`}>
                        {className}
                      </TableCell>
                      <TableCell className={`font-medium text-right`}>
                        {withdrawalDate}
                      </TableCell>
                      <TableCell className={`font-medium text-right`}>
                        {deliveryDate}
                      </TableCell>
                    </TableRow>
                  </>
                );
              }
            )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableLoanModal;
