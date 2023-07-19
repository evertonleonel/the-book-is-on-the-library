/*
  Warnings:

  - You are about to drop the column `lastRentHistory` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `systemEntry` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `RentHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RentHistory" DROP CONSTRAINT "RentHistory_idBook_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "lastRentHistory",
DROP COLUMN "systemEntry",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "author" SET DATA TYPE TEXT,
ALTER COLUMN "synopsis" SET DATA TYPE TEXT,
ALTER COLUMN "genre" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "RentHistory";

-- CreateTable
CREATE TABLE "rent_histories" (
    "id" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "withdrawalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idBook" TEXT NOT NULL,

    CONSTRAINT "rent_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rent_histories" ADD CONSTRAINT "rent_histories_idBook_fkey" FOREIGN KEY ("idBook") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
