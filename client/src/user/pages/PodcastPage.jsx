import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { usePodcast } from '../hooks/usePodcast';

export const PodcastPage = () => {
  const { podcastId } = useParams();

  const { data: podcast, isLoading, isError } = usePodcast(podcastId);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    // Updated regex to handle various YouTube URL formats, including /live/ and short links
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?(?:live\/)?([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[1].length === 11) ? match[1] : null; // Ensure ID is 11 characters
    console.log("Extracted video ID:", videoId); // Debugging line
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

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

  console.log("Attempting to load video from this link:", podcast.videoLink);
  const embedUrl = getYoutubeEmbedUrl(podcast.videoLink);

  return (
    <div className="pt-3 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 pt-4 px-4">

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A3A5B]">{podcast.title}</h1>
          <div className="flex items-center gap-6 mt-4 text-slate-500">
            <span className="flex items-center gap-2">
              <Calendar size={16} /> Published on {new Date(podcast.publishDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="w-full aspect-video rounded-2xl shadow-lg overflow-hidden mb-8 bg-black">
          {embedUrl ? (
            <iframe
              className="w-full h-full"
              src={embedUrl}
              title={podcast.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white">Video could not be loaded.</p>
            </div>
          )}
        </div>

        <div className="prose lg:prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-[#2A3A5B]">About this episode</h2>
          <p>{podcast.description}</p>
        </div>

      </div>
    </div>
  );
};