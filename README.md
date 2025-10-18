# YouTube Music Artists

A React web application that displays your top artists from YouTube Music using scheduled data updates via GitHub Actions.

## 🚀 Live Demo

Visit the live application at: [https://derekroberts.github.io/yt-music-top-artists/](https://derekroberts.github.io/yt-music-top-artists/)

## ✨ Features

- **Scheduled Data Updates** - GitHub Actions automatically fetches your YouTube Music data every 6 hours
- **Top Artists Display** - View your most listened artists with play counts and statistics
- **Modern UI** - Clean, responsive design with smooth animations
- **GitHub Pages Deployment** - Automatically deployed on every push to main branch
- **No Authentication Required** - Data is pre-fetched and served as static JSON

## 🏗️ Architecture

This application uses a **scheduled data fetching** approach:

```
GitHub Actions (every 6 hours)
  ↓ Runs Node.js script
  ↓ Fetches YouTube Music data
  ↓ Generates artists.json
  ↓ Commits to repository
  
React Frontend (GitHub Pages)
  ↓ Fetches static artists.json
  ↓ Displays your top artists
```

### Benefits
- **No authentication required** in the frontend
- **Automatic updates** every 6 hours
- **Free hosting** on GitHub Pages
- **Simple deployment** with GitHub Actions

## 🛠️ Setup Instructions

### 1. YouTube Music Authentication Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - For local development: `http://localhost:5173`
     - For production: `https://derekroberts.github.io/yt-music-top-artists/`
5. Copy your **Client ID**

### 2. Environment Configuration

1. Create a `.env.local` file in the project root:
   ```bash
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

2. **Important**: Never commit `.env.local` to version control!

### 3. GitHub Pages Deployment

For automatic deployment to GitHub Pages:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Under "Source", select "GitHub Actions"
4. Add your Google Client ID as a repository secret:
   - Go to "Settings" > "Secrets and variables" > "Actions"
   - Add a new secret named `VITE_GOOGLE_CLIENT_ID` with your client ID value

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone git@github.com:DerekRoberts/yt-music-top-artists.git
   cd yt-music-top-artists
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env.local` file with your Google Client ID

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Production Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
├── scripts/
│   └── fetch_artists.js    # Node.js script for fetching YouTube Music data
├── .github/workflows/
│   ├── deploy.yml          # GitHub Pages deployment
│   └── fetch-artists.yml   # Scheduled data fetching workflow
├── public/
│   └── artists.json        # Generated artist data (updated by GitHub Actions)
├── src/
│   ├── components/
│   │   ├── ArtistCard.jsx  # Individual artist display component
│   │   ├── ArtistCard.css  # Artist card styling
│   │   ├── ArtistGrid.jsx  # Grid layout for artists
│   │   ├── ArtistGrid.css  # Grid styling
│   │   ├── Header.jsx      # App header with refresh functionality
│   │   └── Header.css      # Header styling
│   ├── services/
│   │   └── artistData.js   # Service for fetching static JSON data
│   ├── App.jsx             # Main application component (simplified, no auth)
│   ├── App.css             # Global styles
│   └── main.jsx           # Application entry point
└── README.md              # This file
```

## 🔧 API Limitations

**Important Note**: The YouTube Data API doesn't provide direct access to YouTube Music listening history or "top artists" data. This application uses your **subscribed channels** as the closest available alternative, since:

1. YouTube Music data requires special access not available through public APIs
2. Listening history is private and not exposed via API
3. Subscribed channels represent your musical interests and preferences

## 🎨 Customization

### Styling
- Modify CSS files in `src/components/` for component-specific styles
- Update `src/App.css` for global styles and themes
- The app uses CSS custom properties for easy color theming

### Features
- Add new API endpoints in `src/services/youtubeMusic.js`
- Create additional components in `src/components/`
- Modify the main app logic in `src/App.jsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **"Configuration Error" message**
   - Ensure your `.env.local` file exists and contains `VITE_GOOGLE_CLIENT_ID`
   - Verify the Client ID is correct from Google Cloud Console

2. **OAuth redirect URI mismatch**
   - Check that your redirect URIs in Google Cloud Console match your deployment URL
   - For GitHub Pages: `https://derekroberts.github.io/yt-music-top-artists/`

3. **"Access denied" error**
   - Ensure the YouTube Data API v3 is enabled in Google Cloud Console
   - Check that your OAuth consent screen is properly configured

4. **No artists showing**
   - This is normal if you haven't subscribed to many YouTube channels
   - The API only shows subscribed channels, not YouTube Music listening history

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Cloud Console setup
3. Ensure all environment variables are correctly set
4. Check the [YouTube Data API documentation](https://developers.google.com/youtube/v3)

## 🙏 Acknowledgments

- [YouTube Data API](https://developers.google.com/youtube/v3) for providing the data
- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build tool
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2) for authentication
