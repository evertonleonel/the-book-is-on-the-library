"use client";

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { IconInput } from "@/components/icon-input";
import { Icons } from "@/components/icons";
import { RentHistoryBook } from "@/types";

type TObjFilter = {
  studentName: string;
  className: string;
  withdrawalDate: string;
  deliveryDate: string;
};

const TableLoanModal = ({
  history,
}: {
  history: RentHistoryBook[];
  bookID: string;
}) => {
  const [rentHistory, setRentHistory] = useState<RentHistoryBook[]>([]);

  const [fieldFilter, setFieldFilter] = useState<TObjFilter>({
    studentName: "",
    className: "",
    deliveryDate: "",
    withdrawalDate: "",
  });

  useEffect(() => {
    if (history) {
      setRentHistory(history);
    }
  }, []);

  const filterRentHistory = rentHistory.filter((history) => {
    const studantFilter =
      !fieldFilter.studentName ||
      history.studentName
        .toLowerCase()
        .includes(fieldFilter.studentName.toLowerCase());

    const classeFilter =
      !fieldFilter.className ||
      history.className
        .toLowerCase()
        .includes(fieldFilter.className.toLowerCase());

    const deliveryDateFilter =
      !fieldFilter.deliveryDate ||
      history.deliveryDate
        .toLowerCase()
        .includes(fieldFilter.deliveryDate.toLowerCase());

    const withdrawalDateFilter =
      !fieldFilter.withdrawalDate ||
      history.withdrawalDate
        .toLowerCase()
        .includes(fieldFilter.withdrawalDate.toLowerCase());

    return (
      studantFilter &&
      classeFilter &&
      deliveryDateFilter &&
      withdrawalDateFilter
    );
  });

  const handleFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFieldFilter((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full overflow-auto">
      <Table className=" shadow-md rounded bg-background px-4 mb-2">
        <TableCaption>Histórico de empréstimos.</TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-950">
            <TableHead className="font-bold">Aluno</TableHead>
            <TableHead className="font-bold">Classe</TableHead>
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
              <IconInput
                name="studentName"
                onChange={(e) => handleFilter(e)}
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
            <TableCell className="w-1/5">
              <IconInput
                onChange={(e) => handleFilter(e)}
                name="className"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
            <TableCell className="w-1/5">
              <Input
                onChange={(e) => handleFilter(e)}
                name="withdrawalDate"
                type="date"
                className="bg-transparent"
              />
            </TableCell>
            <TableCell className="w-1/5">
              <Input
                onChange={(e) => handleFilter(e)}
                name="deliveryDate"
                type="date"
                className="bg-transparent"
              />
            </TableCell>
          </TableRow>

          {rentHistory &&
            filterRentHistory.map(
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
                        {new Date(withdrawalDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={`font-medium text-right`}>
                        {new Date(deliveryDate).toLocaleDateString()}
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
