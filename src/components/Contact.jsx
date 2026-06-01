import { useState } from "react"
import emailjs from "@emailjs/browser"
import "../styles/Contact.css"

const SERVICE_ID  = "service_bpshxh6"
const TEMPLATE_ID = "template_o2uu1om"
const PUBLIC_KEY  = "ZO1IFKOO1drMeGQ_j"

function Contact() {
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", ciudad: "", asunto: "", mensaje: ""
  })
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.asunto || !form.mensaje) {
      setStatus("error")
      return
    }
    setStatus("sending")
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        nombre:   form.nombre,
        email:    form.email,
        telefono: form.telefono,
        ciudad:   form.ciudad,
        asunto:   form.asunto,
        mensaje:  form.mensaje,
      }, PUBLIC_KEY)
      setStatus("success")
      setForm({ nombre: "", email: "", telefono: "", ciudad: "", asunto: "", mensaje: "" })
    } catch {
      setStatus("error")
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
            <p>55-90-74-86-44</p>
          </div>
          <div className="contact-info-item">
            <span className="contact-icon">✉️</span>
            <p>contacto@galletasjuanita.com</p>
          </div>
        </div>

        <div className="contact-form">
          <div className="contact-row">
            <input type="text"  name="nombre"   placeholder="Nombre completo *"   className="contact-input" value={form.nombre}   onChange={handleChange} />
            <input type="email" name="email"    placeholder="Correo electronico *" className="contact-input" value={form.email}    onChange={handleChange} />
          </div>
          <div className="contact-row">
            <input type="tel"  name="telefono" placeholder="Telefono"             className="contact-input" value={form.telefono} onChange={handleChange} />
            <input type="text" name="ciudad"   placeholder="Ciudad"               className="contact-input" value={form.ciudad}   onChange={handleChange} />
          </div>
          <input type="text" name="asunto" placeholder="Asunto *" className="contact-input" value={form.asunto} onChange={handleChange} />
          <textarea name="mensaje" placeholder="Mensaje *" className="contact-textarea" rows={5} value={form.mensaje} onChange={handleChange} />

          {status === "success" && <p className="contact-msg success">Mensaje enviado correctamente!</p>}
          {status === "error"   && <p className="contact-msg error">Por favor llena los campos requeridos (*).</p>}
          {status === "sending" && <p className="contact-msg sending">Enviando...</p>}

          <button className="contact-btn" onClick={handleSubmit} disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>

        <div className="contact-map">
          <h3>Encuentranos</h3>
          <iframe
            title="Ubicacion Galletas Juanita"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.5!2d-98.9167!3d19.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f3b3b3b3b3b3%3A0x0!2sCalle+Maestros+10%2C+San+Pedro+Atzompa%2C+Tecamac!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
            width="100%"
            height="260"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
