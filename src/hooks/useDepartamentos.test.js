import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useDepartamentos } from './useDepartamentos'
import { apiFetch } from '../services/api'

vi.mock('../services/api', () => ({
  apiFetch: vi.fn(),
}))

describe('useDepartamentos', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts loading and exposes the fetched departamentos', async () => {
    apiFetch.mockResolvedValue({ results: [{ id: 1, nombre: 'Guanajuato' }] })

    const { result } = renderHook(() => useDepartamentos())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(apiFetch).toHaveBeenCalledWith('/api/departments/')
    expect(result.current.departamentos).toEqual([{ id: 1, nombre: 'Guanajuato' }])
    expect(result.current.error).toBeNull()
  })

  it('accepts a plain array response (no results wrapper)', async () => {
    apiFetch.mockResolvedValue([{ id: 2, nombre: 'Jalisco' }])

    const { result } = renderHook(() => useDepartamentos())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.departamentos).toEqual([{ id: 2, nombre: 'Jalisco' }])
  })

  it('exposes the error message when the request fails', async () => {
    apiFetch.mockRejectedValue(new Error('API error: 500'))

    const { result } = renderHook(() => useDepartamentos())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('API error: 500')
    expect(result.current.departamentos).toEqual([])
  })
})
