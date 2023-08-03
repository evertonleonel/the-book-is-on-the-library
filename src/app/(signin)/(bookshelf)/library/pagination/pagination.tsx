import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";

// máximo de botoes
const MAX_ITENS = 9;
const MAX_LEFT = MAX_ITENS - 1 / 2;

interface PaginationProps {
  limit: number;
  total: number;
  skip: number;
  setSkip: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ limit, total, skip, setSkip }: PaginationProps) => {
  const currentPage = skip ? skip / limit + 1 : 1;
  const totalPages = Math.ceil(total / limit);
  const first = Math.max(currentPage - MAX_LEFT, 1);

  function onPageChange(page: number) {
    setSkip((page - 1) * limit);
  }

  return (
    <ul className="flex gap-2 justify-center items-center">
      {total && total > 0 ? (
        <li>
          <Button
            variant={"ghost"}
            size={"icon"}
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Icons.chevronLeft />
          </Button>
        </li>
      ) : null}
      {Array.from({ length: Math.min(MAX_ITENS, totalPages) })
        .map((_, index) => index + first)
        .map((page) => {
          if (page <= totalPages) {
            return (
              <li key={page}>
                <Button
                  size={"icon"}
                  className={`${
                    page === currentPage
                      ? "bg-background text-foreground  hover:bg-indigo-950 border-none"
                      : null
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              </li>
            );
          }
        })}

      {total && total > 0 ? (
        <li>
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Icons.chevronRight />
          </Button>
        </li>
      ) : null}
    </ul>
  );
};

export default Pagination;
