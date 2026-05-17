import { useEffect, useState } from 'react'
import L from "leaflet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faTruckMedical,
} from '@fortawesome/free-solid-svg-icons'


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
const ambulanceIcon = new L.DivIcon({
  html: `
    <div style="
      font-size:40px;
      color:red;
    ">
      🚑
    </div>
  `,
  className: '',
  iconSize: [40, 40],
})
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
          icon={ambulanceIcon}
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