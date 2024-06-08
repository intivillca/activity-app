/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `mime` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Attachment` table. All the data in the column will be lost.
  - Added the required column `type` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedById` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('FILE', 'IMAGE');

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "mime",
DROP COLUMN "src",
DROP COLUMN "updatedAt",
ADD COLUMN     "fileID" INTEGER,
ADD COLUMN     "imageID" INTEGER,
ADD COLUMN     "type" "AttachmentType" NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "uploadedById" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "ID" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    "uploadedById" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_imageID_fkey" FOREIGN KEY ("imageID") REFERENCES "Image"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_fileID_fkey" FOREIGN KEY ("fileID") REFERENCES "File"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
