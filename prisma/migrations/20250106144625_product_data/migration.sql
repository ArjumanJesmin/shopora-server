/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerId_fkey";

-- DropIndex
DROP INDEX "Product_sellerId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sellerId";
