import { useEffect, useState } from 'react'

import { database } from '../firebase'

import {
  ref,
  onValue,
  update,
} from 'firebase/database'

function AdminPanel() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const requestsRef = ref(
      database,
      'ambulanceRequests'
    )

    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const loadedRequests = Object.keys(data).map(
          (key) => ({
            id: key,
            ...data[key],
          })
        )

        setRequests(loadedRequests)
      }
    })
  }, [])

  const updateStatus = async (
    id,
    currentStatus
  ) => {
    let nextStatus = ''

    if (!currentStatus || currentStatus === 'Pending') {
      nextStatus = 'Ambulance Assigned'
    } else if (
      currentStatus === 'Ambulance Assigned'
    ) {
      nextStatus = 'On The Way'
    } else if (currentStatus === 'On The Way') {
      nextStatus = 'Arrived'
    } else {
      nextStatus = 'Completed'
    }

    const requestRef = ref(
      database,
      `ambulanceRequests/${id}`
    )

    await update(requestRef, {
      status: nextStatus,
    })
  }

  return (
    <div
      style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f1f1f1',
        borderRadius: '10px',
        color: 'black',
      }}
    >
      <h2>Admin Dashboard</h2>

      {requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request.id}
            style={{
              backgroundColor: 'white',
              padding: '15px',
              marginTop: '15px',
              borderRadius: '10px',
              textAlign: 'left',
            }}
          >
            <p>
              <strong>Name:</strong>{' '}
              {request.name}
            </p>

            <p>
              <strong>Phone:</strong>{' '}
              {request.phone}
            </p>

            <p>
              <strong>Status:</strong>{' '}
              {request.status || 'Pending'}
            </p>

            <p>
              <strong>Latitude:</strong>{' '}
              {request.latitude}
            </p>

            <p>
              <strong>Longitude:</strong>{' '}
              {request.longitude}
            </p>
            <button
  onClick={() =>
    window.open(
      `https://www.google.com/maps?q=${request.latitude},${request.longitude}`
    )
  }
  style={{
    marginTop: '10px',
    marginRight: '10px',
    padding: '10px 15px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
>
  Open in Google Maps
</button>

            <button
              onClick={() =>
                updateStatus(
                  request.id,
                  request.status
                )
              }
              style={{
                marginTop: '10px',
                padding: '10px 15px',
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Update Status
            </button>
          </div>
        ))
      ) : (
        <p>No Emergency Requests</p>
      )}
    </div>
  )
}

export default AdminPanel