"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudentTableData = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full overflow-auto">
      <h2 className="mb-2 font-bold text-lg md:text-xl">Dados do Aluno</h2>
      <Table className=" shadow-md rounded bg-background px-4 mb-2">
        <TableHeader className="bg-slate-500">
          <TableRow>
            <TableHead className="font-bold text-accent">Aluno</TableHead>
            <TableHead className="font-bold text-accent">Turma</TableHead>
            <TableHead className="text-right font-bold text-accent">
              Data empréstimo
            </TableHead>
            <TableHead className="text-right font-bold text-accent">
              Data devolução
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-slate-500">
          <TableRow>
            <TableCell className="font-medium">Everton Leonel</TableCell>
            <TableCell>Turma KLB</TableCell>
            <TableCell className="text-right">10/12/2022</TableCell>
            <TableCell className="text-right">03/04/2023</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTableData;
