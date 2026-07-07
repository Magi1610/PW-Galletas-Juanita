import { describe, it, expect, vi, afterEach } from 'vitest'
import { apiFetch } from './api'

function mockFetchOnce({ ok, status = 200, json }) {
  const res = {
    ok,
    status,
    json:
      json === undefined
        ? vi.fn().mockRejectedValue(new Error('no body'))
        : vi.fn().mockResolvedValue(json),
  }
  globalThis.fetch = vi.fn().mockResolvedValue(res)
  return globalThis.fetch
}

describe('apiFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('requests VITE_API_URL + path with the given options', async () => {
    const fetchMock = mockFetchOnce({ ok: true, json: { hello: 'world' } })
    const options = { method: 'POST' }

    await apiFetch('/api/products/', options)

    expect(fetchMock).toHaveBeenCalledWith('http://test.local/api/products/', options)
  })

  it('returns the parsed JSON body on a successful response', async () => {
    mockFetchOnce({ ok: true, json: { id: 1, name: 'Galleta' } })

    const data = await apiFetch('/api/products/1/')

    expect(data).toEqual({ id: 1, name: 'Galleta' })
  })

  it('returns null when the response has no JSON body', async () => {
    mockFetchOnce({ ok: true })

    const data = await apiFetch('/api/ping/')

    expect(data).toBeNull()
  })

  it('throws an error with status and data when the response is not ok', async () => {
    mockFetchOnce({ ok: false, status: 404, json: { detail: 'Not found' } })

    await expect(apiFetch('/api/products/999/')).rejects.toMatchObject({
      message: 'API error: 404',
      status: 404,
      data: { detail: 'Not found' },
    })
  })
})
