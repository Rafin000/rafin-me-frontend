/* eslint-disable no-unused-vars */
import './index.css';
// import Slider from 'react-slick'; 
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import TestimonialCard from './TestimonialCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

const Testimonial = () => {

  const testimonialsData = [
    {
      quote: "A quick learning person always ready to learn new things. I wish him all the best.",
      author: "Simon Islam",
      title: "Backend Software Developer, NexGen Cloud",
      image: "/src/assets/docker.png" 
    },
    {
      quote: "I am really enjoying working with Nayyum at Intercloud Limited. Whenever he is willing to assist others. I give him a thumbs-up!",
      author: "Sayeem Md Abdullah",
      title: "Ex Software Engineer, Intercloud Limited",
      image: "/src/assets/profile-img.png" 
    },
    {
      quote: "Nijhum is dedicated to his work. Professionally, he is continuously seeking out opportunities to grow and try new approaches.",
      author: "Shafin Hasnat",
      title: "Backend Software Developer, NexGen Cloud",
      image: "/src/assets/python.png"
    }
  ];

  return (
    <section className="testimonial">
      <h1>Testimonials</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <TestimonialCard
              quote={testimonialsData[0].quote}
              author={testimonialsData[0].author}
              title={testimonialsData[0].title}
              image={testimonialsData[0].image}
            />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
              quote={testimonialsData[1].quote}
              author={testimonialsData[1].author}
              title={testimonialsData[1].title}
              image={testimonialsData[1].image}
            />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
              quote={testimonialsData[2].quote}
              author={testimonialsData[2].author}
              title={testimonialsData[2].title}
              image={testimonialsData[2].image}
            />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard
              quote={testimonialsData[0].quote}
              author={testimonialsData[0].author}
              title={testimonialsData[0].title}
              image={testimonialsData[0].image}
            />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Testimonial;
