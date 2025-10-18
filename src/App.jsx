import { useState, useEffect, useCallback } from 'react'
import { fetchArtistsData, formatLastUpdated, getArtistsStats } from './services/artistData'
import ArtistGrid from './components/ArtistGrid'
import Header from './components/Header'
import './App.css'

function App() {
  const [ artistsData, setArtistsData ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  const fetchArtists = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      console.log('🔄 Fetching artists data...')
      const data = await fetchArtistsData()
      setArtistsData(data)

      if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      console.error('Error fetching artists:', err)
      setError('Failed to fetch artists data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchArtists()
  }, [ fetchArtists ])

  const stats = artistsData ? getArtistsStats(artistsData.artists) : null

  return (
    <div className="app">
      <Header
        onRefresh={fetchArtists}
        loading={loading}
        lastUpdated={artistsData?.lastUpdated}
      />

      <main className="main-content">
        {loading ? (
          <div className="loading-section">
            <h2>Loading Your Top Artists...</h2>
            <p>Fetching the latest data from YouTube Music</p>
            <div className="loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="error-section">
            <h2>Unable to Load Artists</h2>
            <div className="error-message">
              {error}
            </div>
            <button onClick={fetchArtists} className="retry-button">
              Try Again
            </button>
          </div>
        ) : artistsData?.artists?.length > 0 ? (
          <div className="artists-section">
            <div className="section-header">
              <div className="header-info">
                <h2>Your Top Artists</h2>
                {artistsData.lastUpdated && (
                  <p className="last-updated">
                    Last updated: {formatLastUpdated(artistsData.lastUpdated)}
                  </p>
                )}
                {stats && (
                  <p className="stats-info">
                    {stats.totalArtists} artists • {stats.totalPlayCount} total plays
                  </p>
                )}
              </div>
              <button
                onClick={fetchArtists}
                disabled={loading}
                className="refresh-button"
              >
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>

            <ArtistGrid artists={artistsData.artists} />
          </div>
        ) : (
          <div className="no-artists">
            <h2>No Artists Found</h2>
            <p>We couldn't find any artists in your YouTube Music data.</p>
            <p>This might be because:</p>
            <ul>
              <li>You haven't used YouTube Music much yet</li>
              <li>Your listening history is private</li>
              <li>The data is still being processed</li>
            </ul>
            <button onClick={fetchArtists} className="retry-button">
              Check Again
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
