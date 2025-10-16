/*
  Warnings:

  - You are about to drop the column `grade` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `Grade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "grade",
DROP COLUMN "percentage",
ADD COLUMN     "maxMarks" TEXT;
