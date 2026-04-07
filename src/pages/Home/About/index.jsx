/* eslint-disable react/prop-types */
import './index.css';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { URLs } from '../../../config';

const HomeAbout = ({ about }) => {
  return (
    <div id="about" className="home-about">
      <div className="home-about-left">
        <img src={URLs.header} alt="Rafin" />
      </div>
      <div className="home-about-right">
        <h1 className="home-about-right-header">About Me</h1>
        <MarkdownPreview
          className="home-about-right-content markdown-preview"
          source={about || ' '}
          wrapperElement={{ 'data-color-mode': 'dark' }}
        />
      </div>
    </div>
  );
};

export default HomeAbout;
