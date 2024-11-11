import { getUsersIssues } from "@/actions/issues";
import IssueCard from "@/app/(main)/project/_components/IssueCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Suspense } from "react";

const UsersIssues = async ({ userId }) => {
  const issues = await getUsersIssues(userId);

  if (issues.legth === 0) {
    return null;
  }

  const assignedissues = issues.filter(
    (issue) => issue.assignee.clerkUserId === userId
  );
  const reportedissues = issues.filter(
    (issue) => issue.reporter.clerkUserId === userId
  );

  return (
    <>
      <h1 className="text-4xl font-bold gradient-title mb-4">My Issues</h1>
      <Tabs defaultValue="assigned" className="w-full">
        <TabsList>
          <TabsTrigger value="assigned">Assigned to you</TabsTrigger>
          <TabsTrigger value="reported">Reported by you</TabsTrigger>
        </TabsList>
        <TabsContent value="assigned">
          <Suspense fallback={<div>Loading...</div>}>
            <IssueGrid issues={assignedissues} />
          </Suspense>
        </TabsContent>
        <TabsContent value="reported">
          <Suspense fallback={<div>Loading...</div>}>
            <IssueGrid issues={reportedissues} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
};

function IssueGrid({ issues }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}

export default UsersIssues;
