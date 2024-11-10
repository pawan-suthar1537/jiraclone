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
import { toast } from "sonner";

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

  const onDragEnd = async (result) => {
    if (currSprint.status === "PLANNED") {
      toast.warning("start the sprint to update board");
      return;
    }
    if (currSprint.status === "COMPLETED") {
      toast.warning("cannot update board after sprint end");
      return;
    }
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newData = [...issues];

    const sourcelist = newData.filter((li) => li.status === source.droppableId);

    const destlist = newData.filter(
      (li) => li.status === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const reorderedcards = reorder(
        sourcelist,
        source.index,
        destination.index
      );

      reorderedcards.forEach((card, index) => {
        card.order = index;
      });
    } else {
      const [movedcard] = sourcelist.splice(source.index, 1);
      movedcard.status = destination.droppableId;
      destlist.splice(destination.index, 0, movedcard);

      sourcelist.forEach((card, index) => {
        card.order = index;
      });
      destlist.forEach((card, index) => {
        card.order = index;
      });
    }

    const sortedissues = newData.sort((a, b) => a.order - b.order);
    setissues(newData, sortedissues);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

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
