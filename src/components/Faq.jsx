import { useState } from 'react'
import '../styles/Faq.css'

const faqs = [
  {
    id: 1,
    question: '¿Qué tipo de ingredientes utilizan en sus galletas?',
    answer:
      'Utilizamos ingredientes 100% naturales: harina de trigo, mantequilla real, azúcar, huevos frescos y saborizantes naturales. Sin colorantes artificiales.',
  },
  {
    id: 2,
    question: '¿Sus galletas contienen conservadores?',
    answer:
      'No, nuestras galletas son completamente artesanales y libres de conservadores. Por eso tienen una frescura y sabor únicos.',
  },
  {
    id: 3,
    question: '¿Hacen envíos a domicilio?',
    answer:
      'Sí, realizamos envíos a domicilio dentro de la zona metropolitana. Contáctanos por WhatsApp para coordinar tu pedido.',
  },
  {
    id: 4,
    question: '¿Puedo hacer pedidos grandes para eventos o empresas?',
    answer:
      'Por supuesto. Contamos con paquetes especiales para eventos, bodas, cumpleaños y pedidos corporativos. Contáctanos con anticipación.',
  },
  {
    id: 5,
    question: '¿Cómo puedo realizar un pedido?',
    answer:
      'Puedes contactarnos directamente por WhatsApp, llamada telefónica o a través del formulario de contacto en esta página.',
  },
]

function Faq() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="faq">

      <div className="faq-header">
        <span className="faq-label">FAQ</span>
        <h2 className="faq-title">Preguntas frecuentes</h2>
        <div className="faq-underline"></div>
      </div>

      <div className="faq-list">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`faq-item ${openId === faq.id ? 'open' : ''}`}
          >
            <button className="faq-question" onClick={() => toggle(faq.id)}>
              <span>{faq.question}</span>
              <span className="faq-icon">{openId === faq.id ? '−' : '+'}</span>
            </button>
            {openId === faq.id && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  )
}

export default Faq