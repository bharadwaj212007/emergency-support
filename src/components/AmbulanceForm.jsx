import { useState } from 'react'
import ambulanceIcon from "../assets/ambulance-solid-svgrepo-com.svg";
import { database } from '../firebase'

import { ref, push } from 'firebase/database'

function AmbulanceForm({ location }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const requestAmbulance = async () => {
    if (name === '' || phone === '') {
      alert('Please fill all details')
      return
    }

    try {
      const ambulanceRef = ref(
        database,
        'ambulanceRequests'
      )

      await push(ambulanceRef, {
  name: name,
  phone: phone,
  createdAt: new Date().toString(),
  status: 'Pending',

  latitude: location.lat,
  longitude: location.lng,
})

      alert('Ambulance Requested Successfully 🚑')

      setName('')
      setPhone('')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div
      style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
      }}
    >
       
        
  
      <h2>Request Ambulance</h2>

      <input
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    padding: '10px',
    width: '250px',
    borderRadius: '8px',
    border: '1px solid gray',
    color: 'black',
    backgroundColor: 'white',
  }}
/>
      <br />
      <br />

      <input
  type="text"
  placeholder="Enter Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  style={{
    padding: '10px',
    width: '250px',
    borderRadius: '8px',
    border: '1px solid gray',
    color: 'black',
    backgroundColor: 'white',
  }}
/>

      <br />
      <br />

      <button onClick={requestAmbulance}>
        <div>
        <img
    src={ambulanceIcon}
    alt="ambulance"
    className="ambulance-image"
  />
  </div>
        Request Ambulance 
      </button>
    </div>
  )
}

export default AmbulanceForm