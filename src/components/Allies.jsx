import { useState, useEffect } from "react"
import { supabase } from "../supabase"
import "../styles/Allies.css"

function Allies() {
  const [allData,       setAllData]       = useState([])
  const [loading,       setLoading]       = useState(true)
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity,  setSelectedCity]  = useState("")

  useEffect(() => {
    async function fetchTiendas() {
      const { data, error } = await supabase
        .from("tiendas")
        .select("*")
        .eq("activo", true)
        .order("estado")

      if (!error) setAllData(data)
      setLoading(false)
    }
    fetchTiendas()
  }, [])

  const states = [...new Set(allData.map((t) => t.estado))]
  const cities = selectedState
    ? [...new Set(allData.filter((t) => t.estado === selectedState).map((t) => t.municipio))]
    : []
  const stores = selectedState && selectedCity
    ? allData.filter((t) => t.estado === selectedState && t.municipio === selectedCity)
    : []

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
    setSelectedCity("")
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

      {loading ? (
        <div className="allies-loading">
          <div className="allies-spinner"></div>
        </div>
      ) : (
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
              <select
                className="allies-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
              >
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
                <p>No hay tiendas registradas en este municipio</p>
              </div>
            )}
            {stores.length > 0 && (
              <div className="allies-stores">
                <p className="allies-results-title">
                  {stores.length} punto{stores.length > 1 ? "s" : ""} de venta en {selectedCity}
                </p>
                <div className="allies-stores-grid">
                  {stores.map((store) => (
                    <div key={store.id} className="ally-store-card">
                      <span className="ally-store-icon">🏪</span>
                      <div className="ally-store-info">
                        <strong>{store.nombre}</strong>
                        <span>{store.direccion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Allies
