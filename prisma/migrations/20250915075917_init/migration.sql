-- CreateTable
CREATE TABLE "public"."Grade" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
