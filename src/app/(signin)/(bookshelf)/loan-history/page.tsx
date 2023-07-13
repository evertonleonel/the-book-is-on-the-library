import React from "react";

import LinkBackHome from "@/components/link-back-home";
import TableLoan from "./table";

const LoanPage = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-slate-500">
      <LinkBackHome>Empréstimos</LinkBackHome>
      <section className="mx-1">
        <TableLoan />
      </section>
    </div>
  );
};

export default LoanPage;
