import { formatLastUpdated } from '../services/artistData'
import './Header.css'

function Header({ onRefresh, loading, lastUpdated }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1>🎵 YouTube Music Artists</h1>
          {lastUpdated && (
            <p className="last-updated-header">
              Last updated: {formatLastUpdated(lastUpdated)}
            </p>
          )}
        </div>

        <div className="action-section">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="refresh-header-button"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

