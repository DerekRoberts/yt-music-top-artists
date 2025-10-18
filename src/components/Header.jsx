import './Header.css'

function Header({ user, onLogin, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1>🎵 YouTube Music Artists</h1>
        </div>

        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <span className="user-status">Signed in</span>
              <button onClick={onLogout} className="logout-button">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={onLogin} className="login-button">
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

