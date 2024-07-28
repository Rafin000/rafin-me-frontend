// SkillsSection.js
import './index.css'

import Skill from './Skill';

const SkillsSection = () => {
  return (
    <div className='home-skills'>
      <h1>Top Skills</h1>
      <div className='skills'>
        <Skill
          imageSrc="/src/assets/python.png"
          altText="Python Image"
          skillName="Python"
        />
        <Skill
          imageSrc="/src/assets/flask.png"
          altText="Flask Icon"
          skillName="Flask"
        />
        <Skill
          imageSrc="/src/assets/js.png"
          altText="Javascript Icon"
          skillName="JavaScript"
        />
        <Skill
          imageSrc="/src/assets/nodejs.png"
          altText="NodeJs Icon"
          skillName="Node.js"
        />
        <Skill
          imageSrc="/src/assets/kubernetes.png"
          altText="Kubernetes Icon"
          skillName="Kubernetes"
        />
        <Skill
          imageSrc="/src/assets/react.png"
          altText="React Icon"
          skillName="React"
        />
        <Skill
          imageSrc="/src/assets/docker.png"
          altText="Docker Icon"
          skillName="Docker"
        />
        <Skill
          imageSrc="/src/assets/c++.png"
          altText="C++ Icon"
          skillName="C++"
        />
      </div>
    </div>
  );
};

export default SkillsSection;
