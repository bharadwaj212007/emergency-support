
import { useEffect, useState } from 'react'

import './App.css'

import Login from './components/Login'
import MapView from './components/MapView'
import Hospitals from './components/Hospitals'
import AmbulanceForm from './components/AmbulanceForm'
import AmbulanceTracker from './components/AmbulanceTracker'
import RequestHistory from './components/RequestHistory'
import AdminPanel from './components/AdminPanel'
import FireEmergency from './components/FireEmergency'
import DisasterSupport from './components/DisasterSupport'
function App() {
  const [location, setLocation] =
    useState(null)

  const [darkMode, setDarkMode] =
    useState(false)

  const [isLoggedIn, setIsLoggedIn] =
    useState(false)

  const [activeSection, setActiveSection] =
    useState('location')
  
const [selectedHospital, setSelectedHospital] = useState(null)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      }
    )
  }, [])

  const handleSOS = () => {
    alert('Emergency SOS Activated')

    const audio = new Audio(
      '/audio/siren.mp3'
    )

    audio.play()
  }
  const [history, setHistory] = useState([])

const addToHistory = (item) => {
  setHistory((prev) => [...prev, item])
}

  if (!isLoggedIn) {
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
      />
    )
  }
  

  return (
  <>
    {!isLoggedIn ? (
      <div className="login-page">
        <div className="login-card">
          <h1 className="main-heading">
            🚨 Smart Emergency Support
          </h1>

          <h2 className="login-heading">
            Login / Signup
          </h2>

          <input
            type="email"
            placeholder="Enter Email"
            className="login-input"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="login-input"
          />

          <div className="login-buttons">
            <button
              className="login-btn"
              onClick={() => setIsLoggedIn(true)}
            >
              Sign Up
            </button>

            <button
              className="login-btn"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className={darkMode ? 'app-container dark' : 'app-container'}>
        <h1 className="dashboard-title">
          🚨 Smart Emergency Support
        </h1>

        <button
          className="dark-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
<button
  className="dark-btn"
  onClick={() => setIsLoggedIn(false)}
  style={{marginLeft: '10px'}}
>
  Logout
</button>
        <br />

        <button
          className="sos-button"
          onClick={handleSOS}
        >
          SOS
        </button>

        <div className="dashboard-buttons">
          <button
            className="primary-button"
            onClick={() => setActiveSection('location')}
          >
            📍 Location
          </button>

          <button
            className="primary-button"
            onClick={() => setActiveSection('hospitals')}
          >
            🏥 Hospitals
          </button>

          <button
            className="primary-button"
            onClick={() => setActiveSection('ambulance')}
          >
            🚑 Ambulance
          </button>
          

<button onClick={() => setActiveSection('blood')}>
  🩸 Blood Donors
</button>

<button onClick={() => setActiveSection('fire')}>
  🔥 Fire Station
</button>

<button onClick={() => setActiveSection('disaster')}>
  🌪 Disaster Relief
</button>
          <button
            className="primary-button"
            onClick={() => setActiveSection('history')}
          >
            📜 History
          </button>

          <button
            className="primary-button"
            onClick={() => setActiveSection('admin')}
          >
            ⚙️ Admin
          </button>
        </div>

        {activeSection === 'location' && (
          <div className="section-card">
            <h2>Your Live Location</h2>

            <p>Latitude: {location?.lat}</p>
            <p>Longitude: {location?.lng}</p>

            <MapView location={location} />
          </div>
        )}

        {activeSection === 'hospitals' && (
          <div className="section-card">
            <Hospitals location={location} />
          </div>
        )}

        {activeSection === 'ambulance' && (

          <div className="section-card">
            <AmbulanceForm location={location} />
            <AmbulanceTracker />
          </div>
        )}
        
        {activeSection === 'blood' && (
  <div
    style={{
      background: 'white',
      padding: '40px',
      borderRadius: '20px',
    }}
  >
    <h2>🩸 Blood Donors Support</h2>

    <p>Find emergency blood donors nearby.</p>

    <ul style={{ lineHeight: '2' }}>
      <li>O+ Blood Donor — 9876543210</li>
      <li>A+ Blood Donor — 9876543211</li>
      <li>B+ Blood Donor — 9876543212</li>
    </ul>
  </div>
)}
{activeSection === 'fire' && (
  <div className="section-card">
    <FireEmergency />
  </div>
)}

{activeSection === 'disaster' && (
  <div className="section-card">
    <DisasterSupport
      location={location}
      addToHistory={addToHistory}
    />
  </div>
)}

        {activeSection === 'history' && (
          <div className="section-card">
            <RequestHistory />
          </div>
        )}

        {activeSection === 'admin' && (
          <div className="section-card">
            <AdminPanel />
          </div>
        )}
      </div>
    )}
  </>
)
    
}

export default App
