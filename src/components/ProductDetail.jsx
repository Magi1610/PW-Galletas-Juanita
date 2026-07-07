import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiFetch } from "../services/api"
import "../styles/ProductDetail.css"

const CATEGORY_COLORS = {
  "Chispas":           "rgb(54,  24,  20)",
  "Estrellas":         "rgb(255, 154, 222)",
  "Orejitas":          "rgb(255, 132, 1)",
  "Polvorones":        "rgb(247, 148, 29)",
  "Surtido":           "rgb(236, 28,  36)",
  "Tartaletas":        "rgb(174, 42,  61)",
  "Barritas con nuez": "rgb(158, 51,  32)",
}

const DEFAULT_COLOR = "#c0392b"

function parseWeight(name) {
  const match = name.match(/(\d+(?:\.\d+)?\s?(?:kg|g|ml|l))\b/i)
  return match ? match[1] : name
}

function ProductDetail() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await apiFetch(`/api/store-mgmt/products/${slug}/`)
        setProduct(data)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="detail-spinner"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="detail-not-found">
        <p>Producto no encontrado.</p>
        <button onClick={() => navigate("/productos")}>Volver al catálogo</button>
      </div>
    )
  }

  const category      = product.category
  const logo          = category?.logo || null
  const categoryLabel = category?.label ?? ""
  const accent        = CATEGORY_COLORS[categoryLabel] ?? DEFAULT_COLOR
  const sizeOptions   = [
    { id: product.id, slug: product.slug, name: product.name },
    ...(product.variantes ?? []),
  ]

  return (
    <div className="detail-page" style={{ "--accent": accent }}>
      <nav className="detail-breadcrumb">
        <button onClick={() => navigate("/productos")}>Productos</button>
        <span>/</span>
        <button onClick={() => navigate("/productos")}>{categoryLabel}</button>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail-logo-section">
        {logo && (
          <img src={logo} alt={"Logo " + product.name} className="detail-logo" />
        )}
      </div>

      <div className="detail-body">
        <div className="detail-gallery">
          <div className="detail-main-img">
            {product.img && <img src={product.img} alt={product.name} />}
          </div>
        </div>

        <div className="detail-info">
          {product.badge && <span className="detail-badge">{product.badge}</span>}

          {sizeOptions.length > 1 && (
            <div className="detail-variants">
              <p className="detail-variants-label">Tamaño:</p>
              <div className="detail-variants-list">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    className={"detail-variant" + (opt.id === product.id ? " active" : "")}
                    onClick={() => navigate("/productos/" + opt.slug)}
                  >
                    {parseWeight(opt.name)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="detail-description">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
