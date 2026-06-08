import { useState, useEffect } from "react"
import { supabase } from "../supabase"

export function useProducts() {
  
  const [products,   setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)

      const [{ data: prods, error: e1 }, { data: cats, error: e2 }] = await Promise.all([
        supabase.from("productos").select("*").eq("activo", true).order("id"),
        supabase.from("categorias").select("*").order("orden"),
      ])

      if (e1 || e2) {
        setError((e1 || e2).message)
        setLoading(false)
        return
      }

      setProducts(prods)
      setCategories([{ id: "all", label: "Todas" }, ...cats])
      setLoading(false)
    }
    fetch()
  }, [])

  return { products, categories, loading, error }
}