import { useState, useEffect } from 'react';
import './index.css';
import { URLs,API_BASE_URL, API_KEY } from '../../const';

function Footer() {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    async function fetchSocialLinks() {
      try {
        const response = await fetch(`${API_BASE_URL}/socials/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'API-KEY': API_KEY 
          }
        });
        
        const result = await response.json();
        if (result.data && result.data.length > 0) {
          setSocialLinks(result.data[0]);
        }
      } catch (error) {
        console.error('Error fetching social media links:', error);
      }
    }
  
    fetchSocialLinks();
  }, []);
  

  return (
    <footer className="footer">
      <div className='footer-logo'>
        <img src={URLs.logo} alt="Logo" />
      </div>
      <div className="social-icons">
        {socialLinks.facebook && (
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
        )}
        {socialLinks.instagram && (
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        )}
        {socialLinks.github && (
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        )}
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        )}
      </div>
      <p className="copyright">© 2024 Md Maruful Islam. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;

