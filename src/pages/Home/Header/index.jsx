import './index.css';

const HomeHeader = () => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/cv.pdf'; 
        link.download = 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    return (
        <header className="home-header">
            <div className='home-header-left'>
                <h2>Hi,&#128075; I&apos;m</h2>
                <h1>MD MARUFUL ISLAM</h1>
                <p className='home-header-designation'>Software Engineer</p>
                <button className="download-button" onClick={handleDownload}>Download Resume</button>
            </div>
            <div className='home-header-right'>
                <img className='home-header-right-image' src="/src/assets/profile-img.png" alt="Rafin" />
            </div>
        </header>
    );
};

export default HomeHeader;
