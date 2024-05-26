/*
  Warnings:

  - You are about to drop the column `attachments` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "attachments";

-- CreateTable
CREATE TABLE "Attachment" (
    "ID" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    "src" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "messageID" INTEGER,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_messageID_fkey" FOREIGN KEY ("messageID") REFERENCES "Message"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
