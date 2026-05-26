import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <span className="navbar-logo-icon">🍪</span>
        <h1>Galletas Juanita</h1>
      </div>

      <ul className="navbar-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#galeria">Galería</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>

      <a href="#contacto" className="navbar-cta">Contáctanos</a>

    </nav>
  )
}

export default Navbar