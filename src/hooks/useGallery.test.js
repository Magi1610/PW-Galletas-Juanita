import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useGallery } from './useGallery'
import { apiFetch } from '../services/api'

vi.mock('../services/api', () => ({
  apiFetch: vi.fn(),
}))

describe('useGallery', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches the gallery images', async () => {
    apiFetch.mockResolvedValue({ results: [{ id: 1, image: 'foto.jpg' }] })

    const { result } = renderHook(() => useGallery())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(apiFetch).toHaveBeenCalledWith('/api/galeria/')
    expect(result.current.images).toEqual([{ id: 1, image: 'foto.jpg' }])
    expect(result.current.error).toBeNull()
  })

  it('exposes the error message when the request fails', async () => {
    apiFetch.mockRejectedValue(new Error('API error: 500'))

    const { result } = renderHook(() => useGallery())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('API error: 500')
    expect(result.current.images).toEqual([])
  })
})
