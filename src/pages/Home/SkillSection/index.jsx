/* eslint-disable react/prop-types */
import './index.css';
import Skill from './Skill';


const SkillsSection = ({skills}) => {
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
