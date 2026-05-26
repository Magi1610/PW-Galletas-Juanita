import '../styles/Contact.css'

function Contact() {
  return (
    <section id="contacto" className="contact">

      <div className="contact-header">
        <span className="contact-label">CONTACTO</span>
        <h2 className="contact-title">Estamos para servirte</h2>
        <div className="contact-underline"></div>
      </div>

      <div className="contact-body">

        {/* Info */}
        <div className="contact-info">
          <h3>Información de contacto</h3>

          <div className="contact-info-item">
            <span className="contact-icon">📍</span>
            <p>Galletas Juanita<br />Calle Maestros 10, San Pedro Atzompa<br />Tecámac, 55770, México</p>
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

        {/* Formulario */}
        <div className="contact-form">
          <input
            type="text"
            placeholder="Nombre completo"
            className="contact-input"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="contact-input"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            className="contact-input"
          />
          <textarea
            placeholder="Mensaje"
            className="contact-textarea"
            rows={5}
          />
          <button className="contact-btn">
            Enviar mensaje →
          </button>
        </div>

        {/* Mapa */}
        <div className="contact-map">
          <h3>Encuéntranos</h3>
          <iframe
            title="Ubicación Galletas Juanita"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.5!2d-98.9167!3d19.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f3b3b3b3b3b3%3A0x0!2sCalle+Maestros+10%2C+San+Pedro+Atzompa%2C+Tec%C3%A1mac!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
            width="100%"
            height="260"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>

      </div>

    </section>
  )
}

export default Contact