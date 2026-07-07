import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import '../styles/Catalog.css'

function ProductsCatalog() {
  const { products, categories, presentaciones, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [activePresentacion, setActivePresentacion] = useState('all')
  const [search, setSearch] = useState('')

  const activeCategory = selectedCategory ?? categories[1]?.id ?? ''

  function handleCategoryChange(id) {
    setSelectedCategory(id)
    setActivePresentacion('all')
  }

  const presentacionTabs = useMemo(() => {
    const idsInCategory = new Set(
      products
        .filter((p) => activeCategory === 'all' || p.category?.id === activeCategory)
        .map((p) => p.presentation?.id)
        .filter(Boolean),
    )
    return presentaciones.filter((pr) => idsInCategory.has(pr.id))
  }, [products, presentaciones, activeCategory])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category?.id === activeCategory
      const matchPres = activePresentacion === 'all' || p.presentation?.id === activePresentacion
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchPres && matchSearch
    })
  }, [products, activeCategory, activePresentacion, search])

  const currentCategory = categories.find((c) => c.id === activeCategory) ?? null
  const currentLabel = currentCategory?.label ?? 'Todas'
  const currentLogo = currentCategory?.logo ?? null

  if (loading) {
    return (
      <div className="catalog-loading">
        <div className="catalog-spinner"></div>
        <p>Cargando catalogo...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="catalog-loading">
        <p style={{ color: '#c0392b' }}>Error al cargar productos: {error}</p>
      </div>
    )
  }

  return (
    <div className="catalog-page">
      <div className="catalog-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={'catalog-tab' + (activeCategory === cat.id ? ' active' : '')}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {presentacionTabs.length > 0 && (
        <div className="catalog-tabs catalog-tabs-secondary">
          <button
            className={
              'catalog-tab catalog-tab-sm' + (activePresentacion === 'all' ? ' active' : '')
            }
            onClick={() => setActivePresentacion('all')}
          >
            Todas
          </button>
          {presentacionTabs.map((pres) => (
            <button
              key={pres.id}
              className={
                'catalog-tab catalog-tab-sm' + (activePresentacion === pres.id ? ' active' : '')
              }
              onClick={() => setActivePresentacion(pres.id)}
            >
              {pres.label}
            </button>
          ))}
        </div>
      )}

      <div className="catalog-search-wrapper">
        <input
          className="catalog-search"
          type="search"
          placeholder="Buscar galleta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className={'catalog-section-title' + (currentLogo ? ' catalog-section-title--logo' : '')}>
        {currentLogo ? (
          <div className="catalog-section-logo-wrapper">
            <img src={currentLogo} alt={currentLabel} className="catalog-section-logo" />
          </div>
        ) : (
          currentLabel
        )}
      </h2>

      {filtered.length === 0 ? (
        <p className="catalog-empty">No encontramos galletas con ese nombre</p>
      ) : (
        <div className="catalog-grid">
          {filtered.map((product) => (
            <div key={product.id} className="catalog-card">
              <div className="catalog-card-img">
                <img src={product.img} alt={product.name} />
                {product.badge && <span className="catalog-badge">{product.badge}</span>}
              </div>
              <div className="catalog-card-body">
                <p className="catalog-card-name">{product.name}</p>
                <Link to={'/productos/' + product.slug} className="catalog-card-btn">
                  Ver producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsCatalog
