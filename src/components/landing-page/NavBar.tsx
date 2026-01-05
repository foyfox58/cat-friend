import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-text">hh.</span>
          <span className="logo-dot"></span>
        </div>

        {/* Desktop: Login / Sign up */}
        <div className="navbar-buttons desktop-only">
          <button className="btn-login">Log in</button>
          <button className="btn-signup">Sign up</button>
        </div>

        {/* Mobile: Hamburger Menu */}
        <button className="hamburger-menu mobile-only">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  )
}

export default NavBar

