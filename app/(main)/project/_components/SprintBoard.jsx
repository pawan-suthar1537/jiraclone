"use client";

import React, { useState } from "react";
import SprintManager from "./SprintManager";

const SprintBoard = ({ sprints, projectId, orgId }) => {
  const [currSprint, setcurrSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );
  return (
    <div>
      {/* spring manager */}
      <SprintManager
        sprint={currSprint}
        setSprint={setcurrSprint}
        sprints={sprints}
        projectId={projectId}
      />
      {/* kanban board */}
    </div>
  );
};

export default SprintBoard;
