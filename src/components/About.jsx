import '../styles/About.css'

function About() {
  return (
    <section id="nosotros" className="about">

      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=700&q=80"
          alt="Ingredientes naturales"
        />
      </div>

      <div className="about-content">
        <span className="about-label">NOSOTROS</span>
        <h2 className="about-title">Tradición que nos distingue</h2>
        <div className="about-underline"></div>
        <p className="about-text">
          En Galletas Juanita elaboramos cada galleta con recetas tradicionales
          que han acompañado a generaciones. Nos enfocamos en la calidad, el
          sabor y la confianza de nuestros clientes.
        </p>
        <a href="#contacto" className="about-btn">
          Conócenos más →
        </a>
      </div>

    </section>
  )
}

export default About