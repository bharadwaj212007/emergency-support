import { useEffect, useState } from 'react'

function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [selectedHospital, setSelectedHospital] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=hospital&limit=5&viewbox=${lon - 0.1},${lat + 0.1},${lon + 0.1},${lat - 0.1}`
        )

        const data = await response.json()
        setHospitals(data)
      },
      error => {
        console.log(error)
      }
    )
  }, [])

  return (
    <div
      style={{
        background: '#f8fafc',
        padding: '30px',
        borderRadius: '20px',
        marginTop: '30px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '30px',
        }}
      >
        Nearby Hospitals
      </h1>

      {hospitals.map((hospital, index) => (
        <div
          key={index}
          style={{
            background: '#e2e8f0',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          <h2>{hospital.display_name}</h2>

          <p>
            <strong>Latitude:</strong> {hospital.lat}
          </p>

          <p>
            <strong>Longitude:</strong> {hospital.lon}
          </p>

          <button
            onClick={() =>
              setSelectedHospital(hospital)
            }
            style={{
              marginTop: '10px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            View Hospital Location 📍
          </button>
        </div>
      ))}

      {selectedHospital && (
        <div
          style={{
            marginTop: '40px',
            background: '#e2e8f0',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            📍 Hospital Location
          </h2>

          <iframe
            title="hospital-location"
            width="100%"
            height="400"
            style={{
              border: 0,
              borderRadius: '20px',
            }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${selectedHospital.lat},${selectedHospital.lon}&z=15&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default Hospitals