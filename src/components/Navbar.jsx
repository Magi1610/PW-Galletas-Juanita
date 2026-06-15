import { useLocation, useNavigate, Link } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/images/logo.png'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleScroll = (sectionId) => {
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
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Galletas Juanita" className="navbar-logo-img" />
        </Link>
      </div>


      <ul className="navbar-links">
        <li><button className="navbar-link-btn" onClick={() => handleScroll('inicio')}>Inicio</button></li>
        <li><button className="navbar-link-btn" onClick={() => handleScroll('nosotros')}>Nosotros</button></li>
        <li><Link to="/productos" className="navbar-link-btn">Productos</Link></li>
        <li><button className="navbar-link-btn" onClick={() => handleScroll('galeria')}>Galería</button></li>
        <li><button className="navbar-link-btn" onClick={() => handleScroll('faq')}>FAQ</button></li>
        <li><button className="navbar-link-btn" onClick={() => handleScroll('aliados')}>Clientes</button></li>
      </ul>

      <button className="navbar-cta" onClick={() => handleScroll('contacto')}>
        Contáctanos
      </button>

    </nav>
  )
}

export default Navbar