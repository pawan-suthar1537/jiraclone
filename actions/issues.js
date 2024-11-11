"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createIssue(projectId, data) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  let user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  const lastissue = await db.issue.findFirst({
    where: {
      projectId: projectId,

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
      assigneeId: data.assigneeId,
    },
    include: {
      reporter: true,
      assignee: true,
    },
  });

  return issue;
}

export async function getIssueforsprint(sprintId) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const issues = await db.issue.findMany({
    where: {
      sprintId: sprintId,
    },
    orderBy: [{ status: "asc" }, { order: "asc" }],
    include: {
      reporter: true,
      assignee: true,
    },
  });

  return issues;
}

export async function updateIssueOrder(updateIssues) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  await db.$transaction(async (prisma) => {
    for (const issue of updateIssues) {
      await prisma.issue.update({
        where: {
          id: issue.id,
        },
        data: {
          order: issue.order,
          status: issue.status,
        },
      });
    }
  });

  return {
    success: true,
  };
}

export async function deleteissue(issueId) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const issue = await db.issue.findUnique({
    where: {
      id: issueId,
    },
    include: {
      project: true,
    },
  });

  if (!issue) {
    throw new Error("Issue not found");
  }

  if (issue.reporterId !== user.id && issue.project.adminIds.include(user.id)) {
    throw new Error("You are not allowed to delete this issue");
  }

  await db.issue.delete({
    where: {
      id: issueId,
    },
  });

  return {
    success: true,
  };
}

export async function updateissue(issueId, data) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  try {
    const issue = await db.issue.findUnique({
      where: {
        id: issueId,
      },
      include: {
        project: true,
      },
    });

    if (!issue) {
      throw new Error("Issue not found");
    }

    if (issue.project.organizationId !== orgId) {
      throw new Error("Unauthorized");
    }

    const updateissues = await db.issue.update({
      where: {
        id: issueId,
      },
      data: {
        status: data.status,
        priority: data.priority,
      },
      include: {
        reporter: true,
        assignee: true,
      },
    });

    return updateissues;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getUsersIssues(userId) {
  const { orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const issues = await db.issue.findMany({
    where: {
      OR: [{ reporterId: user.id }, { assigneeId: user.id }],
      project: {
        organizationId: orgId,
      },
    },

    include: {
      project: true,
      reporter: true,
      assignee: true,
    },
    orderBy: {
      UpdatedAt: "desc",
    },
  });

  return issues;
}
