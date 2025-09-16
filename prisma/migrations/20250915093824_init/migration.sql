/*
  Warnings:

  - You are about to drop the column `studentId` on the `Grade` table. All the data in the column will be lost.
  - Added the required column `gradeId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Grade" DROP CONSTRAINT "Grade_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."Enrollment" ADD COLUMN     "gradeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Grade" DROP COLUMN "studentId";

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "public"."Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
