import './ArtistCard.css'

function ArtistCard({ artist }) {
  const handleCardClick = () => {
    if (artist.channelUrl) {
      window.open(artist.channelUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="artist-card" onClick={handleCardClick}>
      <div className="artist-image-container">
        {artist.image ? (
          <img
            src={artist.image}
            alt={artist.name}
            className="artist-image"
            loading="lazy"
          />
        ) : (
          <div className="artist-image-placeholder">
            <span>🎵</span>
          </div>
        )}
      </div>

      <div className="artist-info">
        <h3 className="artist-name">{artist.name}</h3>
        {artist.description && (
          <p className="artist-description">
            {artist.description.length > 100
              ? `${artist.description.substring(0, 100)}...`
              : artist.description
            }
          </p>
        )}
        {artist.subscriberCount && (
          <p className="artist-stats">
            {artist.subscriberCount} videos
          </p>
        )}
      </div>
    </div>
  )
}

export default ArtistCard

