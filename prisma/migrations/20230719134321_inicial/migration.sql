-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "synopsis" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255) NOT NULL,
    "systemEntry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "description" VARCHAR(255) NOT NULL,
    "image" TEXT,
    "lastRentHistory" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentHistory" (
    "id" TEXT NOT NULL,
    "studentName" VARCHAR(255) NOT NULL,
    "className" VARCHAR(255) NOT NULL,
    "withdrawalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idBook" TEXT NOT NULL,

    CONSTRAINT "RentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RentHistory_idBook_key" ON "RentHistory"("idBook");

-- AddForeignKey
ALTER TABLE "RentHistory" ADD CONSTRAINT "RentHistory_idBook_fkey" FOREIGN KEY ("idBook") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
