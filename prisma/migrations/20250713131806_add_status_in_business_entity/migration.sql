/*
  Warnings:

  - Added the required column `status` to the `BusinessEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessEntity" ADD COLUMN     "status" TEXT NOT NULL;
