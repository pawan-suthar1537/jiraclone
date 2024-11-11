"use client";

import { updateSprintstatus } from "@/actions/sprints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import { Router } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const SprintManager = ({ sprint, sprints, setSprint, projectId }) => {
  const [status, setstatus] = useState(sprint.status);
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();

  const router = useRouter();

  const serchparams = useSearchParams();

  const canstart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";

  const canend = status === "ACTIVE";

  const {
    fn: updatestatus,
    loading,
    error,
    data: updatedstatus,
  } = useFetch(updateSprintstatus);

  const handlestatuschange = async (newStatus) => {
    updatestatus(sprint.id, newStatus);
  };

  useEffect(() => {
    if (updatedstatus && updatedstatus.success) {
      setstatus(updatedstatus.sprint.status);
      setSprint({
        ...sprint,
        status: updatedstatus.sprint.status,
      });
    }
  }, [updatedstatus, loading]);

  useEffect(() => {
    const sprintId = serchparams.get("sprint");
    if (sprintId && sprintId !== sprint.id) {
      const selectedsprint = sprints.find((s) => s.id === sprintId);
      if (selectedsprint) {
        setSprint(selectedsprint);
        setstatus(selectedsprint.status);
      }
    }
  }, [serchparams, sprints]);

  const handlesprintselect = (value) => {
    const selectsprint = sprints.find((s) => s.id === value);
    setSprint(selectsprint);
    setstatus(selectsprint.status);
    Router.replace(`/project/${projectId}`, undefined, {
      shallow: true,
    });
  };

  const getsprintstatusText = () => {
    if (status === "COMPLETED") {
      return "Sprint Ended";
    }

    if (status === "ACTIVE" && isAfter(now, endDate)) {
      return `Overdue by ${formatDistanceToNow(endDate)}`;
    }

    if (status === "PLANNED" && isBefore(now, startDate)) {
      return `Starts in ${formatDistanceToNow(startDate)}`;
    }

    return null;
  };
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <Select value={sprint.id} onValueChange={handlesprintselect}>
          <SelectTrigger className=" bg-slate-950 self-start">
            <SelectValue placeholder="Select Sprint" />
          </SelectTrigger>
          <SelectContent>
            {sprints.map((spr) => {
              return (
                <SelectItem value={spr.id} key={spr.id}>
                  {spr.name} ({format(sprint.startDate, "MMM d,yyyy")}) to (
                  {format(sprint.endDate, "MMM d,yyyy")})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {canstart && (
          <Button
            className="bg-green-900 text-white "
            onClick={() => {
              handlestatuschange("ACTIVE");
            }}
            disabled={loading}
            // onClick={() => {
            //   setstatus("ACTIVE");
            // }}
          >
            Start Sprint
          </Button>
        )}

        {canend && (
          <Button
            onClick={() => {
              handlestatuschange("COMPLETED");
            }}
            variant="destructive"
            className="bg-red-900 text-white "
            disabled={loading}
            // onClick={() => {
            //   setstatus("COMPLETED");
            // }}
          >
            End Sprint
          </Button>
        )}
      </div>

      {loading && <BarLoader width={"100%"} className="mt-2" color="#36d7b7" />}
      {getsprintstatusText() && (
        <Badge className="mt-3 ml-1 self-start">{getsprintstatusText()}</Badge>
      )}
    </>
  );
};

export default SprintManager;
