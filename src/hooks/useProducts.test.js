import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useProducts } from './useProducts'
import { apiFetch } from '../services/api'

vi.mock('../services/api', () => ({
  apiFetch: vi.fn(),
}))

describe('useProducts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads products, categories (prefixed with "Todas") and presentaciones', async () => {
    apiFetch.mockImplementation((path) => {
      if (path === '/api/store-mgmt/products/') {
        return Promise.resolve({ results: [{ id: 1, name: 'Galleta de nuez' }] })
      }
      if (path === '/api/catalog/categories/') {
        return Promise.resolve({ results: [{ id: 'nuez', label: 'Nuez' }] })
      }
      if (path === '/api/catalog/presentations/') {
        return Promise.resolve({ results: [{ id: 'chica', label: 'Chica' }] })
      }
      throw new Error(`unexpected path: ${path}`)
    })

    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toEqual([{ id: 1, name: 'Galleta de nuez' }])
    expect(result.current.categories).toEqual([
      { id: 'all', label: 'Todas' },
      { id: 'nuez', label: 'Nuez' },
    ])
    expect(result.current.presentaciones).toEqual([{ id: 'chica', label: 'Chica' }])
    expect(result.current.error).toBeNull()
  })

  it('exposes the error message when any request fails', async () => {
    apiFetch.mockRejectedValue(new Error('API error: 500'))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('API error: 500')
    expect(result.current.products).toEqual([])
  })
})
