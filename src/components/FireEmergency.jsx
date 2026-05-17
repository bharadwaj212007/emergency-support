import { useEffect, useState } from "react"
import fireStationsicon from '../assets/fire-svgrepo-com.svg'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"
import L from "leaflet"

const fireIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/785/785116.png",
  iconSize: [40, 40],
})

function FireEmergency({ location, addToHistory }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [fireStations, setFireStations] = useState([])

  // FETCH FIRE STATIONS
  useEffect(() => {
    const fetchFireStations = async () => {
      try {
        const response = await fetch(
          "https://nominatim.openstreetmap.org/search?format=json&q=fire station in Hyderabad&limit=10"
        )

        const data = await response.json()

        setFireStations(Array.isArray(data) ? data : [])
      } catch (error) {
        console.log(error)
      }
    }

    fetchFireStations()
  }, [])

  // FIRE REQUEST
  const requestFire = () => {
    if (!name || !phone) {
      alert("Please Enter All Details")
      return
    }

    const fireRequest = {
      type: "Fire Emergency",
      name,
      phone,
      status: "Fire Engine Requested",
      location,
      time: new Date().toLocaleString(),
    }

    // STORE IN HISTORY
    if (addToHistory) {
      addToHistory(fireRequest)
    }

    // POPUP
    alert(" Fire Engine Requested Successfully 🚒")

    // CLEAR INPUTS
    setName("")
    setPhone("")
  }

  return (
    <div className="section-card">
      <h1>  <div className="location-icon-box">
        <img
          src={fireStationsicon}
          alt="location"
          className="location-image"
        />
      </div>Fire Emergency Support</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "350px",
          margin: "20px auto",
        }}
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid gray",
          }}
        />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid gray",
          }}
        />

        <button
          onClick={requestFire}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          <div>
                                   <img
                           src={fireStationsicon}
                           alt="location"
                           className="ambulance-image"
                         /> 
                         </div> Request Fire Engine
        </button>
      </div>

      {/* MAP */}
      <h1>🚒 Live Fire Engine Tracking</h1>

      <div
        style={{
          marginTop: "20px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={[17.385, 78.4867]}
          zoom={11}
          style={{
            height: "450px",
            width: "100%",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* USER LOCATION */}
          {location && (
            <Marker position={[location.lat, location.lng]}>
              <Popup>Your Current Location</Popup>
            </Marker>
          )}

          {/* FIRE STATIONS */}
          {fireStations.map((station, index) => (
            <Marker
              key={index}
              position={[
                parseFloat(station.lat),
                parseFloat(station.lon),
              ]}
              icon={fireIcon}
            >
              <Popup>
                🔥 {station.display_name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* FIRE STATION LIST */}
      <h2 style={{ marginTop: "30px" }}>
        🔥 Nearby Fire Stations
      </h2>

      {fireStations.map((station, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#f4f4f4",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>{station.display_name}</h3>

          <p>Latitude: {station.lat}</p>

          <p>Longitude: {station.lon}</p>

          <a
            href={`https://www.google.com/maps?q=${station.lat},${station.lon}`}
            target="_blank"
            rel="noreferrer"
          >
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              📍 Open in Maps
            </button>
          </a>
        </div>
      ))}
    </div>
  )
}

export default FireEmergency