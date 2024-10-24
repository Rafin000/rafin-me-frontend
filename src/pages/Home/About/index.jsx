/* eslint-disable react/prop-types */
import './index.css';

const HomeAbout = ({about}) => {
  return (
    <div className="home-about">
      <div className='home-about-left'>
        <img src="https://s3.brilliant.com.bd/rafin_storage/header.png" alt="Rafin" />
      </div>
      <div className='home-about-right'>
        <h1 className='home-about-right-header'>About Me</h1>
        <p className='home-about-right-content'>
          {about? `${about}`: " "}
        </p> 
      </div>
    </div>
  );
};

export default HomeAbout;