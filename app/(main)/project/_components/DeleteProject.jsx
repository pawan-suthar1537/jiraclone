"use client";

import { deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useOrganization } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const DeleteProject = ({ projectId }) => {
  const { membership } = useOrganization();
  const router = useRouter();

  const {
    data: deleted,
    loading: isdeleting,
    error,
    fn: deleteprojectfn,
  } = useFetch(deleteProject);

  const handledelete = () => {
    if (window.confirm("sachi me delete krna hai kya?")) {
      deleteprojectfn(projectId);
    }
  };

  useEffect(() => {
    if (deleted?.success) {
      toast.error("Project Deleted");
      router.refresh();
    }
  }, [deleted]);

  const isadmin = membership?.role === "org:admin";

  if (!isadmin) return null;
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={`${isdeleting ? "animate-pulse" : ""}`}
        onClick={handledelete}
        disabled={isdeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
};

export default DeleteProject;
