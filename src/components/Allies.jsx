import "../styles/Allies.css"

const allies = [
  { id: 1, name: "Guna", emoji: "🏢", url: "https://guna.com.mx/" },
  { id: 2, name: "HS Comercial", emoji: "🏪", url: "https://hscomercial.mx/" },
  { id: 3, name: "Grupo Saredy", emoji: "🛒", url: "https://gruposaredy.com/" },
  { id: 4, name: "Dulces Cravioto", emoji: "🍬", url: "https://www.facebook.com/DulcesCraviotoOficial/" },
  { id: 5, name: "Garis", emoji: "🏬", url: "https://www.garis.com.mx/home/inicio.html" },
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
              <span className="ally-emoji">{ally.emoji}</span>
              <span className="ally-name">{ally.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Allies
