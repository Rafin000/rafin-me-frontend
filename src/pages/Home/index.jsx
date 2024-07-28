import './index.css';
import SkillsSection from './SkillSection';
import Timeline from './Timeline';
import HomeHeader from './Header';
import HomeAbout from './About';
import Testimonial from './Testimonial';

function Home() {

    return (
        <div className="home-page">
            <HomeHeader/>
            <HomeAbout/>
            <Timeline/>
            <SkillsSection />
            <Testimonial/>
        </div>
    );
}

export default Home;
