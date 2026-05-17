function BloodRequest() {
  return (
    <div
      style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        marginTop: '30px',
      }}
    >
      <h2> Blood Needed Support</h2>

      <p>
        Request blood donors during medical emergencies.
      </p>

      <button
        style={{
          background: 'crimson',
          color: 'white',
          border: 'none',
          padding: '12px 25px',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        Request Blood
      </button>
    </div>
  )
}

export default BloodRequest