import React from "react";
import LinkBackHome from "@/components/link-back-home";
import Container from "@/components/container/container";
import { CreateBookForm } from "@/components/forms/create-book-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library - Create Book",
};

const CreateNewBookPage = () => {
  return (
    <Container>
      <LinkBackHome>Cadastrar livro</LinkBackHome>
      <CreateBookForm />
    </Container>
  );
};

export default CreateNewBookPage;
