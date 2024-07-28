import './index.css';

const HomeAbout = () => {
  return (
    <div className="home-about">
      <div className='home-about-left'>
        <img src="/src/assets/header.png" alt="Rafin" />
      </div>
      <div className='home-about-right'>
        <h1 className='home-about-right-header'>About Me</h1>
        <p className='home-about-right-content'>
          I am a professional Software Engineer who dreams about being a successful person in every aspect of life. 
          Currently, I have been working as a full time software engineer at Intercloud Limited which is located in 
          Dhaka, Bangladesh. Besides, during my leisure time, you can find me playing FIFA, watching TV-Series, 
          Movies or hanging out with my friends. Whenever I get a chance to do something, I usually do not stop until 
          I finish it.
        </p>
      </div>
    </div>
  );
};

export default HomeAbout;
