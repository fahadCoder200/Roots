-- DropForeignKey
ALTER TABLE "public"."Enrollment" DROP CONSTRAINT "Enrollment_gradeId_fkey";

-- AlterTable
ALTER TABLE "public"."Enrollment" ALTER COLUMN "gradeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Enrollment" ADD CONSTRAINT "Enrollment_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "public"."Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
