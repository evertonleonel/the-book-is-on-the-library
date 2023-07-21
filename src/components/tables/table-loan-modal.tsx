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

const TableLoanModal = ({ history }: { history: RentHistoryBook[] }) => {
  const [rentHistory, setRentHistory] = useState<any[]>();

  useEffect(() => {
    if (history) {
      const parseRentHistory = history.map((element) => {
        return {
          ...element,
          deliveryDate: new Date(element.deliveryDate).toLocaleDateString(),
          withdrawalDate: new Date(element.withdrawalDate).toLocaleDateString(),
        };
      });
      setRentHistory(parseRentHistory);
    }
  }, [history]);

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
              <IconInput
                type="date"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
            <TableCell className="w-1/5">
              <IconInput
                type="date"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            {rentHistory &&
              rentHistory.map((el, index) => {
                return (
                  <>
                    <TableCell key={index} className={`font-medium`}>
                      {String(el)}
                    </TableCell>
                  </>
                );
              })}
            {/* <TableCell className="font-medium">Everton Leonel</TableCell>
            <TableCell>Turma AAA</TableCell>
            <TableCell className="text-right">10/12/2022</TableCell>
            <TableCell className="text-right">03/04/2023</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableLoanModal;
