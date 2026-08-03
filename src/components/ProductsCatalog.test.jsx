import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ProductsCatalog from './ProductsCatalog'
import { useProducts } from '../hooks/useProducts'

vi.mock('../hooks/useProducts', () => ({
  useProducts: vi.fn(),
}))

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 1, label: 'Nuez' },
  { id: 2, label: 'Chocolate' },
]

const presentaciones = [
  { id: 'chica', label: 'Chica' },
  { id: 'grande', label: 'Grande' },
]

const products = [
  {
    id: 1,
    name: 'Galleta de nuez chica',
    slug: 'nuez-chica',
    category: { id: 1 },
    presentation: { id: 'chica' },
  },
  {
    id: 2,
    name: 'Galleta de nuez grande',
    slug: 'nuez-grande',
    category: { id: 1 },
    presentation: { id: 'grande' },
  },
  {
    id: 3,
    name: 'Galleta de chocolate',
    slug: 'chocolate',
    category: { id: 2 },
    presentation: { id: 'chica' },
  },
]

function setup(overrides = {}) {
  useProducts.mockReturnValue({
    products,
    categories,
    presentaciones,
    loading: false,
    error: null,
    ...overrides,
  })
  return render(
    <MemoryRouter>
      <ProductsCatalog />
    </MemoryRouter>,
  )
}

describe('ProductsCatalog', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows a loading state while products are being fetched', () => {
    setup({ loading: true, categories: [], presentaciones: [], products: [] })

    expect(screen.getByText('Cargando catalogo...')).toBeInTheDocument()
  })

  it('shows an error message when the fetch failed', () => {
    setup({
      loading: false,
      error: 'API error: 500',
      categories: [],
      presentaciones: [],
      products: [],
    })

    expect(screen.getByText(/Error al cargar productos/)).toBeInTheDocument()
  })

  it('defaults to the first real category (from the URL query param default) and only shows its products', () => {
    setup()

    expect(screen.getByText('Galleta de nuez chica')).toBeInTheDocument()
    expect(screen.getByText('Galleta de nuez grande')).toBeInTheDocument()
    expect(screen.queryByText('Galleta de chocolate')).not.toBeInTheDocument()
  })

  it('filters by presentacion within the active category', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByRole('button', { name: 'Chica' }))

    expect(screen.getByText('Galleta de nuez chica')).toBeInTheDocument()
    expect(screen.queryByText('Galleta de nuez grande')).not.toBeInTheDocument()
  })

  it('switches category via the URL search param and resets the presentacion filter', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByRole('button', { name: 'Grande' }))
    expect(screen.queryByText('Galleta de nuez chica')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Chocolate' }))

    expect(screen.getByText('Galleta de chocolate')).toBeInTheDocument()
  })

  it('filters by search text', async () => {
    const user = userEvent.setup()
    setup()

    await user.type(screen.getByPlaceholderText('Buscar galleta...'), 'grande')

    expect(screen.getByText('Galleta de nuez grande')).toBeInTheDocument()
    expect(screen.queryByText('Galleta de nuez chica')).not.toBeInTheDocument()
  })

  it('shows an empty state when no product matches the search', async () => {
    const user = userEvent.setup()
    setup()

    await user.type(screen.getByPlaceholderText('Buscar galleta...'), 'no existe')

    expect(screen.getByText('No encontramos galletas con ese nombre')).toBeInTheDocument()
  })
})
