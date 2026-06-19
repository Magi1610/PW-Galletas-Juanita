import { useState, useEffect } from "react"
import { supabase } from "../supabase"

export function useProducts() {

  const [products,      setProducts]      = useState([])
  const [categories,    setCategories]    = useState([])
  const [presentaciones, setPresentaciones] = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)

      const [{ data: prods, error: e1 }, { data: cats, error: e2 }, { data: pres, error: e3 }] = await Promise.all([
        supabase.from("productos").select("*, categorias(id, label), presentaciones(id, label, orden)").eq("activo", true).order("id"),
        supabase.from("categorias").select("*").order("orden"),
        supabase.from("presentaciones").select("*").order("orden"),
      ])

      if (e1 || e2 || e3) {
        setError((e1 || e2 || e3).message)
        setLoading(false)
        return
      }

      setProducts(prods)
      setCategories([{ id: "all", label: "Todas" }, ...cats])
      setPresentaciones(pres)
      setLoading(false)
    }
    fetch()
  }, [])

  return { products, categories, presentaciones, loading, error }
}