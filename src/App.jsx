import { useState, useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { youtubeMusicService } from './services/youtubeMusic'
import ArtistGrid from './components/ArtistGrid'
import Header from './components/Header'
import './App.css'

function AppContent() {
  const [ user, setUser ] = useState(null)
  const [ artists, setArtists ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUser(tokenResponse)
      setError(null)
    },
    onError: (error) => {
      console.error('Login Failed:', error)
      setError('Login failed. Please try again.')
    },
    scope: 'https://www.googleapis.com/auth/youtube.readonly'
  })

  const logout = () => {
    setUser(null)
    setArtists([])
  }

  const fetchTopArtists = async () => {
    if (!user?.access_token) return

    setLoading(true)
    setError(null)

    try {
      const artistData = await youtubeMusicService.getTopArtists(user.access_token)
      setArtists(artistData)
    } catch (err) {
      console.error('Error fetching artists:', err)
      setError('Failed to fetch your top artists. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.access_token) {
      fetchTopArtists()
    }
  }, [ user ])

  return (
    <div className="app">
      <Header user={user} onLogin={login} onLogout={logout} />

      <main className="main-content">
        {!user ? (
          <div className="login-section">
            <h2>Welcome to YouTube Music Artists</h2>
            <p>Sign in with Google to view your top artists from YouTube Music</p>
            <button onClick={login} className="login-button">
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="artists-section">
            <div className="section-header">
              <h2>Your Top Artists</h2>
              <button
                onClick={fetchTopArtists}
                disabled={loading}
                className="refresh-button"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {artists.length > 0 ? (
              <ArtistGrid artists={artists} />
            ) : !loading && (
              <div className="no-artists">
                <p>No artists found. This might be because:</p>
                <ul>
                  <li>You haven't used YouTube Music much yet</li>
                  <li>Your listening history is private</li>
                  <li>API access is limited</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId) {
    return (
      <div className="error-message">
        <h2>Configuration Error</h2>
        <p>Please set up your Google OAuth Client ID in the environment variables.</p>
        <p>See the README for setup instructions.</p>
      </div>
    )
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AppContent />
    </GoogleOAuthProvider>
  )
}

export default App
