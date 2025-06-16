import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper'

const slides = [
  {
    src: 'https://cdn0.fahasa.com/media/magentothem/banner7/fhs_potico_840x320.png',
    alt: 'image slide 1',
  },
  {
    src: '/images/slider-2.jpg',
    alt: 'image slide 2',
  },
  {
    src: '/images/slider-1.jpg',
    alt: 'image slide 3',
  },
  {
    src: '/images/slider-3.jpg',
    alt: 'image slide 4',
  },
]

export default function Slider() {
  return (
    <div className="w-full h-full">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full aspect-[2.5/1] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={slide.src}
                alt={slide.alt}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
