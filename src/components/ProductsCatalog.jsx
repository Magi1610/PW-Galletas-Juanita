import { useState, useMemo } from 'react'
import { categories, products } from '../data/products'
import '../styles/Catalog.css'

function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  const currentLabel =
    categories.find((c) => c.id === activeCategory)?.label ?? 'Todas'

  return (
    <div className="catalog-page">
      {/* Sidebar */}
      <aside className="catalog-sidebar">
        <p className="catalog-sidebar-title">Categorías</p>
        <nav>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`catalog-cat-item${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="catalog-main">
        <div className="catalog-topbar">
          <div>
            <h1 className="catalog-heading">{currentLabel}</h1>
            <p className="catalog-count">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <input
            className="catalog-search"
            type="search"
            placeholder="Buscar galleta…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="catalog-empty">No encontramos galletas con ese nombre 🍪</p>
        ) : (
          <div className="catalog-grid">
            {filtered.map((product) => (
              <div key={product.id} className="catalog-card">
                <div className="catalog-card-img">
                  <img src={product.img} alt={product.name} />
                  {product.badge && (
                    <span className="catalog-badge">{product.badge}</span>
                  )}
                </div>
                <div className="catalog-card-body">
                  <p className="catalog-card-name">{product.name}</p>
                  <p className="catalog-card-cat">
                    {categories.find((c) => c.id === product.category)?.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ProductsCatalog