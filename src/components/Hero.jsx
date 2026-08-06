import '../styles/Hero.css'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import fondoSurtido from '../assets/images/fondo_surtido.jpg'

function IconWheat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21V10" strokeLinecap="round" />
      <path
        d="M12 10c0-2 1.5-3 3-3M12 10c0-2-1.5-3-3-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14c0-2 1.5-3 3-3M12 14c0-2-1.5-3-3-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7c0-2 1.5-3 3-3M12 7c0-2-1.5-3-3-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  )
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <img className="hero-bg-image" src={fondoSurtido} alt="" aria-hidden="true" />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-line"></span>
          Desde 1985
        </div>
        <h1 className="hero-title">
          Pruebe lo nuestro,{' '}
          <span className="hero-animated-text">
            <TypeAnimation
              sequence={[
                'hecho con amor ',
                2000,
                'hecho con tradición ',
                2000,
                'hecho con calidad ',
                2000,
                'hecho para ti ',
                2000,
              ]}
              repeat={Infinity}
              speed={40}
            />
          </span>
        </h1>
        <p className="hero-subtitle">
          Galletas hechas con recetas caseras, ingredientes de calidad y el cariño de siempre.
        </p>
        <div className="hero-buttons">
          <Link to="/productos" className="hero-btn">
            Conoce nuestros productos →
          </Link>
          <a
            href="https://listado.mercadolibre.com.mx/pagina/8x13vdgz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-ml"
          >
            Comprar en Mercado Libre
          </a>
        </div>

        <div className="hero-trust-row">
          <div className="hero-trust-item">
            <span className="hero-trust-icon">
              <IconWheat />
            </span>
            <span className="hero-trust-label">
              Recetas
              <br />
              tradicionales
            </span>
          </div>
          <div className="hero-trust-item">
            <span className="hero-trust-icon">
              <IconHeart />
            </span>
            <span className="hero-trust-label">
              Ingredientes
              <br />
              de calidad
            </span>
          </div>
          <div className="hero-trust-item">
            <span className="hero-trust-icon">
              <IconPin />
            </span>
            <span className="hero-trust-label">
              Hecho en
              <br />
              México
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
