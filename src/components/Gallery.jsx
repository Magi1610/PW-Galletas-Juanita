import '../styles/Gallery.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80', alt: 'Galletas en canasta' },
  { id: 2, src: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80', alt: 'Ingredientes naturales' },
  { id: 3, src: 'https://images.unsplash.com/photo-1612200747741-a8c6c423e7f7?w=600&q=80', alt: 'Galletas rellenas' },
  { id: 4, src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', alt: 'Galletas de chispas' },
  { id: 5, src: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80', alt: 'Galletas de chocolate' },
]

function Gallery() {
  return (
    <section id="galeria" className="gallery">

      <div className="gallery-header">
        <span className="gallery-label">GALERÍA</span>
        <h2 className="gallery-title">Momentos que saben bien</h2>
        <div className="gallery-underline"></div>
      </div>

      <div className="gallery-swiper-wrapper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0:   { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="gallery-slide">
                <img src={image.src} alt={image.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  )
}

export default Gallery