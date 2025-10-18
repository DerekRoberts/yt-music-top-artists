import ArtistCard from './ArtistCard'
import './ArtistGrid.css'

function ArtistGrid({ artists }) {
  return (
    <div className="artist-grid">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  )
}

export default ArtistGrid

