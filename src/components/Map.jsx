import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../styles/Map.css'

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

function Map({ libraries, center, zoom = 13, height = '400px', showSingleLibrary = null }) {
  // If showing single library, use its coordinates as center
  const mapCenter = showSingleLibrary 
    ? libraries.find(lib => lib.id === showSingleLibrary)?.coordinates || center
    : center

  // Filter to show only single library if specified
  const displayLibraries = showSingleLibrary
    ? libraries.filter(lib => lib.id === showSingleLibrary)
    : libraries

  return (
    <div className="map-container" style={{ height }}>
      <MapContainer 
        center={mapCenter} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {displayLibraries.map((library) => (
          <Marker key={library.id} position={library.coordinates}>
            <Popup>
              <div className="map-popup">
                <h3>{library.name}</h3>
                <p className="popup-address">
                  {library.address}<br />
                  {library.city}, {library.state} {library.zip}
                </p>
                <p className="popup-phone">{library.phone}</p>
                <div className="popup-actions">
                  <Link to={`/library/${library.id}`} className="popup-link">
                    View Library →
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
