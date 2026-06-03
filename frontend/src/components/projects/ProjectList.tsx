type Project = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  status: string;
  dueDate?: string;
};

type ProjectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div>
      <h3>My Projects</h3>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map((project) => (
          <div key={project._id}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <p>Category: {project.category}</p>
            <p>Status: {project.status}</p>
            {project.dueDate && (
              <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectList;