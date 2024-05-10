/*
  Warnings:

  - Added the required column `location` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "endDate" TIMESTAMPTZ,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMPTZ,
ADD COLUMN     "tags" TEXT[];
