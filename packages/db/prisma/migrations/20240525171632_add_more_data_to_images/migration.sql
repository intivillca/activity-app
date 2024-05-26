/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "imgUrl",
ADD COLUMN     "imageId" INTEGER;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "imgUrl",
ADD COLUMN     "imageId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgUrl",
ADD COLUMN     "imageId" INTEGER;

-- CreateTable
CREATE TABLE "Image" (
    "ID" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "imgAlt" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
