import '../styles/Gallery.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useGallery } from '../hooks/useGallery'

function Gallery() {
  const { images, loading, error } = useGallery()

  if (loading || error || images.length === 0) {
    return null
  }

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
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="gallery-slide">
                <img src={image.url} alt={image.alt || 'Galletas Juanita'} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Gallery
