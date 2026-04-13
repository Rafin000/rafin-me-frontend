import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import MarkdownPreview from '@uiw/react-markdown-preview';
import ScrollToTop from '../../../components/ScrollToTop';
import './index.css';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error('Error fetching project:', err));
  }, [projectId]);

  if (!project) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Link to="/projects" className="back-link">
        <i className="fa-solid fa-arrow-left"></i> Back to Projects
      </Link>

      <h1 className="project-detail-title">{project.title}</h1>
      {project.year && <span className="project-detail-year">{project.year}</span>}

      <div className="project-detail-links">
        {project.github_link && (
          <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="detail-link">
            <i className="fa-brands fa-github"></i> View on GitHub
          </a>
        )}
        {project.live_link && (
          <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="detail-link">
            <i className="fa-solid fa-video"></i> Demo Video
          </a>
        )}
      </div>

      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="project-detail-tech">
          {project.tech_stack.map((tech, index) => (
            <span key={index} className="tech-pill">{tech}</span>
          ))}
        </div>
      )}

      {project.contributions && project.contributions.length > 0 && (
        <div className="project-detail-contributions">
          <h3>Key Contributions</h3>
          <ul>
            {project.contributions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {project.description && (
        <div className="project-detail-description">
          <MarkdownPreview
            className="markdown-preview"
            source={project.description}
            wrapperElement={{ 'data-color-mode': 'dark' }}
          />
        </div>
      )}

      <ScrollToTop />
    </div>
  );
};

export default ProjectDetail;
