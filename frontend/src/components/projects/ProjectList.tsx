import ProjectCard from "./ProjectCard";

type Project = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  status: string;
  dueDate?: string;
};

type Task = {
  _id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate?: string;
  project: {
    _id: string;
    title: string;
  };
};

type ProjectListProps = {
  projects: Project[];
  tasks: Task[];
  onTaskCreated: () => void;
  onProjectChanged: () => void;
};

function ProjectList({ projects, tasks, onTaskCreated, onProjectChanged }: ProjectListProps) {
  return (
    <div className="mt-8">
      {/* <h3 className="text-2xl font-semibold mb-4">
      My Projects
    </h3> */}

      {projects.length === 0 ? (
        <p className="text-gray-600">
          No projects yet. Create your first project.
        </p>
      ) : (
        projects.map((project) => {
          const projectTasks = tasks.filter(
            (task) => task.project._id === project._id
          );

          return (
            <ProjectCard
              key={project._id}
              project={project}
              tasks={projectTasks}
              onTaskCreated={onTaskCreated}
              onProjectChanged={onProjectChanged}
            />
          );
        })
      )}
    </div>
  );
}

export default ProjectList;