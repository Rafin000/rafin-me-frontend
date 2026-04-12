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
        {project.year && <span className="project-year">{project.year}</span>}
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
          {project.github_link ? (
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
          ) : (
            <span className="project-link project-link-muted" title="Private repository">
              <i className="fa-solid fa-lock"></i>
              <span>Private Repo</span>
            </span>
          )}
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              title="Watch demo video"
            >
              <i className="fa-solid fa-video"></i>
              <span>Demo Video</span>
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
