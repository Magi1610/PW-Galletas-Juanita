import { useState, useEffect } from 'react'
import { apiFetch } from '../services/api'

export function useDepartamentos() {
  const [departamentos, setDepartamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await apiFetch('/api/catalog/departments/')
        setDepartamentos(data.results ?? data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { departamentos, loading, error }
}
