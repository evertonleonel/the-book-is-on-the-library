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
import { IconInput } from "@/components/icon-input";
import { Icons } from "@/components/icons";

const TableLoan = () => {
  return (
    <Table className="container w-full shadow-2xl px-4 mb-4 ">
      <TableCaption>Lista de todos os livros no acervo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Aluno</TableHead>
          <TableHead>Turma</TableHead>
          <TableHead>Livro</TableHead>
          <TableHead className="text-right">Data Retirada</TableHead>
          <TableHead className="text-right">Data Entrega</TableHead>
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
            <IconInput className="bg-transparent" icon={Icons.filter} />
          </TableCell>
          <TableCell className="w-1/5">
            <IconInput className="bg-transparent" icon={Icons.filter} />
          </TableCell>
          <TableCell className="w-1/5">
            <IconInput className="bg-transparent" icon={Icons.filter} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Everton Leonel</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">10/12/2022</TableCell>
          <TableCell className="text-right">03/04/2023</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableLoan;
