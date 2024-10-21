import { useEffect, useState } from 'react';
import './index.css';
import Skill from './Skill';
import { API_BASE_URL, API_KEY } from '../../../const';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/312b9d52-d0a2-476c-81be-88566b7b600b`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json', 
        'API-KEY': API_KEY 
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSkills(data.data.skills || []); 
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='home-skills'>
      <h1>Top Skills</h1>
      <div className='skills'>
        {skills.map((skill, index) => (
          <Skill
            key={index}
            imageSrc={skill.icon_link}
            altText={`${skill} Icon`}
            skillName={skill.skill}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
