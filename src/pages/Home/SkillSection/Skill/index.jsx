/* eslint-disable react/prop-types */
import './index.css'


const Skill = ({ imageSrc, altText, skillName }) => {
  return (
    <div className='skill'>
      <img src={imageSrc} alt={altText} />
      <span className='skill-content'>{skillName}</span>
    </div>
  );
};

export default Skill;
