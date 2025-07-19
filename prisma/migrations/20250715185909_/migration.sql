/*
  Warnings:

  - You are about to drop the column `code` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `ServiceCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ServiceCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ServiceCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "code",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceCategory" DROP COLUMN "code",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
