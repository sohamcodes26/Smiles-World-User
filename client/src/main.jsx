import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import "@fontsource/montserrat/800.css";

// --- ADD THIS SECTION FOR VIDEO.JS SETUP ---
import videojs from 'video.js';
import qualityLevels from 'videojs-contrib-quality-levels';
import hlsQualitySelector from 'videojs-hls-quality-selector';

// Register the plugins globally, once when the app starts.
videojs.registerPlugin('qualityLevels', qualityLevels);
videojs.registerPlugin('hlsQualitySelector', hlsQualitySelector);
// -------------------------------------------

// 1. Create a new instance of QueryClient
const queryClient = new QueryClient();

// 2. Render your app, wrapping the Router with the QueryClientProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </>
);