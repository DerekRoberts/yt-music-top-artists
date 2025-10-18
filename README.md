# YouTube Music Artists

A React web application that displays your top artists from YouTube Music using the YouTube Data API.

## 🚀 Live Demo

Visit the live application at: [https://yourusername.github.io/youtube-music-artists/](https://yourusername.github.io/youtube-music-artists/)

## ✨ Features

- **Google OAuth Authentication** - Secure sign-in with your Google account
- **Top Artists Display** - View your most subscribed channels (closest to "top artists" available via API)
- **Modern UI** - Clean, responsive design with smooth animations
- **GitHub Pages Deployment** - Automatically deployed on every push to main branch

## 🛠️ Setup Instructions

### 1. Google Cloud Console Setup

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
     - For production: `https://yourusername.github.io/youtube-music-artists/`
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
   git clone https://github.com/yourusername/youtube-music-artists.git
   cd youtube-music-artists
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
src/
├── components/
│   ├── ArtistCard.jsx      # Individual artist display component
│   ├── ArtistCard.css      # Artist card styling
│   ├── ArtistGrid.jsx      # Grid layout for artists
│   ├── ArtistGrid.css      # Grid styling
│   ├── Header.jsx          # App header with auth
│   └── Header.css          # Header styling
├── services/
│   └── youtubeMusic.js     # YouTube API integration
├── App.jsx                 # Main application component
├── App.css                 # Global styles
└── main.jsx               # Application entry point
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
   - For GitHub Pages: `https://yourusername.github.io/youtube-music-artists/`

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
