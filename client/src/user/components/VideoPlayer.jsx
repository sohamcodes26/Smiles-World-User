// src/components/VideoPlayer.jsx

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import the default CSS for the player
import '@videojs/http-streaming';

// Note: The plugin registration has been moved to main.jsx

/**
 * A React component wrapper for the Video.js player.
 * @param {object} props - The component props.
 * @param {object} props.options - The Video.js options object.
 */
const VideoPlayer = ({ options }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Ensure the video element is available
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Initialize the player if it doesn't exist yet
    if (!playerRef.current) {
      const player = videojs(videoElement, options, () => {
        console.log('Video.js player is ready');
      });
      playerRef.current = player;
      
      // Initialize the quality selector on the player instance
      player.hlsQualitySelector();
    }

    // This function will be called when the component unmounts
    return () => {
      const player = playerRef.current;
      // Dispose the player to free up resources
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options]); // Re-run effect if options change

  return (
    <div data-vjs-player>
      {/* The video element needs the ref and specific classes for Video.js */}
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;