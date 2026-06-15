import { useState } from "react"
import emailjs from "@emailjs/browser"
import "../styles/Contact.css"

const SERVICE_ID  = "service_bpshxh6"
const TEMPLATE_ID = "template_o2uu1om"
const PUBLIC_KEY  = "ZO1IFKOO1drMeGQ_j"

const departments = [
  {
    name: "Ventas",
    email: "ventas@galletasjuanita.com.mx",
    asuntos: [
      "Pedido al mayoreo",
      "Informacion de productos",
      "Quiero ser distribuidor",
      "Precios y catalogo",
    ],
  },
  {
    name: "Compras",
    email: "compras@galletasjuanita.com.mx",
    asuntos: [
      "Registro como proveedor",
      "Propuesta comercial",
      "Informacion para proveedores",
    ],
  },
  {
    name: "Talento Humano",
    email: "gestiondetalento@galletasjuanita.com.mx",
    asuntos: [
      "Postulacion a vacante",
      "Practicas profesionales",
      "Servicio social",
      "Consulta sobre proceso de seleccion",
    ],
  },
  {
    name: "Ventas en linea",
    email: "supervisiondigital@galletasjuanita.com.mx",
    asuntos: [
      "Problema con mi pedido",
      "Cambio o devolucion",
      "Seguimiento de envio",
      "Metodo de pago",
    ],
  },
]

function Contact() {
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", ciudad: "",
    departamento: "", asunto: "", mensaje: ""
  })
  const [status, setStatus] = useState("")

  const selectedDept = departments.find((d) => d.name === form.departamento)
  const asuntos      = selectedDept ? selectedDept.asuntos : []
  const toEmail      = selectedDept ? selectedDept.email : ""

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "departamento") {
      setForm({ ...form, departamento: value, asunto: "" })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.departamento || !form.asunto || !form.mensaje) {
      setStatus("error")
      return
    }
    setStatus("sending")
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email:     toEmail,
        nombre:       form.nombre,
        email:        form.email,
        telefono:     form.telefono || "No proporcionado",
        ciudad:       form.ciudad   || "No proporcionada",
        departamento: form.departamento,
        asunto:       form.asunto,
        mensaje:      form.mensaje,
      }, PUBLIC_KEY)
      setStatus("success")
      setForm({ nombre: "", email: "", telefono: "", ciudad: "", departamento: "", asunto: "", mensaje: "" })
    } catch {
      setStatus("failed")
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

          {selectedDept && (
            <div className="contact-dept-badge">
              <span className="contact-icon">🏢</span>
              <div>
                <p className="contact-dept-label">Tu mensaje ira a</p>
                <p className="contact-dept-name">{selectedDept.name}</p>
                <p className="contact-dept-email">{selectedDept.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="contact-form">
          <div className="contact-row">
            <input type="text"  name="nombre"   placeholder="Nombre completo *"    className="contact-input" value={form.nombre}   onChange={handleChange} />
            <input type="email" name="email"    placeholder="Correo electronico *" className="contact-input" value={form.email}    onChange={handleChange} />
          </div>
          <div className="contact-row">
            <input type="tel"  name="telefono" placeholder="Telefono"              className="contact-input" value={form.telefono} onChange={handleChange} />
            <input type="text" name="ciudad"   placeholder="Ciudad"                className="contact-input" value={form.ciudad}   onChange={handleChange} />
          </div>

          <div className="contact-select-group">
            <select name="departamento" className="contact-select" value={form.departamento} onChange={handleChange}>
              <option value="">Selecciona un departamento *</option>
              {departments.map((d) => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>

            <select name="asunto" className="contact-select" value={form.asunto} onChange={handleChange} disabled={!form.departamento}>
              <option value="">Selecciona un asunto *</option>
              {asuntos.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <textarea name="mensaje" placeholder="Mensaje *" className="contact-textarea" rows={5} value={form.mensaje} onChange={handleChange} />

          {status === "success" && <p className="contact-msg success">Mensaje enviado correctamente a {selectedDept?.name}!</p>}
          {status === "error"   && <p className="contact-msg error">Por favor llena todos los campos requeridos (*).</p>}
          {status === "failed"  && <p className="contact-msg error">Hubo un error al enviar. Intentalo de nuevo.</p>}
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
