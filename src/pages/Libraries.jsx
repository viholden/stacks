import Map from '../components/Map'
import LibraryCard from '../components/LibraryCard'
import { libraries } from '../data/mockData'
import '../styles/Libraries.css'

function Libraries() {
  // Center of San Francisco for the map
  const sfCenter = [37.7749, -122.4194]

  return (
    <div className="libraries-page">
      <div className="libraries-page-header">
        <h1>Library Locations</h1>
        <p className="page-subtitle">
          Explore all {libraries.length} library branches in the San Francisco area
        </p>
      </div>

      <section className="libraries-map-section">
        <h2>Interactive Map</h2>
        <p className="map-description">
          Click on any marker to see library details and browse available items
        </p>
        <Map 
          libraries={libraries}
          center={sfCenter}
          zoom={12}
          height="500px"
        />
      </section>

      <section className="libraries-list-section">
        <h2>All Libraries</h2>
        <div className="libraries-list-grid">
          {libraries.map(library => (
            <LibraryCard key={library.id} library={library} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Libraries
