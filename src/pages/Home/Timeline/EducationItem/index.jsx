/* eslint-disable react/prop-types */
import './index.css';

const EducationItem = ({year, degree, university, cgpa}) => {

    return (
    <div className="education-item">
        <div className='education-dot'></div>
        <div className='year'>{year}</div>
        <div className='education-item-year'>
            <div className='education-item-left'></div>    
            <div className='education-item-right'>
                <div className='degree'>{degree}</div>
                <div className='university'>{university}</div>
                <div className='cgpa'>{cgpa}</div>
            </div>    
        </div>
    </div>
    );
};

export default EducationItem;
