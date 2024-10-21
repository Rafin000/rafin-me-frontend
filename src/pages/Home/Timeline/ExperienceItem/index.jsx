/* eslint-disable react/prop-types */
import './index.css';

const ExperienceItem = ({year, designation, company, work_details}) => {
    return (
        <div className="experience-item">
            <div className='dot-year'>
                <div className='experience-dot'></div>
                <div className='year'>{year}</div>
            </div>
            <div className='experience-item-year'>
                <div className='experience-item-left'></div> 
                <div className='experience-item-right'>
                    <div className='designation'>{designation}</div>
                    <div className='company'>{company}</div>
                    <ul className='contribution'>
                    {work_details && work_details.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>  
                </div> 
            </div>
        </div>
    );
};

export default ExperienceItem;
