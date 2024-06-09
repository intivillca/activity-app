-- CreateTable
CREATE TABLE "Invite" (
    "ID" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    "groupId" INTEGER,
    "activityID" INTEGER,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_activityID_fkey" FOREIGN KEY ("activityID") REFERENCES "Activity"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
