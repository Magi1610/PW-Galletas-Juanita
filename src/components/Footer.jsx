import { Link } from 'react-router-dom'
import '../styles/Footer.css'
import { useGallery } from '../hooks/useGallery'

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.917 3.777-3.917 1.094 0 2.238.196 2.238.196v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Footer() {
  const { images: galleryImages } = useGallery()
  const hasGallery = galleryImages.length > 0

  return (
    <footer className="footer">
      <div className="footer-body">
        {/* Logo y descripción */}
        <div className="footer-brand">
          <h2 className="footer-logo">Galletas Juanita</h2>
          <p className="footer-desc">
            Galletas crujientes, recetas tradicionales e ingredientes de calidad para acompañar tus
            mejores momentos.
          </p>
        </div>

        {/* Navegación */}
        <div className="footer-nav">
          <h4 className="footer-nav-title">NAVEGACIÓN</h4>
          <ul>
            <li>
              <Link to="/#inicio">Inicio</Link>
            </li>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
            {hasGallery && (
              <li>
                <Link to="/#galeria">Galería</Link>
              </li>
            )}
            <li>
              <Link to="/#faq">FAQ</Link>
            </li>
            <li>
              <Link to="/#contacto">Contacto</Link>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          <h4 className="footer-nav-title">SÍGUENOS</h4>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/gjmexico"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Facebook"
            >
              <IconFacebook />
            </a>
            <a
              href="https://www.instagram.com/galletasjuanitamexico"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
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
