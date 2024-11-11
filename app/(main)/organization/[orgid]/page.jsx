import { getOrganization } from "@/actions/organizations";
import OrgSwitcher from "@/components/OrgSwitcher";

import React from "react";
import ProjectsList from "../../project/_components/ProjectsList";
import UsersIssues from "./_components/user-issues";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Organization = async ({ params }) => {
  const { orgid } = await params;
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const organization = await getOrganization(orgid);

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name}&lsquo;s Projects
        </h1>
        <OrgSwitcher />
      </div>
      <div className="mb-4">
        <ProjectsList orgId={organization.id} />
      </div>
      <div className="mt-8">
        <UsersIssues userId={userId} />
      </div>
    </div>
  );
};

export default Organization;
