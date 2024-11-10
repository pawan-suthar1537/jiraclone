import UserAvatar from "@/components/iuser-avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";

const colorpriority = {
  LOW: "border-green-500",
  MEDIUM: "border-yellow-500",
  HIGH: "border-red-500",
  URGENT: "border-orange-500",
};

const IssueCard = ({
  issue,
  showstatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  const [opendialog, setopendialog] = useState(false);
  const created = formatDistanceToNow(new Date(issue?.CreatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader
          className={`border-t-2 ${colorpriority[issue.priority]} rounded-lg`}
        >
          <CardTitle>{issue.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 -mt-3">
          {showstatus && <Badge>{issue.status}</Badge>}
          <Badge variant="outline" className="-ml-1">
            {issue.priority}
          </Badge>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-3">
          <UserAvatar user={issue.assignee} />
          <div className="text-xs text-gray-400 w-full">Created {created}</div>
        </CardFooter>
      </Card>
      {opendialog && <></>}
    </>
  );
};

export default IssueCard;