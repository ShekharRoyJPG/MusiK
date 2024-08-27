# MusiK 🎵

MusiK is a React Native music player application that allows users to play, pause, shuffle, and control music tracks with ease. The app is built using `react-native-track-player` for seamless audio playback and provides a rich user experience with custom components like `FloatingPlayer` and `PlayerShuffleToggle`.

## Features

- **Floating Player**: Displays the currently playing track with a progress bar and playback controls.
- **Custom Slider**: Allows users to seek within the track and shows the progress in real-time.
- **Shuffle Functionality**: Enables users to shuffle the current playlist with a single tap.
- **Track Progress**: Updates the track's progress using `useProgress` from `react-native-track-player`.
- **Responsive Design**: Adapts to different screen sizes and orientations for an optimal user experience.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shekhar-roy-5292/MusiK.git
2. Install the dependencies:
   ```bash
   npm install
3. Link the necessary native modules:
   ```bash
   npx react-native link
4. Start the Metro server:
   ```bash
   npx react-native start
5. Run the app:
     1. For iOS:
        ```bash
        npx react-native run-ios
     1. For Android:
        ```bash
        npx react-native run-android

## Usage

- **Floating Player**: Displays the album art, song title, and artist name. It includes controls for play/pause, next, and previous tracks.
- **Shuffle Toggle**: Tap the shuffle icon to shuffle the current playlist.
- **Seek Slider**: Drag the slider to seek through the track.
