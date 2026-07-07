import { useState, useEffect } from 'react'
import { apiFetch } from '../services/api'

export function useGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await apiFetch('/api/galeria/')
        setImages(data.results ?? data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { images, loading, error }
}
