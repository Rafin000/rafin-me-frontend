import EducationItem from './EducationItem';
import ExperienceItem from './ExperienceItem';
import './index.css';

const Timeline = () => {
  return (
    <div className="timeline">
        <h1>Timeline</h1>
        <div className='timeline-body'>
            <div className="timeline-left">
                <h2>Education</h2>
                <div className='education'>
                    <div className='education-left'></div>
                    <div className='education-right'>
                        <EducationItem 
                            year = '2018 - 2023' 
                            degree = 'Bachelor in Computer Science and Engineering' 
                            university = 'Chittagong University of Engineering and Technology'
                            cgpa = '- CGPA 3.28 / 4.00'
                        />
                        <EducationItem 
                            year = '2017-2018' 
                            degree = 'Higher Secondary Certificate in Science' 
                            university = 'Notre Dame College, Dhaka'
                            cgpa = '- CGPA 5.00 / 5.00'
                        />
                    </div>
                </div>
            </div>
            <div className="timeline-right">
                <h2>Experience</h2>
                <div className='experience'>
                    <div className='experience-left'></div>
                    <div className='experience-right'>
                        <ExperienceItem 
                            year = 'Feb 2024 - Present' 
                            designation = 'Software Engineer - Cloud Software (Backend)' 
                            company = 'Intercloud Limited'
                        />
                        <ExperienceItem 
                            year = 'Apr 2023 - Dec 2023' 
                            designation = 'Trainee Software Engineer' 
                            company = 'Diligite Limited'
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Timeline;
