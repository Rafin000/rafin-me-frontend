import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import './index.css';
import { URLs } from '../../config';

// Smooth-scroll with an offset so the sticky nav doesn't cover the heading.
const scrollWithOffset = (el) => {
  const navEl = document.querySelector('.navbar');
  const navHeight = navEl ? navEl.offsetHeight : 80;
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top: yCoordinate - navHeight - 12, behavior: 'smooth' });
};

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={URLs.logo} alt="Logo" />
        </Link>
      </div>

      <ul className="nav-list nav-list-center">
        <li className="nav-item">
          <HashLink smooth to="/#home" scroll={scrollWithOffset} className="nav-link">
            Home
          </HashLink>
        </li>
        <li className="nav-item">
          <HashLink smooth to="/#about" scroll={scrollWithOffset} className="nav-link">
            About
          </HashLink>
        </li>
        <li className="nav-item">
          <HashLink smooth to="/#timeline" scroll={scrollWithOffset} className="nav-link">
            Timeline
          </HashLink>
        </li>
        <li className="nav-item">
          <HashLink smooth to="/#skills" scroll={scrollWithOffset} className="nav-link">
            Skills
          </HashLink>
        </li>
        <li className="nav-item">
          <HashLink smooth to="/#testimonials" scroll={scrollWithOffset} className="nav-link">
            Testimonials
          </HashLink>
        </li>
      </ul>

      <ul className="nav-list nav-list-right">
        <li className="nav-item">
          <Link to="/blogs" className="nav-link">
            Blog
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
