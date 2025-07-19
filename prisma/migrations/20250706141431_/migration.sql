/*
  Warnings:

  - Added the required column `description` to the `BusinessEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessEntity" ADD COLUMN     "description" TEXT NOT NULL;
