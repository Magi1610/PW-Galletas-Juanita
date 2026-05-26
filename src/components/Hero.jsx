import '../styles/Hero.css'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <div className="hero-badge">⭐ Tradición desde 1990</div>
        <h1 className="hero-title">
          El sabor <br /> de siempre, <br /> hecho con amor
        </h1>
        <p className="hero-subtitle">
          Galletas crujientes, recetas tradicionales e ingredientes de calidad
          para acompañar tus mejores momentos.
        </p>
        <div className="hero-buttons">
          <a href="#productos" className="hero-btn">
            Conoce nuestros productos →
          </a>
          <a href="#contacto" className="hero-btn-outline">
            Contáctanos
          </a>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=80"
          alt="Galletas Juanita"
        />
      </div>
    </section>
  )
}

export default Hero