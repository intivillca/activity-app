/*
  Warnings:

  - You are about to drop the column `tripId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupRole` to the `GroupUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('MEMBER', 'MODERATOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_tripId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "tripId",
ADD COLUMN     "activityId" INTEGER;

-- AlterTable
ALTER TABLE "GroupUser" ADD COLUMN     "groupRole" "GroupRole" NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "tripId",
ADD COLUMN     "activityId" INTEGER;

-- DropTable
DROP TABLE "Trip";

-- CreateTable
CREATE TABLE "Activity" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
