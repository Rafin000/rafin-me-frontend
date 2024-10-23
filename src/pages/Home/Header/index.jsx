// import { useEffect, useState } from 'react';
import './index.css';
// import { API_BASE_URL, API_KEY } from '../../../config';

// eslint-disable-next-line react/prop-types
const HomeHeader = ({full_name, designation, profile_picture_link, cv_link}) => {
  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(`${API_BASE_URL}/users/312b9d52-d0a2-476c-81be-88566b7b600b`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-KEY': API_KEY 
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setUserData(data.data); 
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${cv_link}`; 
    link.download = 'https://s3.brilliant.com.bd/rafin_storage/cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <header className="home-header">
      <div className='home-header-left'>
        <h2>Hi,&#128075; I&apos;m</h2>
        <h1>{full_name ? full_name : ''}</h1>
        <p className='home-header-designation'>
          {designation ? designation : ''}
        </p>
        <button className="download-button" onClick={handleDownload}>Download Resume</button>
      </div>
      <div className='home-header-right'>
        <img className='home-header-right-image' src={profile_picture_link} alt="profile-picture" />
      </div>
    </header>
  );
};

export default HomeHeader;