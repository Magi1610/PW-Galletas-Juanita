import { useState, useEffect } from "react"
import { apiFetch } from "../services/api"
import "../styles/Faq.css"

function Faq() {
  const [faqs,    setFaqs]    = useState([])
  const [loading, setLoading] = useState(true)
  const [openId,  setOpenId]  = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch("/api/faqs/")
        setFaqs(data.results ?? data)
      } catch {
        // se queda vacío, la sección no se muestra
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section id="faq" className="faq">
      <div className="faq-header">
        <span className="faq-label">FAQ</span>
        <h2 className="faq-title">Preguntas frecuentes</h2>
        <div className="faq-underline"></div>
      </div>

      <div className="faq-list">
        {loading ? (
          <div className="faq-loading">
            <div className="faq-spinner"></div>
          </div>
        ) : (
          faqs.map((faq) => (
            <div key={faq.id} className={"faq-item" + (openId === faq.id ? " open" : "")}>
              <button className="faq-question" onClick={() => toggle(faq.id)}>
                <span>{faq.pregunta}</span>
                <span className="faq-icon">{openId === faq.id ? "-" : "+"}</span>
              </button>
              {openId === faq.id && (
                <div className="faq-answer">
                  <p>{faq.respuesta}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Faq
