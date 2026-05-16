import { useEffect, useState } from 'react'

import { database } from '../firebase'

import {
  ref,
  onValue,
  update,
} from 'firebase/database'

function RequestHistory() {
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
      }}
    >
      <h2>Emergency Request History</h2>

      {requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request.id}
            style={{
              backgroundColor: 'white',
              padding: '15px',
              margin: '10px',
              borderRadius: '10px',
              color: 'black',
            }}
          >
            <p>Name: {request.name}</p>

            <p>Phone: {request.phone}</p>
            <p>Latitude: {request.latitude}</p>

<p>Longitude: {request.longitude}</p>

            <p>{request.createdAt}</p>

            <p>
              Status:{' '}
              {request.status || 'Pending'}
            </p>

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
        <p>No Requests Found</p>
      )}
    </div>
  )
}

export default RequestHistory