import { useState } from "react"
import "../styles/Allies.css"

const data = {
  "Estado de Mexico": {
    "Tecamac": [
      { name: "Tienda Guna Tecamac", address: "Av. Principal 10, Tecamac" },
      { name: "HS Comercial Tecamac", address: "Calle Juarez 45, Tecamac" },
    ],
    "Ecatepec": [
      { name: "Garis Ecatepec", address: "Blvd. Los Laureles 22, Ecatepec" },
      { name: "Grupo Saredy Ecatepec", address: "Av. Central 88, Ecatepec" },
    ],
    "Zumpango": [
      { name: "Dulces Cravioto Zumpango", address: "Calle Morelos 5, Zumpango" },
    ],
  },
  "CDMX": {
    "Gustavo A. Madero": [
      { name: "Guna GAM", address: "Av. Insurgentes Norte 300, GAM" },
      { name: "HS Comercial GAM", address: "Calle Tokio 12, GAM" },
    ],
    "Iztapalapa": [
      { name: "Garis Iztapalapa", address: "Av. Ermita 150, Iztapalapa" },
    ],
    "Tlalpan": [
      { name: "Grupo Saredy Tlalpan", address: "Periferico Sur 4200, Tlalpan" },
    ],
  },
  "Hidalgo": {
    "Tizayuca": [
      { name: "Dulces Cravioto Tizayuca", address: "Calle Hidalgo 8, Tizayuca" },
      { name: "Guna Tizayuca", address: "Av. Tizayuca 55, Tizayuca" },
    ],
    "Pachuca": [
      { name: "Garis Pachuca", address: "Blvd. Felipe Angeles 100, Pachuca" },
    ],
  },
}

function Allies() {
  const [selectedState, setSelectedState]  = useState("")
  const [selectedCity,  setSelectedCity]   = useState("")

  const states = Object.keys(data)
  const cities = selectedState ? Object.keys(data[selectedState]) : []
  const stores = selectedState && selectedCity ? data[selectedState][selectedCity] : []

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
    setSelectedCity("")
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
  }

  return (
    <section id="aliados" className="allies">
      <div className="allies-header">
        <span className="allies-label">ALIADOS COMERCIALES</span>
        <h2 className="allies-title">Donde encontrarnos</h2>
        <div className="allies-underline"></div>
        <p className="allies-subtitle">
          Selecciona tu estado y municipio para encontrar el punto de venta mas cercano.
        </p>
      </div>

      <div className="allies-finder">
        <div className="allies-selects">
          <div className="allies-select-wrapper">
            <label className="allies-select-label">Estado</label>
            <select className="allies-select" value={selectedState} onChange={handleStateChange}>
              <option value="">Selecciona un estado</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="allies-select-wrapper">
            <label className="allies-select-label">Municipio</label>
            <select className="allies-select" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
              <option value="">Selecciona un municipio</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="allies-results">
          {!selectedState && (
            <div className="allies-empty">
              <span className="allies-empty-icon">🗺️</span>
              <p>Selecciona un estado para comenzar</p>
            </div>
          )}

          {selectedState && !selectedCity && (
            <div className="allies-empty">
              <span className="allies-empty-icon">📍</span>
              <p>Ahora selecciona un municipio</p>
            </div>
          )}

          {selectedCity && stores.length === 0 && (
            <div className="allies-empty">
              <span className="allies-empty-icon">😔</span>
              <p>No hay tiendas registradas en este municipio aun</p>
            </div>
          )}

          {stores.length > 0 && (
            <div className="allies-stores">
              <p className="allies-results-title">
                {stores.length} punto{stores.length > 1 ? "s" : ""} de venta en {selectedCity}
              </p>
              <div className="allies-stores-grid">
                {stores.map((store, i) => (
                  <div key={i} className="ally-store-card">
                    <span className="ally-store-icon">🏪</span>
                    <div className="ally-store-info">
                      <strong>{store.name}</strong>
                      <span>{store.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Allies
