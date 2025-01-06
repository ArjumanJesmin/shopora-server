/*
  Warnings:

  - You are about to drop the column `customerId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `wishlistId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_wishlistId_fkey";

-- DropIndex
DROP INDEX "Product_customerId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "customerId",
DROP COLUMN "orderId",
DROP COLUMN "wishlistId";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "productIds" SET DATA TYPE TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_key" ON "orders"("userId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
