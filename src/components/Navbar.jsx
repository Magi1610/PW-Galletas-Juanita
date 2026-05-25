function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Galletas Juanita</h1>
      </div>

      <ul className="nav-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#galeria">Galería</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;