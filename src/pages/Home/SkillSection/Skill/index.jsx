/* eslint-disable react/prop-types */
import './index.css'


const Skill = ({ imageSrc, altText, skillName }) => {
  return (
    <div className='skill'>
      <span className='skill-content'>{skillName}</span>
      <img src={imageSrc} alt={altText} />
    </div>
  );
};

export default Skill;
