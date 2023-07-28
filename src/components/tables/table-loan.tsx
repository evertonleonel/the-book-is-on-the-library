"use client";
import React, { useEffect, useState } from "react";

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
import { useRequest } from "@/hooks/useRequest";
import useDebounce from "@/hooks/useDebounce";
import { catchError } from "@/lib/utils";
import { RentHistoryBook } from "@/types";

type allRentHistory = RentHistoryBook & {
  title: string;
};

const TableLoan = () => {
  const { apiRequest } = useRequest();
  const [loading, setLoading] = useState(true);
  const [histories, setHistories] = useState<allRentHistory[]>([]);
  // const [search, setSearch] = useState<{
  //   studentName: string;
  //   className: string;
  //   title: string;
  // }>({
  //   studentName: "",
  //   className: "",
  //   title: "",
  // });
  // const debounced = useDebounce(search);

  const [entryDate, setEntryDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const debouncedStudent = useDebounce(searchStudent);
  const debouncedClassName = useDebounce(searchClass);
  const debouncedBookTitle = useDebounce(searchTitle);

  const getHistories = async (params: {
    searchStudent?: string;
    searchClass?: string;
    searchTitle?: string;
    take?: number;
    skip?: number;
    entryDate?: string;
    deliveryDate?: string;
  }) => {
    await apiRequest("get", "/book/rentHistories", {
      params: {
        ...params,
      },
    })
      .then(({ data }) => {
        setHistories(data);
      })
      .catch((error) => {
        catchError(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    (async () => {
      await apiRequest("get", "/book/rentHistories", {
        params: {
          take: 10,
          skip: 0,
        },
      })
        .then(({ data }) => {
          setHistories(data);
        })
        .catch((error) => {
          catchError(error);
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  useEffect(() => {
    getHistories({
      searchStudent: debouncedStudent,
      searchClass: debouncedClassName,
      searchTitle: debouncedBookTitle,
      entryDate: entryDate,
      deliveryDate: deliveryDate,
      take: 10,
      skip: 0,
    });
  }, [
    debouncedStudent,
    debouncedClassName,
    debouncedBookTitle,
    entryDate,
    deliveryDate,
  ]);

  useEffect(() => {
    console.log("re-render");
  });

  return (
    <div className="max-w-[1400px] mx-auto w-full overflow-auto">
      <Table className=" shadow-md rounded bg-background px-4 mb-2">
        <TableCaption>Lista de todos os livros no acervo.</TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-950  hover:bg-indigo-900  dark:hover:bg-indigo-950/80">
            <TableHead className="font-bold">Aluno</TableHead>
            <TableHead className="font-bold">Turma</TableHead>
            <TableHead className="font-bold">Livro</TableHead>
            <TableHead className="text-right  font-bold">
              Data Retirada
            </TableHead>
            <TableHead className="text-right  font-bold">
              Data Entrega
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-1/5">
              <IconInput
                onChange={({ target: { value } }) => {
                  setSearchStudent(value);
                }}
                name="studentName"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
            <TableCell className="w-1/5">
              <IconInput
                onChange={({ target: { value } }) => {
                  setSearchClass(value);
                }}
                name="className"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
            <TableCell className="w-1/5">
              <IconInput
                onChange={({ target: { value } }) => {
                  setSearchTitle(value);
                }}
                name="title"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
            <TableCell className="w-1/5">
              <IconInput
                type="date"
                onChange={(e) => {
                  setEntryDate(e.target.value);
                }}
                name="withdrawalDate"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
            <TableCell className="w-1/5">
              <IconInput
                type="date"
                onChange={(e) => {
                  setDeliveryDate(e.target.value);
                }}
                name="deliveryDate"
                className="bg-transparent"
                icon={Icons.filter}
              />
            </TableCell>
          </TableRow>

          {histories.map((history, index) => {
            return (
              <TableRow key={`${index}-${history.id}`}>
                <TableCell className="font-medium">
                  {history.studentName}
                </TableCell>
                <TableCell className="font-medium">
                  {history.className}
                </TableCell>
                <TableCell className="font-medium">{history.title}</TableCell>

                <TableCell className="font-medium text-right">
                  {new Date(history.withdrawalDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium  text-right">
                  {new Date(history.deliveryDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableLoan;
