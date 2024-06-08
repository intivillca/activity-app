/*
  Warnings:

  - You are about to drop the column `imageId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checksum` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityMember" DROP CONSTRAINT "ActivityMember_activityId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityMember" DROP CONSTRAINT "ActivityMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_fileID_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_imageID_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_messageID_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_imageId_fkey";

-- DropForeignKey
ALTER TABLE "GroupUser" DROP CONSTRAINT "GroupUser_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupUser" DROP CONSTRAINT "GroupUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "checksum" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mime" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "activityId",
DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageId";

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "Image";

-- DropEnum
DROP TYPE "AttachmentType";

-- CreateIndex
CREATE INDEX "Activity_name_idx" ON "Activity"("name");

-- CreateIndex
CREATE INDEX "Activity_startDate_idx" ON "Activity"("startDate");

-- CreateIndex
CREATE INDEX "Activity_endDate_idx" ON "Activity"("endDate");

-- CreateIndex
CREATE INDEX "ActivityMember_activityId_idx" ON "ActivityMember"("activityId");

-- CreateIndex
CREATE INDEX "ActivityMember_userId_idx" ON "ActivityMember"("userId");

-- CreateIndex
CREATE INDEX "File_uploadedById_idx" ON "File"("uploadedById");

-- CreateIndex
CREATE INDEX "File_mime_idx" ON "File"("mime");

-- CreateIndex
CREATE INDEX "File_createdAt_idx" ON "File"("createdAt");

-- CreateIndex
CREATE INDEX "Group_name_idx" ON "Group"("name");

-- CreateIndex
CREATE INDEX "Group_type_idx" ON "Group"("type");

-- CreateIndex
CREATE INDEX "GroupUser_groupId_idx" ON "GroupUser"("groupId");

-- CreateIndex
CREATE INDEX "GroupUser_userId_idx" ON "GroupUser"("userId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_groupId_idx" ON "Message"("groupId");

-- CreateIndex
CREATE INDEX "Message_activityId_idx" ON "Message"("activityId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
