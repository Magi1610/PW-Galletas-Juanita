import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/images/logo.png'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  const handleScroll = (sectionId) => {
    close()
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Galletas Juanita" className="navbar-logo-img" />
          </Link>
        </div>

        <ul className="navbar-links">
          <li><button className="navbar-link-btn" onClick={() => handleScroll('inicio')}>Inicio</button></li>
          <li><Link to="/nosotros" className="navbar-link-btn">Nosotros</Link></li>
          <li><Link to="/productos" className="navbar-link-btn">Productos</Link></li>
          <li><button className="navbar-link-btn" onClick={() => handleScroll('galeria')}>Galería</button></li>
          <li><button className="navbar-link-btn" onClick={() => handleScroll('faq')}>FAQ</button></li>
          <li><button className="navbar-link-btn" onClick={() => handleScroll('aliados')}>Clientes</button></li>
        </ul>

        <button className="navbar-cta" onClick={() => handleScroll('contacto')}>
          Contáctanos
        </button>


        <button className="navbar-hamburger" onClick={() => setIsOpen(true)} aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {isOpen && <div className="navbar-overlay" onClick={close} />}

      <div className={`navbar-drawer${isOpen ? ' open' : ''}`}>
        <button className="navbar-drawer-close" onClick={close} aria-label="Cerrar menú">✕</button>

        <div className="navbar-drawer-logo">
          <Link to="/" onClick={close}>
            <img src={logo} alt="Galletas Juanita" className="navbar-drawer-logo-img" />
          </Link>
        </div>

        <ul className="navbar-drawer-links">
          <li><button onClick={() => handleScroll('inicio')}>Inicio</button></li>
          <li><Link to="/nosotros" onClick={close}>Nosotros</Link></li>
          <li><Link to="/productos" onClick={close}>Productos</Link></li>
          <li><button onClick={() => handleScroll('galeria')}>Galería</button></li>
          <li><button onClick={() => handleScroll('faq')}>FAQ</button></li>
          <li><button onClick={() => handleScroll('aliados')}>Clientes</button></li>
        </ul>

        <button className="navbar-drawer-cta" onClick={() => handleScroll('contacto')}>
          Contáctanos
        </button>
      </div>
    </>
  )
}

export default Navbar
