import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createIssue(data, projectId) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  let user = await db.user.findUnique({
    where: {
      clerkUserid: userId,
    },
  });

  const lastissue = await db.issue.findFirst({
    where: {
      projectId,
      status: data.status,
    },
    orderBy: {
      order: "desc",
    },
  });

  const newOrder = lastissue ? lastissue.order + 1 : 0;

  const issue = await db.issue.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      order: newOrder,
      priority: data.priority,
      projectId: projectId,
      sprintId: data.sprintId,
      reporterId: user.id,
      assigneeId: data.assigneeId || null,
    },
    include: {
      reporter: true,
      assignee: true,
    },
  });

  return issue;
}
