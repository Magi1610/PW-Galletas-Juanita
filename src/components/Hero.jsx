import '../styles/Hero.css'
import { TypeAnimation } from 'react-type-animation'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <div className="hero-badge">Tradición desde 1990</div>
        <h1 className="hero-title">
          Pruebe lo nuestro,{' '}
          <span className="hero-animated-text">
            <TypeAnimation
              sequence={[
                'hecho con amor ', 2000,
                'hecho con tradición ', 2000,
                'hecho con calidad ', 2000,
                'hecho para ti ', 2000,
              ]}
              repeat={Infinity}
              speed={40}
            />
          </span>
        </h1>
        <p className="hero-subtitle">
          Galletas crujientes, recetas tradicionales e ingredientes de calidad
          para acompañar tus mejores momentos.
        </p>
        <div className="hero-buttons">
          <a href="#productos" className="hero-btn">Conoce nuestros productos →</a>
          <a href="#contacto" className="hero-btn-outline">Contáctanos</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">+30</span>
            <span className="hero-stat-label">Años de experiencia</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">+50k</span>
            <span className="hero-stat-label">Clientes felices</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">5</span>
            <span className="hero-stat-label">Variedades</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-image-ring"></div>
        <img
          src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=80"
          alt="Galletas Juanita"
        />
      </div>
    </section>
  )
}

export default Hero