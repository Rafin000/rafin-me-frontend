import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './index.css';

const VIDEO_RE = /\.(mp4|webm)(\?.*)?$/i;

const ProjectCard = ({ project }) => {
  const [playing, setPlaying] = useState(false);
  const hasVideo = project.live_link && VIDEO_RE.test(project.live_link);

  const handlePlayClick = (e) => {
    e.preventDefault();  // stop the <Link> from navigating
    e.stopPropagation();
    setPlaying(true);
  };

  return (
    <Link to={`/projects/${project.id}`} className="project-card-link">
      <div className="project-card">
        {/* Thumbnail / Video area */}
        {playing && hasVideo ? (
          <div className="project-video-player" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <video autoPlay controls width="100%">
              <source
                src={project.live_link}
                type={project.live_link.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
              />
            </video>
          </div>
        ) : project.thumbnail_url ? (
          <div
            className={`project-thumbnail ${hasVideo ? 'project-thumbnail-playable' : ''}`}
            onClick={hasVideo ? handlePlayClick : undefined}
          >
            <img src={project.thumbnail_url} alt={project.title} />
            {hasVideo && (
              <div className="play-overlay">
                <i className="fa-solid fa-play"></i>
              </div>
            )}
          </div>
        ) : hasVideo ? (
          <div
            className="project-thumbnail project-thumbnail-playable project-thumbnail-no-img"
            onClick={handlePlayClick}
          >
            <div className="play-overlay">
              <i className="fa-solid fa-play"></i>
            </div>
          </div>
        ) : null}

        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          {project.year && <span className="project-year">{project.year}</span>}
          {project.contributions && project.contributions.length > 0 && (
            <ul className="project-contributions">
              {project.contributions.slice(0, 3).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
              {project.contributions.length > 3 && (
                <li className="more-indicator">+{project.contributions.length - 3} more...</li>
              )}
            </ul>
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
              <span className="project-link">
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </span>
            )}
            {project.live_link && (
              <span className="project-link">
                <i className="fa-solid fa-video"></i>
                <span>Demo Video</span>
              </span>
            )}
          </div>
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
