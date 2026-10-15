import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="brand-name">
            Prop<span className="brand-accent">Space</span>
          </span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/properties?purpose=buy"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Buy
          </NavLink>
          <NavLink
            to="/properties?purpose=rent"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            Rent
          </NavLink>
          <NavLink
            to="/manage-listings"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            Manage Listings
          </NavLink>
          <NavLink
            to="/list-property"
            className="nav-link nav-btn-primary"
            onClick={closeMobileMenu}
          >
            List Property
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
