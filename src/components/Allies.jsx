import "../styles/Allies.css"
import logoGuna from "../assets/images/guna.png"
import logoHS from "../assets/images/hs-comercial.png"
import logoSaredy from "../assets/images/saredy.jpg"
import logoCravioto from "../assets/images/cravioto.png"
import logoGaris from "../assets/images/garis.jpg"

const allies = [
  { id: 1, name: "Guna",            url: "https://guna.com.mx/",                                  logo: logoGuna },
  { id: 2, name: "HS Comercial",    url: "https://hscomercial.mx/",                               logo: logoHS },
  { id: 3, name: "Grupo Saredy",    url: "https://gruposaredy.com/",                              logo: logoSaredy },
  { id: 4, name: "Dulces Cravioto", url: "https://www.facebook.com/DulcesCraviotoOficial/",      logo: logoCravioto },
  { id: 5, name: "Garis",           url: "https://www.garis.com.mx/home/inicio.html",            logo: logoGaris },
]

const alliesDup = [...allies, ...allies]

function Allies() {
  return (
    <section id="aliados" className="allies">
      <div className="allies-header">
        <span className="allies-label">ALIADOS COMERCIALES</span>
        <h2 className="allies-title">Donde encontrarnos</h2>
        <div className="allies-underline"></div>
        <p className="allies-subtitle">
          Encuentra nuestras galletas con nuestros socios comerciales de confianza.
        </p>
      </div>
      <div className="allies-marquee-wrapper">
        <div className="allies-marquee">
          {alliesDup.map((ally, i) => (
            <a key={i} href={ally.url} target="_blank" rel="noopener noreferrer" className="ally-item">
              <div className="ally-logo-wrapper">
                <img src={ally.logo} alt={ally.name} className="ally-logo" />
              </div>
              <span className="ally-name">{ally.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Allies
