import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function MapView({ location }) {
  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13}
      style={{
        height: '400px',
        width: '100%',
        marginTop: '30px',
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[location.lat, location.lng]}>
        <Popup>Your Current Location</Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapView