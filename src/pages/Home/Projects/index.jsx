/* eslint-disable react/prop-types */
import './index.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {project.thumbnail_url && (
        <div className="project-thumbnail">
          <img src={project.thumbnail_url} alt={project.title} />
        </div>
      )}
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="project-tech-stack">
            {project.tech_stack.map((tech, index) => (
              <span key={index} className="tech-pill">{tech}</span>
            ))}
          </div>
        )}
        <div className="project-links">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              title="View on GitHub"
            >
              <i className="fa-brands fa-github"></i>
              <span>GitHub</span>
            </a>
          )}
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              title="View Live Demo"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="projects-section">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
