import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products, categories } from '../data/products'
import '../styles/ProductDetail.css'

function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.slug === slug)
  const [activeImg, setActiveImg] = useState(0)

  if (!product) {
    return (
      <div className="detail-not-found">
        <p>Producto no encontrado.</p>
        <button onClick={() => navigate('/productos')}>← Volver al catálogo</button>
      </div>
    )
  }

  const categoryLabel =
    categories.find((c) => c.id === product.category)?.label ?? ''

  return (
    <div className="detail-page">

      {/* ── Breadcrumb ── */}
      <nav className="detail-breadcrumb">
        <button onClick={() => navigate('/productos')}>Productos</button>
        <span>/</span>
        <button onClick={() => navigate('/productos')}>{categoryLabel}</button>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* ── Contenido ── */}
      <div className="detail-body">

        {/* Galería */}
        <div className="detail-gallery">
          <div className="detail-main-img">
            <img src={product.images[activeImg]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="detail-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`detail-thumb${activeImg === i ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} vista ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="detail-info">
          <p className="detail-category">{categoryLabel}</p>
          <h1 className="detail-name">{product.name}</h1>
          {product.badge && (
            <span className="detail-badge">{product.badge}</span>
          )}
          <p className="detail-description">{product.description}</p>

          <a href="#contacto" className="detail-cta">
            Contáctanos para pedidos →
          </a>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail