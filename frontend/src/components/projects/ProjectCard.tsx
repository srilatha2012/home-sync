import CreateTaskForm from "../tasks/CreateTaskForm";

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
};

type ProjectCardProps = {
  project: Project;
  tasks: Task[];
  onTaskCreated: () => void;
};

function ProjectCard({ project, tasks, onTaskCreated }: ProjectCardProps) {
  return (
    <div>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <p>Category: {project.category}</p>
      <p>Status: {project.status}</p>

      {project.dueDate && (
        <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
      )}

      <CreateTaskForm
        projectId={project._id}
        onTaskCreated={onTaskCreated}
      />

      <h5>Tasks</h5>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <p>{task.title}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectCard;