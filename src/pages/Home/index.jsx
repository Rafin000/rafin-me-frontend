import './index.css';
import SkillsSection from './SkillSection';
import Timeline from './Timeline';
import HomeHeader from './Header';
import HomeAbout from './About';
import Testimonial from './Testimonial';
import { useEffect, useState } from 'react';
import { API_BASE_URL , API_KEY} from '../../config';

function Home() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/312b9d52-d0a2-476c-81be-88566b7b600b`, {
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': API_KEY 
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserData(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
      };

      fetchData();
      const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowScrollTop(true);
        } else {
            setShowScrollTop(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
      if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    return (
        <div className="home-page">
            <HomeHeader 
              full_name={userData.full_name}
              designation={userData.designation}
              profile_picture_link={userData.profile_picture_link}
              cv_link={userData.cv_link}
            />
            <HomeAbout 
              about={userData.about}
            />
            <Timeline
              educationData={userData.education}
              experienceData={userData.experiences}
            />
            <SkillsSection 
              skills={userData.skills}
            />
            <Testimonial 
              testimonials={userData.testimonials}
            />
            {showScrollTop && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </div>
    );
}

export default Home;
