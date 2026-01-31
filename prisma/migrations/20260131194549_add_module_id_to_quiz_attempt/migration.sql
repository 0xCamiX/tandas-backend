/*
  Warnings:

  - Added the required column `moduleId` to the `quiz_attempts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz_attempts" ADD COLUMN     "moduleId" TEXT;

-- Backfill moduleId from quiz relationship
UPDATE "quiz_attempts" AS qa
SET "moduleId" = q."moduleId"
FROM "quizzes" AS q
WHERE qa."quizId" = q."id";

-- Enforce required moduleId after backfill
ALTER TABLE "quiz_attempts" ALTER COLUMN "moduleId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "quiz_attempts_moduleId_idx" ON "quiz_attempts"("moduleId");

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
