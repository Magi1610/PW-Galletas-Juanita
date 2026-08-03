import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './Contact'
import { apiFetch } from '../services/api'
import { useDepartamentos } from '../hooks/useDepartamentos'

vi.mock('../services/api', () => ({
  apiFetch: vi.fn(),
}))

vi.mock('../hooks/useDepartamentos', () => ({
  useDepartamentos: vi.fn(),
}))

const departamentos = [
  {
    id: 1,
    name: 'CDMX',
    subjects: [
      { id: 10, label: 'Ventas' },
      { id: 11, label: 'Soporte' },
    ],
  },
]

function fillRequiredFields(container) {
  return {
    nombre: container.getByPlaceholderText('Nombre completo *'),
    email: container.getByPlaceholderText('Correo electronico *'),
    mensaje: container.getByPlaceholderText('Mensaje *'),
  }
}

describe('Contact', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows a validation message when submitting with required fields empty', async () => {
    useDepartamentos.mockReturnValue({ departamentos, loading: false })
    const user = userEvent.setup()
    render(<Contact />)

    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(
      await screen.findByText('Por favor llena todos los campos requeridos (*).'),
    ).toBeInTheDocument()
    expect(apiFetch).not.toHaveBeenCalled()
  })

  it('resets the asunto selection when the departamento changes', async () => {
    useDepartamentos.mockReturnValue({ departamentos, loading: false })
    const user = userEvent.setup()
    render(<Contact />)

    const [deptSelect] = screen.getAllByRole('combobox')
    await user.selectOptions(deptSelect, '1')

    expect(screen.getByRole('option', { name: 'Ventas' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Soporte' })).toBeInTheDocument()
  })

  it('submits the form to the selected departamento and shows a success message', async () => {
    useDepartamentos.mockReturnValue({ departamentos, loading: false })
    apiFetch.mockResolvedValue({ ok: true })
    const user = userEvent.setup()
    const { getByPlaceholderText } = render(<Contact />)
    const { nombre, email, mensaje } = fillRequiredFields({ getByPlaceholderText })

    await user.type(nombre, 'Ivan')
    await user.type(email, 'ivan@example.com')
    await user.type(mensaje, 'Hola, quiero informacion.')

    const [deptSelect, asuntoSelect] = screen.getAllByRole('combobox')
    await user.selectOptions(deptSelect, '1')
    await user.selectOptions(asuntoSelect, '10')

    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    await waitFor(() =>
      expect(screen.getByText('Mensaje enviado correctamente')).toBeInTheDocument(),
    )

    expect(apiFetch).toHaveBeenCalledWith(
      '/api/catalog/departments/1/contact/',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Ivan',
          email: 'ivan@example.com',
          phone: '',
          city: '',
          subject: 10,
          message: 'Hola, quiero informacion.',
        }),
      }),
    )
  })

  it('shows backend field errors when the API returns a 400', async () => {
    useDepartamentos.mockReturnValue({ departamentos, loading: false })
    const apiError = new Error('API error: 400')
    apiError.status = 400
    apiError.data = { email: ['Correo invalido.'] }
    apiFetch.mockRejectedValue(apiError)
    const user = userEvent.setup()
    const { getByPlaceholderText } = render(<Contact />)
    const { nombre, email, mensaje } = fillRequiredFields({ getByPlaceholderText })

    await user.type(nombre, 'Ivan')
    await user.type(email, 'invalido')
    await user.type(mensaje, 'Hola')

    const [deptSelect, asuntoSelect] = screen.getAllByRole('combobox')
    await user.selectOptions(deptSelect, '1')
    await user.selectOptions(asuntoSelect, '10')

    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(await screen.findByText('Correo invalido.')).toBeInTheDocument()
  })
})
