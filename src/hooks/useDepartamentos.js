import { useState, useEffect } from "react"
import { supabase } from "../supabase"

export function useDepartamentos() {
  const [departamentos, setDepartamentos] = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)

  useEffect(() => {
    async function fetch() {
      const { data: depts, error: e1 } = await supabase
        .from("departamentos")
        .select("*, asuntos(*)")
        .eq("activo", true)
        .order("orden")

      if (e1) {
        setError(e1.message)
        setLoading(false)
        return
      }

      const formatted = depts.map((d) => ({
        ...d,
        asuntos: d.asuntos.sort((a, b) => a.orden - b.orden),
      }))

      setDepartamentos(formatted)
      setLoading(false)
    }
    fetch()
  }, [])

  return { departamentos, loading, error }
}
