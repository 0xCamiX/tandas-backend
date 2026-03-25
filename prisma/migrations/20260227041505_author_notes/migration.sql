/*
  Warnings:

  - Added the required column `moduleId` to the `quiz_attempts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz_attempts" ADD COLUMN     "moduleId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "quiz_attempts_moduleId_idx" ON "quiz_attempts"("moduleId");

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
