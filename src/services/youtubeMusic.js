import axios from 'axios'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

// Note: YouTube Data API doesn't directly provide "top artists" from YouTube Music
// This service simulates fetching top artists by getting subscribed channels
// which is the closest available data through the public API
export const youtubeMusicService = {
  async getTopArtists(accessToken) {
    try {
      // Get user's subscribed channels (closest to "top artists" available)
      const response = await axios.get(`${YOUTUBE_API_BASE}/subscriptions`, {
        params: {
          part: 'snippet,contentDetails',
          mine: true,
          maxResults: 50,
          order: 'alphabetical'
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Transform channels into artist-like objects
      const artists = response.data.items.map(item => ({
        id: item.snippet.resourceId.channelId,
        name: item.snippet.title,
        image: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        description: item.snippet.description,
        subscriberCount: item.contentDetails.totalItemCount,
        channelUrl: `https://www.youtube.com/channel/${item.snippet.resourceId.channelId}`
      }))

      return artists
    } catch (error) {
      console.error('Error fetching YouTube data:', error)

      if (error.response?.status === 403) {
        throw new Error('Access denied. Please ensure you have granted the necessary permissions.')
      } else if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please sign in again.')
      } else {
        throw new Error('Failed to fetch your YouTube data. Please try again.')
      }
    }
  },

  // Alternative method to get channel info if we had channel IDs
  async getChannelInfo(channelId, accessToken) {
    try {
      const response = await axios.get(`${YOUTUBE_API_BASE}/channels`, {
        params: {
          part: 'snippet,statistics',
          id: channelId
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      return response.data.items[ 0 ]
    } catch (error) {
      console.error('Error fetching channel info:', error)
      throw error
    }
  }
}

