import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../supabase"
import "../styles/ProductDetail.css"

function ProductDetail() {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const [product,   setProduct]   = useState(null)
  const [category,  setCategory]  = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [loading,   setLoading]   = useState(true)

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
        <button onClick={() => navigate("/productos")}>Volver al catalogo</button>
      </div>
    )
  }

  const logo   = product.logo || null
  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.img]

  const categoryLabel = category?.label ?? ""

  return (
    <div className="detail-page">
      <nav className="detail-breadcrumb">
        <button onClick={() => navigate("/productos")}>Productos</button>
        <span>/</span>
        <button onClick={() => navigate("/productos")}>{categoryLabel}</button>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {logo && (
        <div className="detail-logo-section">
          <img src={logo} alt={"Logo " + product.name} className="detail-logo" />
        </div>
      )}

      <div className="detail-body">
        <div className="detail-gallery">
          <div className="detail-main-img">
            <img src={images[activeImg]} alt={product.name} />
          </div>
          {images.length > 1 && (
            <div className="detail-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={"detail-thumb" + (activeImg === i ? " active" : "")}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={product.name + " vista " + (i + 1)} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          {product.badge && <span className="detail-badge">{product.badge}</span>}
          <p className="detail-description">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
