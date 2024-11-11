import { deleteissue, updateissue } from "@/actions/issues";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useOrganization, useUser } from "@clerk/nextjs";
import { ExternalLink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import statuses from "../../../../data/status.json";
import MDEditor from "@uiw/react-md-editor";
import UserAvatar from "@/components/iuser-avatar";

const priorityoptions = ["LOW", "MEDIUM", "HIGH", "URGENT"];

const IssuedetailsDilaog = ({
  issue,
  onClose,
  onUpdate = () => {},
  onDelete = () => {},
  isOpen,
  bordercol = "",
}) => {
  const pathname = usePathname();
  const [status, setstatus] = useState(issue.status);
  const [priority, setpriority] = useState(issue.priority);

  const handlestatuschange = async (newstatus) => {
    setstatus(newstatus);
    await updatefn(issue.id, { status: newstatus, priority });
    window.location.reload(); // Reload the page after deletion
  };
  const handleprioritychange = async (newpriority) => {
    setpriority(newpriority);
    await updatefn(issue.id, { status, priority: newpriority });
    window.location.reload(); // Reload the page after deletion
  };

  const handledelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      deletefn(issue.id);
    }
  };

  const { user } = useUser();
  const { membership } = useOrganization();
  const isprojectpage = pathname.includes("/project/");
  const router = useRouter();

  const {
    loading: updateloading,
    fn: updatefn,
    error: updateerror,
    data: updated,
  } = useFetch(updateissue);
  const {
    loading: deleteloading,
    fn: deletefn,
    error: deleteerror,
    data: deleted,
  } = useFetch(deleteissue);

  const canchange =
    user.id === issue.reporter.clerkUserId || membership.role === "org:admin";

  const handleGotoproject = () => {
    router.push(`/project/${issue.projectId}?sprint=${issue.sprintId}`);
  };
  useEffect(() => {
    if (deleted) {
      onClose();
      onDelete();
    }
    if (updated) {
      onUpdate(updated);
    }
  }, [deleted, updated, deleteloading, updateloading]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-3xl">{issue.title}</DialogTitle>
            {!isprojectpage && (
              <Button
                variant="ghost"
                size="icon"
                title="View in project"
                onClick={handleGotoproject}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </DialogHeader>
        {(updateloading || deleteloading) && (
          <BarLoader width={"100%"} color="#36d7b7" />
        )}

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Select value={status} onValueChange={handlestatuschange}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={priority}
              onValueChange={handleprioritychange}
              disabled={!canchange}
            >
              <SelectTrigger className={`border ${bordercol} rounded`}>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorityoptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <MDEditor.Markdown
              className="rounded px-2 py-1"
              source={issue.description ? issue.description : "--"}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">Assignee</h4>
              <UserAvatar user={issue.assignee} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">Reporter</h4>
              <UserAvatar user={issue.reporter} />
            </div>
          </div>
          {canchange && (
            <Button
              variant="destructive"
              onCick={handledelete}
              disabled={deleteloading}
            >
              {deleteloading ? "Deleting..." : "Delete Issue"}
            </Button>
          )}
          {(deleteerror || updateerror) && (
            <p className="text-red-500">
              {deleteerror.message || updateerror.message}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssuedetailsDilaog;
