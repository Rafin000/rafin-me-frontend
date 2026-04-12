import { Link } from 'react-router-dom';
import './index.css';
import { URLs } from '../../config';
import { isBlogSubdomain, MAIN_SITE, BLOG_SITE } from '../../utils/hostname';

function Navbar() {
  const onBlog = isBlogSubdomain();

  const homeLink = onBlog
    ? <a href={MAIN_SITE} className="nav-link">Home</a>
    : <Link to="/" className="nav-link">Home</Link>;

  const projectsLink = onBlog
    ? <a href={`${MAIN_SITE}/projects`} className="nav-link">Projects</a>
    : <Link to="/projects" className="nav-link">Projects</Link>;

  const blogLink = onBlog
    ? <Link to="/" className="nav-link">Blog</Link>
    : <a href={BLOG_SITE} className="nav-link">Blog</a>;

  const contactLink = onBlog
    ? <a href={`${MAIN_SITE}/contact`} className="nav-link">Contact</a>
    : <Link to="/contact" className="nav-link">Contact</Link>;

  const logoLink = onBlog
    ? <a href={MAIN_SITE}><img src={URLs.logo} alt="Logo" /></a>
    : <Link to="/"><img src={URLs.logo} alt="Logo" /></Link>;

  return (
    <nav className="navbar">
      <div className="navbar-logo">{logoLink}</div>
      <ul className="nav-list">
        <li className="nav-item">{homeLink}</li>
        <li className="nav-item">{projectsLink}</li>
        <li className="nav-item">{blogLink}</li>
        <li className="nav-item">{contactLink}</li>
      </ul>
    </nav>
  );
}

export default Navbar;
