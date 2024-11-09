"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createSprint(projectId, data) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project || project.organizationId !== orgId) {
    throw new Error("Project not found ");
  }

  const sprint = await db.sprint.create({
    data: {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "PLANNED",
      projectId,
    },
  });

  return sprint;
}

export async function updateSprintstatus(sprintId, newstatus) {
  const { userId, orgId, orgRole } = auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  try {
    const sprint = await db.sprint.findUnique({
      where: {
        id: sprintId,
      },
      include: {
        project: true,
      },
    });

    if (!sprint) {
      throw new Error("Sprint not found");
    }

    if (sprint.project.organizationId !== orgId) {
      throw new Error("Sprint not found");
    }

    if (orgRole !== "org:admin") {
      throw new Error("Only Admin can make this changes");
    }

    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);

    if (newstatus === "ACTIVE" && (now < startDate || now > endDate)) {
      throw new Error("Cannot start Sprint outside of the planned dates");
    }

    if (newstatus === "COMPLETED" && sprint.status !== "ACTIVE") {
      throw new Error("Can only complete an active sprint");
    }

    const updatesprint = await db.sprint.update({
      where: {
        id: sprintId,
      },
      data: {
        status: newstatus,
      },
    });

    return { success: true, sprint: updatesprint };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
