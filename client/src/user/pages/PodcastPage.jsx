// src/pages/PodcastPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { usePodcast } from '../hooks/usePodcast'; // Adjust path if needed
import VideoPlayer from '../components/VideoPlayer'; // <-- IMPORT THE NEW PLAYER

export const PodcastPage = () => {
  const { podcastId } = useParams(); // Gets the ID from the URL
  
  // Fetch data for a single podcast
  const { data: podcast, isLoading, isError } = usePodcast(podcastId);

  if (isLoading) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h1 className="text-3xl font-bold">Loading Podcast...</h1>
      </div>
    );
  }

  if (isError || !podcast) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h1 className="text-3xl font-bold">Podcast not found!</h1>
        <p className="text-slate-500 mt-2">Sorry, we couldn't find the podcast you're looking for.</p>
        <Link to="/blog" className="text-orange-600 mt-4 inline-block">Back to Blog & Podcasts</Link>
      </div>
    );
  }

  // Define the options for the Video.js player
  const videoPlayerOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    poster: podcast.thumbnailUrl, // The thumbnail image
    sources: [{
      src: podcast.manifestUrl, // The HLS manifest URL from your database
      type: 'application/x-mpegURL' // This MIME type is for HLS playlists
    }]
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A3A5B]">{podcast.title}</h1>
          <div className="flex items-center gap-6 mt-4 text-slate-500">
            <span className="flex items-center gap-2">
              <Calendar size={16} /> Published on {new Date(podcast.publishDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Video Player Section - Replaced with the new component */}
        <div className="w-full aspect-video bg-black rounded-2xl shadow-lg overflow-hidden mb-8">
          <VideoPlayer options={videoPlayerOptions} />
        </div>

        {/* Podcast Description */}
        <div className="prose lg:prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-[#2A3A5B]">About this episode</h2>
          <p>{podcast.description}</p>
        </div>

      </div>
    </div>
  );
};