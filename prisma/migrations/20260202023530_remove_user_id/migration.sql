/*
  Warnings:

  - You are about to drop the column `userId` on the `classroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "classroom" DROP CONSTRAINT "classroom_userId_fkey";

-- AlterTable
ALTER TABLE "classroom" DROP COLUMN "userId";
