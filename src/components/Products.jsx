import '../styles/Products.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { products } from '../data/products'
import { Link } from 'react-router-dom'

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

      <Link to="/productos" className="products-btn">Ver todos los productos →</Link>
    </section>
  )
}

export default Products