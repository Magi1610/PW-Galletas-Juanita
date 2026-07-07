import { Link } from 'react-router-dom'
import '../styles/About.css'

function About() {
  return (
    <section id="nosotros" className="about">

      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=700&q=80"
          alt="Ingredientes naturales"
        />
      </div>

      <div className="about-content">
        <span className="about-label">NOSOTROS</span>
        <h2 className="about-title">Tradición que nos distingue</h2>
        <div className="about-underline"></div>
        <p className="about-text">
          Desde 1985 elaboramos cada galleta con las recetas tradicionales con las
          que nació Galletas Juanita. Nos enfocamos en la calidad, el sabor y la
          confianza de nuestros clientes.
        </p>
        <Link to="/nosotros" className="about-btn">
          Conócenos más →
        </Link>
      </div>

    </section>
  )
}

export default About