/*
  Warnings:

  - You are about to drop the column `gradeId` on the `Enrollment` table. All the data in the column will be lost.
  - Added the required column `enrollmentId` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Enrollment" DROP CONSTRAINT "Enrollment_gradeId_fkey";

-- AlterTable
ALTER TABLE "public"."Enrollment" DROP COLUMN "gradeId";

-- AlterTable
ALTER TABLE "public"."Grade" ADD COLUMN     "enrollmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "public"."Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
