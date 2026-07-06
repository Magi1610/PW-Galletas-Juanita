import { useState, useEffect } from "react"
import { apiFetch } from "../services/api"

export function useProducts() {

  const [products,       setProducts]       = useState([])
  const [categories,     setCategories]     = useState([])
  const [presentaciones, setPresentaciones] = useState([])
  const [loading,        setLoading]        = useState(true)
  const [error,          setError]          = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [prods, cats, pres] = await Promise.all([
          apiFetch("/api/products/"),
          apiFetch("/api/categories/"),
          apiFetch("/api/presentations/"),
        ])
        setProducts(prods.results ?? prods)
        setCategories([{ id: "all", label: "Todas" }, ...(cats.results ?? cats)])
        setPresentaciones(pres.results ?? pres)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { products, categories, presentaciones, loading, error }
}
