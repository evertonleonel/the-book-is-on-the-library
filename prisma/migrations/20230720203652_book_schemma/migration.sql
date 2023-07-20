-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rent_histories" (
    "id" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "class_name" TEXT NOT NULL,
    "withdrawal_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_Date" TIMESTAMP(3) NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "rent_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rent_histories" ADD CONSTRAINT "rent_histories_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
