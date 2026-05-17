import { useEffect, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"
import Disastericon from '../assets/warning-filled-svgrepo-com.svg'
import "leaflet/dist/leaflet.css"

function DisasterSupport({
  location,
  addToHistory,
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] =
    useState("")

  const [centers, setCenters] =
    useState([])

  // FETCH DYNAMIC RELIEF CENTERS
  useEffect(() => {
    const fetchCenters =
      async () => {
        try {
          const response =
            await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=government hospital Hyderabad&limit=10`
            )

          const data =
            await response.json()

          console.log(data)

          setCenters(
            Array.isArray(data)
              ? data
              : []
          )
        } catch (error) {
          console.log(error)
        }
      }

    fetchCenters()
  }, [])

  // REQUEST DISASTER HELP
  const requestDisasterHelp =
    () => {
      if (
        name === "" ||
        phone === ""
      ) {
        alert(
          "Please Enter All Details"
        )
        return
      }

      const disasterRequest = {
        type: "Disaster Rescue",
        name,
        phone,
        status:
          "Rescue Team Requested",
        time: new Date().toLocaleString(),
      }

      // STORE IN HISTORY
      if (addToHistory) {
        addToHistory(
          disasterRequest
        )
      }

      // POPUP
      alert(
        "🌪 Rescue Team Requested Successfully 🚑"
      )

      // CLEAR INPUTS
      setName("")
      setPhone("")
    }

  return (
    <div className="section-card">
      <h1>
         <div className="location-icon-box">
            <img
              src={Disastericon}
              alt="location"
              className="location-image"
            />
          </div> Natural Disaster
        Support
      </h1>

      <p>
        Emergency support
        during floods,
        earthquakes,
        cyclones, and
        disasters.
      </p>

      {/* INPUTS */}
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            width: "300px",
            marginBottom:
              "15px",
            borderRadius:
              "10px",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            width: "300px",
            marginBottom:
              "20px",
            borderRadius:
              "10px",
          }}
        />

        <br />

        <button
          onClick={
            requestDisasterHelp
          }
          style={{
            background:
              "orange",
            color: "white",
            border: "none",
            padding:
              "14px 30px",
            borderRadius:
              "10px",
            fontSize: "18px",
            cursor:
              "pointer",
          }}
        >
          <div className="location-icon-box">
            <img
              src={Disastericon}
              alt="location"
              className="location-image"
            />
          </div> Request Rescue
        </button>
      </div>

  
      <h2
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >
       <div className="location-icon-box">
         <img
           src={Disastericon}
           alt="location"
           className="location-image"
         />
       </div> Live Disaster
        Tracking
      </h2>

      <MapContainer
        center={[
          17.385,
          78.4867,
        ]}
        zoom={11}
        style={{
          height: "400px",
          width: "100%",
          borderRadius:
            "20px",
          marginTop: "20px",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* USER LOCATION */}
        {location && (
          <Marker
            position={[
              location.lat,
              location.lng,
            ]}
          >
            <Popup>
              Your Current
              Location
            </Popup>
          </Marker>
        )}

        {/* RELIEF CENTERS */}
        {centers.map(
          (
            center,
            index
          ) => (
            <Marker
              key={index}
              position={[
                parseFloat(
                  center.lat
                ),
                parseFloat(
                  center.lon
                ),
              ]}
            >
              <Popup>
                {
                  center.display_name
                }
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>

      {/* CENTER LIST */}
      <h2
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        🏕 Nearby Relief
        Centers
      </h2>

      {centers.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Loading nearby relief
          centers...
        </p>
      ) : (
        centers.map(
          (
            center,
            index
          ) => (
            <div
              key={index}
              style={{
                background:
                  "#f4f4f4",
                padding: "20px",
                marginTop:
                  "20px",
                borderRadius:
                  "15px",
              }}
            >
              <h3>
                {
                  center.display_name
                }
              </h3>

              <p>
                Latitude:{" "}
                {center.lat}
              </p>

              <p>
                Longitude:{" "}
                {center.lon}
              </p>

              <a
                href={`https://www.google.com/maps?q=${center.lat},${center.lon}`}
                target="_blank"
                rel="noreferrer"
              >
                <button
                  style={{
                    background:
                      "orange",
                    color:
                      "white",
                    padding:
                      "10px 20px",
                    border:
                      "none",
                    borderRadius:
                      "10px",
                    cursor:
                      "pointer",
                  }}
                >
                  📍 Open Location
                </button>
              </a>
            </div>
          )
        )
      )}
    </div>
  )
}

export default DisasterSupport