import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [formData, setFormData] = useState({ password: '', email: '' })
  const [errors, setErrors] = useState({ password: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' }) // Clear errors on change
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.password) {
      newErrors.password = 'password is required'
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const errorData = await response.json()
          setMessage(errorData.message || 'Login failed')
          setLoading(false)
          return
        }

        const data = await response.json()
        console.log(data)
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        setMessage('Login successful')
        console.log('Logged in user:', data)

        navigate('/')
        window.location.reload()
      } catch (error) {
        setMessage('An error occurred. Please try again.')
        console.error('Login error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg bg-dark p-4" style={{ width: '500px' }}>
        <h3 className="card-title text-center login-title mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn  login-btn w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message === 'Login successful' ? (
          <p className="mt-3 text-center success-msg">{message}</p>
        ) : (
          <p className="mt-3 text-center text-danger">{message}</p>
        )}
      </div>
    </div>
  )
}

export default LoginForm
