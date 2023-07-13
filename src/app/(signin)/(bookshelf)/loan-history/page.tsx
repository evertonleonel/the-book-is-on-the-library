import React from "react";

import LinkBackHome from "@/components/link-back-home";
import TableLoan from "../../../../components/tables/table-loan";

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
