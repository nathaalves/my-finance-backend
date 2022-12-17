/*
  Warnings:

  - You are about to drop the column `name` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `note` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "name",
ADD COLUMN     "note" TEXT NOT NULL;
