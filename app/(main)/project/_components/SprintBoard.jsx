"use client";

import React, { useEffect, useState } from "react";
import SprintManager from "./SprintManager";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import statuses from "../../../../data/status.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import IssueCreateDrawer from "./create-issue";
import useFetch from "@/hooks/use-fetch";
import { getIssueforsprint } from "@/actions/issues";
import { BarLoader } from "react-spinners";
import IssueCard from "./IssueCard";

const SprintBoard = ({ sprints, projectId, orgId }) => {
  const [currSprint, setcurrSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );

  const [isdraweropen, setisdraweropen] = useState(false);
  const [selectedstatus, setselectedstatus] = useState(null);

  const handleAdIssue = (status) => {
    setselectedstatus(status);
    setisdraweropen(true);
  };

  const {
    loading: issuesloading,
    data: issues,
    error: issueserror,
    fn: getissuesfn,
    setData: setissues,
  } = useFetch(getIssueforsprint);

  const [filteredissue, setfilteredissue] = useState(issues);

  console.log("issuesissuesissuesissuesissues", issues);

  useEffect(() => {
    if (currSprint.id) {
      getissuesfn(currSprint.id);
    }
  }, [currSprint.id]);

  const handleIsseCreated = () => {
    getissuesfn(currSprint.id);
  };

  const onDragEnd = () => {};

  if (issueserror) return <div>Error Loading Issues</div>;
  return (
    <div>
      {/* spring manager */}
      <SprintManager
        sprint={currSprint}
        setSprint={setcurrSprint}
        sprints={sprints}
        projectId={projectId}
      />

      {issuesloading && <BarLoader width={"100%"} color="#36d7b7" />}
      {/* kanban board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-slate-900 p-4 rounded-lg">
          {statuses.map((col) => (
            <Droppable key={col.key} droppableId={col.key}>
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    <h3 className="font-semibold mb-2 text-center">
                      {col.name}
                    </h3>

                    {/* issues render */}

                    {issues
                      ?.filter((issue) => issue.status === col.key)
                      .map((issue, i) => (
                        <Draggable
                          key={issue.id}
                          draggableId={issue.id}
                          index={i}
                        >
                          {(provided) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <IssueCard issue={issue} />
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                    {col.key === "TODO" &&
                      currSprint.status !== "COMPLETED" && (
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => handleAdIssue(col.key)}
                        >
                          {" "}
                          <Plus className="mr-2 h-4 w-4" /> Create Issue
                        </Button>
                      )}
                  </div>
                );
              }}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <IssueCreateDrawer
        isopen={isdraweropen}
        onclose={() => setisdraweropen(false)}
        sprintId={currSprint.id}
        status={selectedstatus}
        projectId={projectId}
        orgId={orgId}
        onIssueCreated={handleIsseCreated}
      />
    </div>
  );
};

export default SprintBoard;
