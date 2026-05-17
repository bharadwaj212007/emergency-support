
import { useEffect, useState } from 'react'
import ambulanceIcon from './assets/ambulance-solid-svgrepo-com.svg'
import locationIcon from './assets/location-svgrepo-com.svg'
import HospitalIcon from './assets/hospital-svgrepo-com.svg'
import BloodIcon from './assets/blood-drop-svgrepo-com.svg'
import FireIcon from './assets/blood-drop-svgrepo-com.svg'
import fireStationsicon from './assets/fire-svgrepo-com.svg'
import Disastericon from './assets/warning-filled-svgrepo-com.svg'
import histryicon from './assets/library-svgrepo-com.svg'
import PublicIcon from './assets/person-svgrepo-com.svg'
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
    <div className="main-container">
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
            <div className="location-icon-box">
  <img
    src={locationIcon}
    alt="location"
    className="location-image"
  />
</div> Location
          </button>

          <button
            className="primary-button"
            onClick={() => setActiveSection('hospitals')}
          >
            <div>
            <img
    src={HospitalIcon}
    alt="location"
    className="ambulance-image"
  /> 
  </div>
  Hospitals
          </button>

          <button
            className="primary-button"
            onClick={() => setActiveSection('ambulance')}
          >
            <div className="icon-box">
  <img
    src={ambulanceIcon}
    alt="ambulance"
    className="ambulance-image"
  />
</div>
 Ambulance
          </button>
          

<button className="primary-button" onClick={() => setActiveSection('blood')}>
  <div className="location-icon-box">
  <img
    src={BloodIcon}
    alt="Blood"
    className="location-image"
  />
</div>
   Blood Donors 
</button>

<button className="primary-button" onClick={() => setActiveSection('fire')}>
    <div className="location-icon-box">
  <img
    src={fireStationsicon}
    alt="location"
    className="location-image"
  />
</div>Fire Station
</button>

<button className="primary-button" onClick={() => setActiveSection('disaster')}>
  <div>
  <img
    src={Disastericon}
    alt="location"
    className="location-image"
  />
</div> Disaster Relief
</button>
          <button
            className="primary-button"
            onClick={() => setActiveSection('history')}
          >
            <div className="location-icon-box">
  <img
    src={histryicon}
    alt="location"
    className="location-image"
  />
</div> History
          </button>

          <button
            className="primary-button"
            onClick={() => setActiveSection('admin')}
          >
            <div>
            <img
    src={PublicIcon}
    alt="location"
    className="ambulance-image"
  /> 
  </div> Admin
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
  </div>
)
    
}

export default App
