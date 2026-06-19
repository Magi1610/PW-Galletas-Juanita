import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../supabase"
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
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const [product,  setProduct]  = useState(null)
  const [category, setCategory] = useState(null)
  const [variants, setVariants] = useState([])
  const [activeImg, setActiveImg] = useState(0)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("productos")
        .select("*, categorias(id, label)")
        .eq("slug", slug)
        .single()

      if (!error && data) {
        setProduct(data)
        setCategory(data.categorias)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [slug])

  useEffect(() => {
    async function fetchVariants() {
      if (!product?.variantes || product.variantes.length === 0) {
        setVariants([])
        return
      }
      const { data, error } = await supabase
        .from("productos")
        .select("id, slug, name")
        .in("id", product.variantes)

      if (!error && data) {
        setVariants(data)
      }
    }
    fetchVariants()
  }, [product])

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

  const logo          = product.logo || null
  const images        = (product.images && product.images.length > 0) ? product.images : []
  const categoryLabel = category?.label ?? ""
  const accent        = CATEGORY_COLORS[categoryLabel] ?? DEFAULT_COLOR  // ← color activo
  const sizeOptions   = [{ id: product.id, slug: product.slug, name: product.name }, ...variants.filter((v) => v.id !== product.id)]

  return (
    <div className="detail-page" style={{ "--accent": accent }}>  {/* ← inyecta la variable */}
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
            {images[activeImg] && <img src={images[activeImg]} alt={product.name} />}
          </div>
          {images.length > 1 && (
            <div className="detail-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={"detail-thumb" + (activeImg === i ? " active" : "")}
                  onClick={() => setActiveImg(i)}
                >
                  {img && <img src={img} alt={product.name + " vista " + (i + 1)} />}
                </button>
              ))}
            </div>
          )}
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
