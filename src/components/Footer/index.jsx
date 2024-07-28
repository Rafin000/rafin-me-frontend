import './index.css';

function Footer() {
  return (
    <footer className="footer">
      <div className='footer-logo'>
          <img src="/src/assets/logo.png" alt="Logo" />
      </div>
      <div className="social-icons">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://github.com/Rafin000" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/marufulislam" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
      <p className="copyright">© 2024 Md Maruful Islam. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;