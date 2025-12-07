/*
  Warnings:

  - The values [ACTIVE,INACTIVE] on the enum `CourseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseStatus_new" AS ENUM ('ACTIVO', 'INACTIVO');
ALTER TABLE "public"."courses" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "courses" ALTER COLUMN "status" TYPE "CourseStatus_new" USING ("status"::text::"CourseStatus_new");
ALTER TYPE "CourseStatus" RENAME TO "CourseStatus_old";
ALTER TYPE "CourseStatus_new" RENAME TO "CourseStatus";
DROP TYPE "public"."CourseStatus_old";
ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'INACTIVO';
COMMIT;

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'INACTIVO';
