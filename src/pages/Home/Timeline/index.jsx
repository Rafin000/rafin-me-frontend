/* eslint-disable react/prop-types */
import EducationItem from './EducationItem';
import ExperienceItem from './ExperienceItem';
import './index.css';

const Timeline = ({educationData, experienceData}) => {
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
