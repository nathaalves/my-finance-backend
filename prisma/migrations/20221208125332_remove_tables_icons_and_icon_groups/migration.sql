/*
  Warnings:

  - You are about to drop the column `iconId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the `icon_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `icons` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_iconId_fkey";

-- DropForeignKey
ALTER TABLE "icons" DROP CONSTRAINT "icons_iconGroupId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "iconId",
ADD COLUMN     "icon" TEXT NOT NULL;

-- DropTable
DROP TABLE "icon_groups";

-- DropTable
DROP TABLE "icons";
