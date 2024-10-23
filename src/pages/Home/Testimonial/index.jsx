/* eslint-disable react/prop-types */
// Testimonial.js
// import { useEffect, useState } from 'react';
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";
import TestimonialCard from './TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
// import { API_BASE_URL, API_KEY } from '../../../config';

const Testimonial = ({testimonials}) => {
  // const [testimonials, setTestimonials] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTestimonials = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/users/312b9d52-d0a2-476c-81be-88566b7b600b`, {
  //         method: 'GET', 
  //         headers: {
  //           'Content-Type': 'application/json', 
  //           'API-KEY': API_KEY 
  //         }
  //       });
  
  //       if (!response.ok) throw new Error('Network response was not ok');
        
  //       const data = await response.json();
  //       setTestimonials(data.data.testimonials || []);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchTestimonials();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <section className="testimonial">
      <h1>Testimonials</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={30} 
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1320: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard
              quote={testimonial.content}
              author={testimonial.name}
              title={testimonial.designation}
              company={testimonial.company}
              image={testimonial.image_link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
