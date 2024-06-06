-- AlterTable
ALTER TABLE "ActivityMember" ADD COLUMN     "groupRole" "GroupRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "GroupUser" ALTER COLUMN "groupRole" SET DEFAULT 'MEMBER';
