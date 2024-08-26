/* eslint-disable react/prop-types */
import './index.css';

const TestimonialCard = ({ quote, author, title, company, image }) => (
  <div className="testimonial-card">
    <div className="author">
      <div className='author-header'>
        <i className="fa-solid fa-quote-left"></i>
        <p className="quote">{quote}</p>
      </div>
      <div className="author-info">
        <div className="author-image-container">
          <img src={image} alt={author} className="author-image" />
        </div>
        <div className="author-details">
          <h3>{author}</h3>
          <div>{title}</div>
          <div>{company}</div>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
