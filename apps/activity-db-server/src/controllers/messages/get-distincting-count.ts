import { db } from "@activityapp/db";

export const getDistinctCount = async (userID: number) => {
  const result = (await db.$queryRaw`
  WITH recent_messages AS (
    SELECT DISTINCT ON (COALESCE(m."activityId", m."groupId"))
           m."ID",
           m."activityId",
           m."groupId",
           m."createdAt"
    FROM "Message" m
    LEFT JOIN "GroupUser" gu ON gu."groupId" = m."groupId"
    LEFT JOIN "ActivityMember" am ON am."activityId" = m."activityId"
    WHERE m."deletedAt" IS NULL
      AND (
        gu."userId" = ${userID} OR
        am."userId" = ${userID}
      )
    ORDER BY COALESCE(m."activityId", m."groupId"), m."createdAt" DESC
  )
  SELECT COUNT(*)
  FROM recent_messages;
`) as { count: BigInt }[];
  if (result && result[0]?.count) {
    return result[0].count;
  }
  return 0n as BigInt;
};
