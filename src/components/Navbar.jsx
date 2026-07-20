import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/images/logo.png'
import { useGallery } from '../hooks/useGallery'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { images: galleryImages } = useGallery()
  const hasGallery = galleryImages.length > 0

  const close = () => setIsOpen(false)

  const handleScroll = (sectionId, path = '/') => {
    close()
    if (location.pathname === path) {
      if (sectionId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(`${path}#${sectionId}`)
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <button
            className="navbar-logo-btn"
            onClick={() => handleScroll('inicio')}
            aria-label="Ir al inicio"
          >
            <img src={logo} alt="Galletas Juanita" className="navbar-logo-img" />
          </button>
        </div>

        <ul className="navbar-links">
          <li>
            <button className="navbar-link-btn" onClick={() => handleScroll('inicio')}>
              Inicio
            </button>
          </li>
          <li>
            <Link to="/nosotros" className="navbar-link-btn">
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/productos" className="navbar-link-btn">
              Productos
            </Link>
          </li>
          {hasGallery && (
            <li>
              <button className="navbar-link-btn" onClick={() => handleScroll('galeria')}>
                Galería
              </button>
            </li>
          )}
          <li>
            <button className="navbar-link-btn" onClick={() => handleScroll('faq')}>
              FAQ
            </button>
          </li>
          <li>
            <button
              className="navbar-link-btn"
              onClick={() => handleScroll('aliados', '/nosotros')}
            >
              Clientes
            </button>
          </li>
        </ul>

        <button className="navbar-cta" onClick={() => handleScroll('contacto')}>
          Contáctanos
        </button>

        <button
          className="navbar-hamburger"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {isOpen && <div className="navbar-overlay" onClick={close} />}

      <div className={`navbar-drawer${isOpen ? ' open' : ''}`}>
        <button className="navbar-drawer-close" onClick={close} aria-label="Cerrar menú">
          ✕
        </button>

        <div className="navbar-drawer-logo">
          <button
            className="navbar-logo-btn"
            onClick={() => handleScroll('inicio')}
            aria-label="Ir al inicio"
          >
            <img src={logo} alt="Galletas Juanita" className="navbar-drawer-logo-img" />
          </button>
        </div>

        <ul className="navbar-drawer-links">
          <li>
            <button onClick={() => handleScroll('inicio')}>Inicio</button>
          </li>
          <li>
            <Link to="/nosotros" onClick={close}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/productos" onClick={close}>
              Productos
            </Link>
          </li>
          {hasGallery && (
            <li>
              <button onClick={() => handleScroll('galeria')}>Galería</button>
            </li>
          )}
          <li>
            <button onClick={() => handleScroll('faq')}>FAQ</button>
          </li>
          <li>
            <button onClick={() => handleScroll('aliados', '/nosotros')}>Clientes</button>
          </li>
        </ul>

        <button className="navbar-drawer-cta" onClick={() => handleScroll('contacto')}>
          Contáctanos
        </button>
      </div>
    </>
  )
}

export default Navbar
