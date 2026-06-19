import { Link } from 'react-router-dom'
import '../styles/Footer.css'
import { useGallery } from '../hooks/useGallery'

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
            Galletas crujientes, recetas tradicionales e ingredientes de calidad
            para acompañar tus mejores momentos.
          </p>
        </div>

        {/* Navegación */}
        <div className="footer-nav">
          <h4 className="footer-nav-title">NAVEGACIÓN</h4>
          <ul>
            <li><Link to="/#inicio">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            {hasGallery && <li><Link to="/#galeria">Galería</Link></li>}
            <li><Link to="/#faq">FAQ</Link></li>
            <li><Link to="/#contacto">Contacto</Link></li>
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