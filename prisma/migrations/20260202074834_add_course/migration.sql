-- AlterTable
ALTER TABLE "User" ADD COLUMN     "courseId" INTEGER;

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
