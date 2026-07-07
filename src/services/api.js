const BASE = import.meta.env.VITE_API_URL

export async function apiFetch(path, options) {
  const res = await fetch(`${BASE}${path}`, options)
  let data
  try {
    data = await res.json()
  } catch {
    data = null
  }
  if (!res.ok) {
    const error = new Error(`API error: ${res.status}`)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}
