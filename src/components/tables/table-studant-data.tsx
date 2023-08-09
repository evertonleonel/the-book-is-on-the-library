"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RentHistoryBook } from "@/types";

const StudentTableData = ({
  lastRentHistory,
}: {
  lastRentHistory: RentHistoryBook;
}) => {
  return (
    <div className="max-w-[1400px] mx-auto w-full overflow-auto mb-4 mt-2">
      <h2 className="mb-2 font-bold text-lg md:text-xl">Último empréstimo</h2>
      <Table className=" shadow-md rounded px-4 mb-2">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Aluno</TableHead>
            <TableHead className="font-bold">Turma</TableHead>
            <TableHead className="text-right font-bold">
              Data empréstimo
            </TableHead>
            <TableHead className="text-right font-bold">
              Data devolução
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow>
            <TableCell className="font-medium">
              {lastRentHistory.studentName}
            </TableCell>
            <TableCell>{lastRentHistory.className}</TableCell>
            <TableCell className="text-right">
              {new Date(lastRentHistory.withdrawalDate).toLocaleDateString(
                "pt-BR"
              )}
            </TableCell>
            <TableCell className="text-right">
              {new Date(lastRentHistory.deliveryDate).toLocaleDateString(
                "pt-BR"
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTableData;
