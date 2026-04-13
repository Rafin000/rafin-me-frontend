import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './index.css';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="project-card-link">
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
        </div>
      </div>
    </Link>
  );
};

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <h1 className="projects-heading">Projects</h1>
      {projects.length === 0 ? (
        <p className="projects-empty">No projects yet.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
