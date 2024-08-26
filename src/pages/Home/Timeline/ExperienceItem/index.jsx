/* eslint-disable react/prop-types */
import './index.css';

const ExperienceItem = ({year, designation, company}) => {

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
                        <li>Continuously developing Brilliant Cloud Portal (BCP)</li>
                        <li>Designed and Developed Brilliant Ticketing System frontend for customer support.</li>
                    </ul>  
                </div> 
            </div>
        </div>
    );
};

export default ExperienceItem;
