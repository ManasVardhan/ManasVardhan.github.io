import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECTS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            className="rounded-lg border border-edge"
          />
        ))}
      </div>
    </Panel>
  );
}
