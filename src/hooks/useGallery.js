import { useState, useEffect } from "react"
import { supabase } from "../supabase"

export function useGallery() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("galeria")
        .select("*")
        .order("orden")

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setImages(data)
      setLoading(false)
    }
    fetch()
  }, [])

  return { images, loading, error }
}
