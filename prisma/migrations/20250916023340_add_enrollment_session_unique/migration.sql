/*
  Warnings:

  - A unique constraint covering the columns `[enrollmentId,session]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Grade_enrollmentId_session_key" ON "public"."Grade"("enrollmentId", "session");
