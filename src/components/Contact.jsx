import { useState } from "react"
import { apiFetch } from "../services/api"
import { useDepartamentos } from "../hooks/useDepartamentos"
import "../styles/Contact.css"

function Contact() {
  const { departamentos, loading } = useDepartamentos()

  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", ciudad: "",
    departamento_id: "", asunto: "", mensaje: ""
  })
  const [status, setStatus] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const selectedDept  = departamentos.find((d) => String(d.id) === form.departamento_id)
  const asuntos       = selectedDept ? selectedDept.subjects : []

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "departamento_id") {
      setForm({ ...form, departamento_id: value, asunto: "" })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.departamento_id || !form.asunto || !form.mensaje) {
      setStatus("error")
      return
    }
    setStatus("sending")
    setFieldErrors({})
    try {
      await apiFetch(`/api/departments/${form.departamento_id}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.nombre,
          email:   form.email,
          phone:   form.telefono,
          city:    form.ciudad,
          subject: Number(form.asunto),
          message: form.mensaje,
        }),
      })
      setStatus("success")
      setForm({ nombre: "", email: "", telefono: "", ciudad: "", departamento_id: "", asunto: "", mensaje: "" })
    } catch (e) {
      if (e.status === 400 && e.data) {
        setFieldErrors(e.data)
        setStatus("validation")
      } else if (e.status === 503) {
        setStatus("unavailable")
      } else {
        setStatus("failed")
      }
    }
  }

  return (
    <section id="contacto" className="contact">
      <div className="contact-header">
        <span className="contact-label">CONTACTO</span>
        <h2 className="contact-title">Estamos para servirte</h2>
        <div className="contact-underline"></div>
      </div>

      <div className="contact-body">

        <div className="contact-info">
          <h3>Informacion de contacto</h3>
          <div className="contact-info-item">
            <span className="contact-icon">📍</span>
            <p>Galletas Juanita<br />Calle Maestros 10, San Pedro Atzompa<br />Tecamac, 55770, Mexico</p>
          </div>
          <div className="contact-info-item">
            <span className="contact-icon">📞</span>
            <p>55-90-74-88-44</p>
          </div>
          <div className="contact-info-item">
            <span className="contact-icon">✉️</span>
            <p>contacto@galletasjuanita.com</p>
          </div>

          {selectedDept && (
            <div className="contact-dept-badge">
              <span className="contact-icon">🏢</span>
              <div>
                <p className="contact-dept-label">Tu mensaje ira a</p>
                <p className="contact-dept-name">{selectedDept.name}</p>
              </div>
            </div>
          )}
        </div>

        <div className="contact-form">
          <div className="contact-row">
            <input type="text"  name="nombre"  placeholder="Nombre completo *"    className="contact-input" value={form.nombre}  onChange={handleChange} />
            <input type="email" name="email"   placeholder="Correo electronico *" className="contact-input" value={form.email}   onChange={handleChange} />
          </div>
          <div className="contact-row">
            <input type="tel"  name="telefono" placeholder="Telefono"             className="contact-input" value={form.telefono} onChange={handleChange} />
            <input type="text" name="ciudad"   placeholder="Ciudad"               className="contact-input" value={form.ciudad}   onChange={handleChange} />
          </div>

          <div className="contact-select-group">
            {loading ? (
              <p className="contact-loading-text">Cargando departamentos...</p>
            ) : (
              <>
                <select name="departamento_id" className="contact-select" value={form.departamento_id} onChange={handleChange}>
                  <option value="">Selecciona un departamento *</option>
                  {departamentos.map((d) => (
                    <option key={d.id} value={String(d.id)}>{d.name}</option>
                  ))}
                </select>

                <select name="asunto" className="contact-select" value={form.asunto} onChange={handleChange} disabled={!form.departamento_id}>
                  <option value="">Selecciona un asunto *</option>
                  {asuntos.map((a) => (
                    <option key={a.id} value={String(a.id)}>{a.label}</option>
                  ))}
                </select>
              </>
            )}
          </div>

          <textarea name="mensaje" placeholder="Mensaje *" className="contact-textarea" rows={5} value={form.mensaje} onChange={handleChange} />

          {status === "success"     && <p className="contact-msg success">Mensaje enviado correctamente</p>}
          {status === "error"       && <p className="contact-msg error">Por favor llena todos los campos requeridos (*).</p>}
          {status === "validation"  && (
            <p className="contact-msg error">
              {Object.values(fieldErrors).flat().join(" ")}
            </p>
          )}
          {status === "unavailable" && <p className="contact-msg error">Este departamento no tiene un correo de destino configurado. Intenta con otro departamento o mas tarde.</p>}
          {status === "failed"      && <p className="contact-msg error">Hubo un error al enviar. Intentalo de nuevo.</p>}
          {status === "sending"     && <p className="contact-msg sending">Enviando...</p>}

          <button className="contact-btn" onClick={handleSubmit} disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>

        <div className="contact-map">
          <h3>Encuentranos</h3>
          <iframe
            title="Ubicacion Galletas Juanita"
            className="contact-map-iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.5!2d-98.9167!3d19.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f3b3b3b3b3b3%3A0x0!2sCalle+Maestros+10%2C+San+Pedro+Atzompa%2C+Tecamac!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
            allowFullScreen=""
            loading="lazy"
          />
        </div>

      </div>
    </section>
  )
}

export default Contact
