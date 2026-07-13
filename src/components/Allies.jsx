import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { apiFetch } from '../services/api'
import '../styles/Allies.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function FitBounds({ points }) {
  const map = useMap()

  useEffect(() => {
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 14)
    } else {
      map.fitBounds(
        points.map((p) => [p.lat, p.lng]),
        { padding: [40, 40] },
      )
    }
  }, [points, map])

  return null
}

function Allies() {
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetch('/api/catalog/retailers/')
        setAllData(data.results ?? data)
      } catch {
        // se queda vacío
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const states = useMemo(() => [...new Set(allData.map((t) => t.state))], [allData])

  const cities = useMemo(
    () =>
      selectedState
        ? [...new Set(allData.filter((t) => t.state === selectedState).map((t) => t.municipality))]
        : [],
    [allData, selectedState],
  )

  const stores = useMemo(
    () =>
      selectedState && selectedCity
        ? allData.filter((t) => t.state === selectedState && t.municipality === selectedCity)
        : [],
    [allData, selectedState, selectedCity],
  )

  const storeLocations = useMemo(
    () =>
      stores
        .filter((store) => store.lat != null && store.lng != null)
        .map((store) => ({ ...store, lat: Number(store.lat), lng: Number(store.lng) })),
    [stores],
  )

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
    setSelectedCity('')
  }

  return (
    <section id="aliados" className="allies">
      <div className="allies-header">
        <span className="allies-label">ALIADOS COMERCIALES</span>
        <h2 className="allies-title">Encuentra tu tienda más cercana</h2>
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
                  <option key={s} value={s}>
                    {s}
                  </option>
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
                  <option key={c} value={c}>
                    {c}
                  </option>
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
                  {stores.length} punto{stores.length > 1 ? 's' : ''} de venta en {selectedCity}
                </p>
                <div className="allies-stores-grid">
                  {stores.map((store) => {
                    const hasCoords = store.lat != null && store.lng != null
                    const logoUrl = store.logo_url ?? store.brand?.logo_url
                    const logoAlt = store.logo_url ? store.name : store.brand?.name
                    return (
                      <div key={store.id} className="ally-store-card">
                        {logoUrl ? (
                          <span className="ally-store-logo-wrap">
                            <img className="ally-store-logo" src={logoUrl} alt={logoAlt} />
                          </span>
                        ) : (
                          <span className="ally-store-icon">🏪</span>
                        )}
                        <div className="ally-store-info">
                          <strong>{store.name}</strong>
                          <span>{store.address}</span>
                          {!hasCoords && (
                            <span className="ally-store-no-location">
                              Ubicación no disponible en el mapa
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="allies-map-wrapper">
                  {storeLocations.length > 0 ? (
                    <MapContainer
                      center={[storeLocations[0].lat, storeLocations[0].lng]}
                      zoom={13}
                      scrollWheelZoom={false}
                      className="allies-map"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <FitBounds points={storeLocations} />
                      {storeLocations.map((store) => (
                        <Marker key={store.id} position={[store.lat, store.lng]}>
                          <Popup>
                            <strong>{store.name}</strong>
                            <br />
                            {store.address}
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  ) : (
                    <div className="allies-map-loading">
                      Ninguna tienda de este municipio tiene ubicación registrada aún.
                    </div>
                  )}
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
