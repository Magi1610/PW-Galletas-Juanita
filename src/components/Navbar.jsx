import '../styles/Navbar.css'
import logo from '../assets/images/logo.png'

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <img src={logo} alt="Galletas Juanita" className="navbar-logo-img" />
      </div>

      <ul className="navbar-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#galeria">Galería</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#aliados">Clientes</a></li>
      </ul>

      <a href="#contacto" className="navbar-cta">Contáctanos</a>

    </nav>
  )
}

export default Navbar