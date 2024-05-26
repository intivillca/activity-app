/*
  Warnings:

  - You are about to drop the column `leaderId` on the `Group` table. All the data in the column will be lost.
  - Made the column `activityId` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `GroupUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_leaderId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "leaderId",
ALTER COLUMN "activityId" SET NOT NULL;

-- AlterTable
ALTER TABLE "GroupUser" ADD COLUMN     "deletedAt" TIMESTAMPTZ,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;

-- CreateTable
CREATE TABLE "ActivityMember" (
    "ID" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "ActivityMember_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityMember_userId_activityId_key" ON "ActivityMember"("userId", "activityId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityMember" ADD CONSTRAINT "ActivityMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityMember" ADD CONSTRAINT "ActivityMember_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
