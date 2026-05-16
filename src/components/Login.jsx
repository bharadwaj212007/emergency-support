import { useState } from 'react'

import { auth } from '../firebase'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

function Login({ setIsLoggedIn }) {
  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert('Signup Successful')

      setIsLoggedIn(true)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert('Login Successful')

      setIsLoggedIn(true)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
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
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="login-input"
        />

        <div className="login-buttons">
          <button
            onClick={handleSignup}
            className="login-btn"
          >
            Sign Up
          </button>

          <button
            onClick={handleLogin}
            className="login-btn"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login