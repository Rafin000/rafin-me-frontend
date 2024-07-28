import './index.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className='navbar-logo'>
        <a href="/">
          <img src="/src/assets/logo.png" alt="Logo" />
        </a>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/blog" className="nav-link">
            Blog
          </a>
        </li>
        <li className="nav-item">
          <a href="/contact" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;