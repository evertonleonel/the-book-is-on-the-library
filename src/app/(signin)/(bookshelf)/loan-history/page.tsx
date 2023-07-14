import React from "react";

import { Metadata } from "next";

import LinkBackHome from "@/components/link-back-home";
import TableLoan from "../../../../components/tables/table-loan";

export const metadata: Metadata = {
  title: "Library - Loan",
};

const LoanPage = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <LinkBackHome>Empréstimos</LinkBackHome>
      <section className="mx-1">
        <TableLoan />
      </section>
    </div>
  );
};

export default LoanPage;
