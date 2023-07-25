import React from "react";

import { Metadata } from "next";

import LinkBackHome from "@/components/link-back-home";
import { CreateBookForm } from "@/components/forms/create-book-form";

export const metadata: Metadata = {
  title: "Library - Edit Book",
};

const EditBookPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <LinkBackHome>Editar livro</LinkBackHome>
      <div className="flex-1 flex p-2">
        <CreateBookForm params={params.slug} />
      </div>
    </>
  );
};

export default EditBookPage;
