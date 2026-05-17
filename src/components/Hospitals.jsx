import { useEffect, useState } from 'react'

function Hospitals() {
  const [hospitals, setHospitals] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=hospital in Hyderabad&limit=10`
          )

          const data = await response.json()

          console.log(data)

          setHospitals(
            Array.isArray(data)
              ? data
              : []
          )
        } catch (error) {
          console.log(error)
        }
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

      {hospitals.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
          }}
        >
          Loading nearby hospitals...
        </p>
      ) : (
        hospitals.map((hospital, index) => (
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
            <h2>
              {hospital.display_name}
            </h2>

            <p>
              <strong>
                Latitude:
              </strong>{' '}
              {hospital.lat}
            </p>

            <p>
              <strong>
                Longitude:
              </strong>{' '}
              {hospital.lon}
            </p>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`,
                  '_blank'
                )
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
              📍 View Hospital Location
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default Hospitals