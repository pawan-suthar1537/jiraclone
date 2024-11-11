"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug) {
  const { userId } = await auth();

  if (!userId) {
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

  const org = await clerkClient().organizations.getOrganization({
    slug,
  });

  if (!org) {
    return null;
  }

  const { data: membership } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: org.id,
    });

  const usermembership = membership.find(
    (member) => member.publicUserData.userId === userId
  );

  if (!usermembership) {
    return null;
  }

  return org;
}

export async function getOrganizationusers(orgId) {
  const { userId } = auth();

  if (!userId) {
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

  const organizationmemberships =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userIds = organizationmemberships.data.map(
    (membership) => membership.publicUserData.userId
  );

  const users = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds,
      },
    },
  });

  return users;
}
