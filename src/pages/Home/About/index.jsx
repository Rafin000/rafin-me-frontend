import { useEffect, useState } from 'react';
import './index.css';

const HomeAbout = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/users/312b9d52-d0a2-476c-81be-88566b7b600b')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data.data); 
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="home-about">
      <div className='home-about-left'>
        <img src="/src/assets/header.png" alt="Rafin" />
      </div>
      <div className='home-about-right'>
        <h1 className='home-about-right-header'>About Me</h1>
        <p className='home-about-right-content'>
          {userData? `${userData.about}`: " "}
        </p> 
      </div>
    </div>
  );
};

export default HomeAbout;