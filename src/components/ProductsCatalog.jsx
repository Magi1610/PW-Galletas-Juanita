import { useState, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"
import "../styles/Catalog.css"

function ProductsCatalog() {
  const { products, categories, loading, error } = useProducts()
  const [activeCategory, setActiveCategory] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (categories.length > 1 && !activeCategory) {
      setActiveCategory(categories[1].id)
    }
  }, [categories])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat    = activeCategory === "all" || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [products, activeCategory, search])

  const currentLabel = categories.find((c) => c.id === activeCategory)?.label ?? "Todas"

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
        <p style={{ color: "#c0392b", fontFamily: "Poppins, sans-serif" }}>
          Error al cargar productos: {error}
        </p>
      </div>
    )
  }

  return (
    <div className="catalog-page">

      <div className="catalog-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={"catalog-tab" + (activeCategory === cat.id ? " active" : "")}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="catalog-search-wrapper">
        <input
          className="catalog-search"
          type="search"
          placeholder="Buscar galleta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="catalog-section-title">{currentLabel}</h2>

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
                <Link to={"/productos/" + product.slug} className="catalog-card-btn">
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
