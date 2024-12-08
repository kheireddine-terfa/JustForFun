import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { navItems } from '../constants/navItems' // Adjust the import path if needed

function Navbar() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if the user data exists in localStorage
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user') // Remove the user data from local storage
    console.log('User logged out')
    setIsLoggedIn(false) // Update the state to reflect the user is logged out
    navigate('/login') // Navigate to login
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 fixed-top">
      <div className="container-lg">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          Ba
          <span>Cactus</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item, index) =>
              item.name === 'Compte' ? (
                <li key={index} className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle mx-2"
                    to="#"
                    id="compteDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {item.name}
                  </Link>
                  <ul
                    className="dropdown-menu bg-dark"
                    aria-labelledby="compteDropdown"
                  >
                    {isLoggedIn ? (
                      <>
                        <li>
                          <Link
                            className="dropdown-item text-white dropdown-link"
                            to="/profile"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white dropdown-link"
                            to="/cart"
                          >
                            Cart
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-white dropdown-link"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="dropdown-item text-white dropdown-link"
                            to="/login"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white dropdown-link"
                            to="/signup"
                          >
                            Sign Up
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              ) : (
                <li key={index} className="nav-item">
                  <Link className="nav-link mx-2" to={item.path}>
                    {item.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
