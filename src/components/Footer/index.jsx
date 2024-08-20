// import './index.css';
// import { URLs } from '../../const';

// function Footer() {
//   return (
//     <footer className="footer">
//       <div className='footer-logo'>
//           <img src={URLs.logo} alt="Logo" />
//       </div>
//       <div className="social-icons">
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           <i className="fab fa-facebook-f"></i>
//         </a>
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           <i className="fab fa-instagram"></i>
//         </a>
//         <a href="https://github.com/Rafin000" target="_blank" rel="noopener noreferrer">
//           <i className="fab fa-github"></i>
//         </a>
//         <a href="https://www.linkedin.com/in/marufulislam" target="_blank" rel="noopener noreferrer">
//           <i className="fab fa-linkedin-in"></i>
//         </a>
//       </div>
//       <p className="copyright">© 2024 Md Maruful Islam. All Rights Reserved.</p>
//     </footer>
//   );
// }

// export default Footer;


import { useState, useEffect } from 'react';
import './index.css';
import { URLs } from '../../const';

function Footer() {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    async function fetchSocialLinks() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/socials');
        const result = await response.json();
        if (result.data.length > 0) {
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

