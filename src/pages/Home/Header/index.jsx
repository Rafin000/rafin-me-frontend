/* eslint-disable react/prop-types */
import './index.css';

const HomeHeader = ({full_name, designation, profile_picture_link, cv_link}) => {
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