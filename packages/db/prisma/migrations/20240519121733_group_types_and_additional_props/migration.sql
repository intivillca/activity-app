/*
  Warnings:

  - Added the required column `location` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('PUBLIC', 'PRIVATE', 'LOCKED');

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "endDate" TIMESTAMPTZ,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMPTZ,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "type" "GroupType" NOT NULL DEFAULT 'PUBLIC';
