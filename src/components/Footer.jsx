import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-body">

        {/* Logo y descripción */}
        <div className="footer-brand">
          <h2 className="footer-logo">Galletas Juanita</h2>
          <p className="footer-desc">
            Galletas crujientes, recetas tradicionales e ingredientes de calidad
            para acompañar tus mejores momentos.
          </p>
        </div>

        {/* Navegación */}
        <div className="footer-nav">
          <h4 className="footer-nav-title">NAVEGACIÓN</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#galeria">Galería</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          <h4 className="footer-nav-title">SÍGUENOS</h4>
          <div className="footer-social-icons">
            <a href="#" className="footer-social-btn" aria-label="Facebook">f</a>
            <a href="#" className="footer-social-btn" aria-label="Instagram">in</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2024 Galletas Juanita. Todos los derechos reservados.</p>
      </div>

    </footer>
  )
}

export default Footer