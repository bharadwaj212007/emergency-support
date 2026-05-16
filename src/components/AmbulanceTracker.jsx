import { useEffect, useState } from 'react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

function AmbulanceTracker() {
  const [position, setPosition] =
    useState({
      lat: 17.385,
      lng: 78.4867,
    })

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => ({
        lat: prev.lat + 0.0005,
        lng: prev.lng + 0.0005,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Live Ambulance Tracking</h2>

      <MapContainer
        center={[position.lat, position.lng]}
        zoom={15}
        style={{
          height: '400px',
          width: '100%',
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[
            position.lat,
            position.lng,
          ]}
        >
          <Popup>
            Ambulance is on the way 🚑
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default AmbulanceTracker