import React from "react";

import { Metadata } from "next";
import LinkBackHome from "@/components/link-back-home";
import { CreateBookForm } from "@/components/forms/create-book-form";

export const metadata: Metadata = {
  title: "Library - Create Book",
};

const CreateNewBookPage = () => {
  return (
    <>
      <LinkBackHome>Cadastrar livro</LinkBackHome>
      <div className="flex-1 flex p-2">
        <CreateBookForm />
      </div>
    </>
  );
};

export default CreateNewBookPage;
