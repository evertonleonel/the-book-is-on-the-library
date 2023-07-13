import Container from "@/components/container/container";
import LinkBackHome from "@/components/link-back-home";
import React from "react";
import TableLoan from "./table";

const LoanPage = () => {
  return (
    <Container>
      <LinkBackHome>Empréstimos</LinkBackHome>
      <section className="flex-1 overflow-hidden ">
        <TableLoan />
      </section>
    </Container>
  );
};

export default LoanPage;
