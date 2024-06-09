/*
  Warnings:

  - Made the column `activityID` on table `Invite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_activityID_fkey";

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "activityID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_activityID_fkey" FOREIGN KEY ("activityID") REFERENCES "Activity"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
