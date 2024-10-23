/* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import EducationItem from './EducationItem';
import ExperienceItem from './ExperienceItem';
import './index.css';
// import { API_BASE_URL, API_KEY } from '../../../config';

// eslint-disable-next-line react/prop-types
const Timeline = ({educationData, experienceData}) => {
  // const [educationData, setEducationData] = useState([]);
  // const [experienceData, setExperienceData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/users/312b9d52-d0a2-476c-81be-88566b7b600b`, {
  //         headers: {
  //           'Content-Type': 'application/json', 
  //           'API-KEY': API_KEY 
  //         }
  //       });
        
  //       const userData = response.data.data;
        
  //       setEducationData(userData.education || []); 
  //       setExperienceData(userData.experiences || []); 
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  return (
    <div className="timeline">
      <h1>Timeline</h1>
      <div className='timeline-body'>
        <div className="timeline-left">
          <h2>Education</h2>
          <div className='education'>
            <div className='education-left'></div>
            <div className='education-right'>
              {educationData.map((item) => (
                <EducationItem 
                  key={item.id}
                  year={item.year}
                  degree={item.degree}
                  university={item.university}
                  cgpa={item.cgpa}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="timeline-right">
          <h2>Experience</h2>
          <div className='experience'>
            <div className='experience-left'></div>
            <div className='experience-right'>
              {experienceData.map((item) => (
                <ExperienceItem 
                  key={item.id}
                  year={item.year}
                  designation={item.position}
                  company={item.company}
                  work_details={item.contributions}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
