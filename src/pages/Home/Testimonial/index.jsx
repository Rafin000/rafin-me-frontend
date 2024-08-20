import { useEffect, useState } from 'react';
import './index.css';
import TestimonialCard from './TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/users/312b9d52-d0a2-476c-81be-88566b7b600b');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setTestimonials(data.data.testimonials || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="testimonial">
      <h1>Testimonials</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={90}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard
              quote={testimonial.content}
              author={testimonial.name}
              title={testimonial.designation}
              company={testimonial.company}
              image={testimonial.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
