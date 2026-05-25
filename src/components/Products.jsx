import '../styles/Products.css'

const products = [
  {
    id: 1,
    name: 'Tradicionales',
    emoji: '🍪',
    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=80',
  },
  {
    id: 2,
    name: 'Integrales',
    emoji: '🌾',
    img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&q=80',
  },
  {
    id: 3,
    name: 'Rellenas',
    emoji: '🍓',
    img: 'https://images.unsplash.com/photo-1612200747741-a8c6c423e7f7?w=300&q=80',
  },
  {
    id: 4,
    name: 'Chocolate',
    emoji: '🍫',
    img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&q=80',
  },
  {
    id: 5,
    name: 'Especiales',
    emoji: '⭐',
    img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80',
  },
]

function Products() {
  return (
    <section id="productos" className="products">

      <div className="products-header">
        <span className="products-label">PRODUCTOS</span>
        <h2 className="products-title">Variedad que encanta</h2>
        <div className="products-underline"></div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-img-wrapper">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="product-name">
              <span>{product.emoji}</span>
              <p>{product.name}</p>
            </div>
          </div>
        ))}
      </div>

      <a href="#contacto" className="products-btn">
        Ver todos los productos →
      </a>

    </section>
  )
}

export default Products