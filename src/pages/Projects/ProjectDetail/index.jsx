import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import MarkdownPreview from '@uiw/react-markdown-preview';
import ScrollToTop from '../../../components/ScrollToTop';
import './index.css';

const VIDEO_RE = /\.(mp4|webm)(\?.*)?$/i;

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [playing, setPlaying] = useState(false);

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

  const hasVideo = project.live_link && VIDEO_RE.test(project.live_link);

  return (
    <div className="project-detail">
      <Link to="/projects" className="back-link">
        <i className="fa-solid fa-arrow-left"></i> Back to Projects
      </Link>

      {/* Thumbnail → click to play video */}
      {playing && hasVideo ? (
        <div className="project-detail-video">
          <video autoPlay controls width="100%">
            <source
              src={project.live_link}
              type={project.live_link.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : project.thumbnail_url ? (
        <div
          className={`project-detail-thumbnail ${hasVideo ? 'project-detail-thumbnail-playable' : ''}`}
          onClick={hasVideo ? () => setPlaying(true) : undefined}
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
          className="project-detail-thumbnail project-detail-thumbnail-playable project-detail-no-thumb"
          onClick={() => setPlaying(true)}
        >
          <div className="play-overlay play-overlay-visible">
            <i className="fa-solid fa-play"></i>
          </div>
        </div>
      ) : null}

      <h1 className="project-detail-title">{project.title}</h1>
      {project.year && <span className="project-detail-year">{project.year}</span>}

      {project.description && (
        <div className="project-detail-description">
          <MarkdownPreview
            className="markdown-preview"
            source={project.description}
            wrapperElement={{ 'data-color-mode': 'dark' }}
          />
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

      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="project-detail-tech">
          {project.tech_stack.map((tech, index) => (
            <span key={index} className="tech-pill">{tech}</span>
          ))}
        </div>
      )}

      <div className="project-detail-links">
        {project.github_link && (
          <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="detail-link">
            <i className="fa-brands fa-github"></i> View on GitHub
          </a>
        )}
        {project.live_link && !hasVideo && (
          <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="detail-link">
            <i className="fa-solid fa-video"></i> Demo Video
          </a>
        )}
      </div>

      <ScrollToTop />
    </div>
  );
};

export default ProjectDetail;
