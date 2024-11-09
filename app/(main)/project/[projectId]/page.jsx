import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";

import React from "react";
import SprintCreationForm from "../_components/SprintCreationForm";
import SprintBoard from "../_components/SprintBoard";

const ProjectPage = async ({ params }) => {
  const { projectId } = params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }
  return (
    <div className="mx-auto container">
      {/* sprint creation */}
      <SprintCreationForm
        projectId={project.id}
        projectitle={project.name}
        projectkey={project.key}
        sprintkey={project.sprints?.length + 1}
      />
      {/* sprintboard */}
      {project.sprints.length > 0 ? (
        <SprintBoard
          sprints={project.sprints}
          projectId={projectId}
          orgId={project.organizationId}
        />
      ) : (
        <div>Create Sprint from Button</div>
      )}
    </div>
  );
};

export default ProjectPage;
