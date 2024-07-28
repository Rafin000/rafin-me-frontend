/* eslint-disable react/prop-types */
import './index.css';

const TestimonialCard = ({ quote, author, title, image }) => (
  <div className="testimonial-card">
    <i className="fa-solid fa-quote-left"></i>
    <div className="author">
      <p className="quote">{quote}</p>
      <div className="author-info">
        <div className="author-image-container">
          <img src={image} alt={author} className="author-image" />
        </div>
        <div className="author-details">
          <h3>{author}</h3>
          <div>{title}</div>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
