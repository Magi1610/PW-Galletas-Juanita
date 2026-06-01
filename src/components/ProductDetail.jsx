import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../supabase"
import { products as localProducts, categories } from "../data/products"
import "../styles/ProductDetail.css"

function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product,   setProduct]   = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .eq("slug", slug)
          .single()

        if (error) throw error
        setProduct(data)
      } catch {
        const local = localProducts.find((p) => p.slug === slug)
        setProduct(local || null)
      } finally {
        setLoading(false)
      }
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

  const categoryLabel = categories.find((c) => c.id === product.category)?.label ?? ""
  const images = product.images || [product.img]

  return (
    <div className="detail-page">
      <nav className="detail-breadcrumb">
        <button onClick={() => navigate("/productos")}>Productos</button>
        <span>/</span>
        <button onClick={() => navigate("/productos")}>{categoryLabel}</button>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

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
          <p className="detail-category">{categoryLabel}</p>
          <h1 className="detail-name">{product.name}</h1>
          {product.badge && <span className="detail-badge">{product.badge}</span>}
          <p className="detail-description">{product.description}</p>
          <a href="/#contacto" className="detail-cta">Contactanos para pedidos</a>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
