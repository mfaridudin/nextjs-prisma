/*
  Warnings:

  - You are about to drop the `classroom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "classroom" DROP CONSTRAINT "classroom_schoolId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "classroomId" INTEGER;

-- DropTable
DROP TABLE "classroom";

-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_teacherId_key" ON "Classroom"("teacherId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
