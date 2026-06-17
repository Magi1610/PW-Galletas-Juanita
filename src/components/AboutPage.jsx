import "../styles/AboutPage.css"

function AboutPage() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <span className="about-page-label">NUESTRA HISTORIA</span>
        <h1 className="about-hero-title">Más de 35 años horneando tradición</h1>
        <div className="about-page-underline"></div>
        <p className="about-hero-text">
          Desde 1985, Galletas Juanita combina recetas familiares con ingredientes
          de calidad para llevar tradición y sabor a cada hogar.
        </p>
      </section>

      <section className="about-history">
        <div className="about-history-image">
          <img
            src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=700&q=80"
            alt="Elaboración artesanal de galletas"
          />
        </div>
        <div className="about-history-content">
          <span className="about-page-label">CÓMO EMPEZAMOS</span>
          <h2 className="about-page-title">Un sueño que nació en casa</h2>
          <div className="about-page-underline"></div>
          <p className="about-page-text">
            Todo comenzó en 1985, cuando la Sra. Juana Rangel y el Sr. Reyes Barrera
            empezaron a elaborar galletas en su domicilio particular. Lo que inició
            como un emprendimiento familiar fue creciendo gracias a la confianza de
            sus clientes y al esfuerzo de cada día.
          </p>
          <p className="about-page-text">
            Con el aumento en las ventas, los fundadores reinvirtieron en una
            instalación propia y nuevo equipo, mejorando notablemente su capacidad de
            producción. En 1992 formalizaron su marca como <strong>Galletas Juanita</strong>,
            facilitando que sus clientes la reconocieran e identificaran en el mercado.
          </p>
          <p className="about-page-text">
            Hoy, casi cuatro décadas después, seguimos elaborando cada galleta con esas
            mismas recetas tradicionales, combinándolas con prácticas modernas para
            garantizar frescura y calidad en cada pedido.
          </p>
        </div>
      </section>

      <section className="about-mv">
        <div className="about-mv-card">
          <span className="about-mv-icon">🎯</span>
          <h3 className="about-mv-title">Misión</h3>
          <p className="about-mv-text">
            Endulzar la vida de nuestra comunidad creando valor a través de productos
            que combinan sabor excepcional con accesibilidad, operando con talento
            humano de calidad, innovación y un comportamiento corporativo ejemplar
            que mejora la calidad de vida de nuestros clientes y colaboradores.
          </p>
        </div>
        <div className="about-mv-card">
          <span className="about-mv-icon">🔭</span>
          <h3 className="about-mv-title">Visión</h3>
          <p className="about-mv-text">
            Seguir creciendo nuestro negocio de alimentos, proporcionando calidad de
            vida al consumidor con productos que satisfagan sus aspiraciones de
            bienestar, nutrición y placer en cada momento compartido.
          </p>
        </div>
      </section>

      <section className="about-values">
        <span className="about-page-label">NUESTROS VALORES</span>
        <h2 className="about-page-title">Lo que nos distingue</h2>
        <div className="about-page-underline"></div>

        <div className="about-values-grid">
          <div className="about-value-card">
            <h3 className="about-value-title">Calidad</h3>
            <p className="about-value-text">
              Nos comprometemos con la excelencia en la producción de galletas,
              utilizando solo los mejores ingredientes para asegurar un sabor
              excepcional en cada bocado.
            </p>
          </div>
          <div className="about-value-card">
            <h3 className="about-value-title">Tradición</h3>
            <p className="about-value-text">
              Mantenemos las recetas heredadas desde nuestra fundación, equilibrando
              el legado familiar con la innovación culinaria.
            </p>
          </div>
          <div className="about-value-card">
            <h3 className="about-value-title">Compromiso social</h3>
            <p className="about-value-text">
              Generamos empleo local y apoyamos iniciativas comunitarias, priorizando
              ingredientes y proveedores de nuestra región.
            </p>
          </div>
        </div>
      </section>

      <section className="about-location">
        <span className="about-page-label">VISÍTANOS</span>
        <h2 className="about-page-title">Dónde encontrarnos</h2>
        <div className="about-page-underline"></div>
        <p className="about-page-text">
          Calle Maestros 10, San Pedro Atzompa, Tecámac, 55770, México
        </p>
        <p className="about-page-text">
          Tel: 55-90-74-88-44 &nbsp;·&nbsp; contacto@galletasjuanita.com
        </p>
      </section>

    </div>
  )
}

export default AboutPage
