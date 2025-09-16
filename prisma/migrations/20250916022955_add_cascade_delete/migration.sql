-- DropForeignKey
ALTER TABLE "public"."Grade" DROP CONSTRAINT "Grade_enrollmentId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "public"."Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
