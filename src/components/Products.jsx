import '../styles/Products.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const products = [
  { id: 1, name: 'Tradicionales', emoji: '🍪', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80' },
  { id: 2, name: 'Integrales',    emoji: '🌾', img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&q=80' },
  { id: 3, name: 'Rellenas',      emoji: '🍓', img: 'https://images.unsplash.com/photo-1612200747741-a8c6c423e7f7?w=400&q=80' },
  { id: 4, name: 'Chocolate',     emoji: '🍫', img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80' },
  { id: 5, name: 'Especiales',    emoji: '⭐', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
]

function Products() {
  return (
    <section id="productos" className="products">
      <div className="products-header">
        <span className="products-label">PRODUCTOS</span>
        <h2 className="products-title">Variedad que encanta</h2>
        <div className="products-underline"></div>
      </div>

      <div className="products-swiper-wrapper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0:   { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024:{ slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="product-img-wrapper">
                  <img src={product.img} alt={product.name} />
                  <div className="product-overlay">
                    <span className="product-emoji">{product.emoji}</span>
                  </div>
                </div>
                <p className="product-name">{product.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <a href="#contacto" className="products-btn">Ver todos los productos →</a>
    </section>
  )
}

export default Products