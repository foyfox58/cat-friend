import { useState } from 'react'
import './NavBar.css'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <span className="logo-text">hh.</span>
            <span className="logo-dot"></span>
          </div>

          {/* Desktop Buttons */}
          <div className="navbar-buttons desktop-only">
            <button className="btn-login">Log in</button>
            <button className="btn-signup">Sign up</button>
          </div>

          {/* Mobile Hamburger (ไม่เปลี่ยนเป็น X) */}
          <button
            className="hamburger-menu mobile-only"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Action Bar */}
      {isMenuOpen && (
        <div className="mobile-action-bar mobile-only">
          <button className="btn-login-mobile">Log in</button>
          <button className="btn-signup-mobile">Sign up</button>
        </div>
      )}
    </>
  )
}

export default NavBar
