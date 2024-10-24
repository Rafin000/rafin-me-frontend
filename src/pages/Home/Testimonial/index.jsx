/* eslint-disable react/prop-types */
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";
import TestimonialCard from './TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";

const Testimonial = ({testimonials}) => {
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
