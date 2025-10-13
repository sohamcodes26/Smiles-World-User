import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import { usePodcasts } from '../hooks/usePodcasts';
import { useBlogBanner } from '../hooks/useHeroBanner.jsx';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';
import TopicCard from '../components/TopicCard';

const popularTopicsData = [
  { topic: "Solo Travel", emoji: "🎒", count: "25 articles" }, 
  { topic: "Women Safety", emoji: "🛡️", count: "18 articles" }, 
  { topic: "Budget Travel", emoji: "💰", count: "32 articles" },
  { topic: "Adventure", emoji: "🏔️", count: "22 articles" }, 
  { topic: "Food & Culture", emoji: "🍛", count: "28 articles" }, 
  { topic: "Photography", emoji: "📸", count: "15 articles" },
];

const PodcastCard = ({ podcast }) => {
  const [showMore, setShowMore] = useState(false);

  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    // Updated regex to handle various YouTube URL formats, including /live/ and short links
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|.+\?v=)?(?:live\/)?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null; // Ensure ID is 11 characters
  };
  
  if (!getYoutubeVideoId(podcast.videoLink)) {
    console.warn(`Invalid or missing YouTube link for podcast titled "${podcast.title}":`, podcast.videoLink);
  }

  const videoId = getYoutubeVideoId(podcast.videoLink);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "https://via.placeholder.com/400x250?text=Podcast";

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
  };

  const description = podcast.description || '';
  const MAX_LENGTH = 150;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <img
        src={thumbnailUrl}
        alt={podcast.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#2A3A5B] mt-2">
          {podcast.title}
        </h3>
        
        <div className="mt-2">
          <p className="text-gray-600 text-sm">
            {!description ? '-' : (
              showMore || description.length <= MAX_LENGTH ? (
                <>
                  {description}
                  {description.length > MAX_LENGTH && showMore && (
                    <> <button onClick={() => setShowMore(false)} className="text-orange-500 hover:text-orange-600 font-semibold whitespace-nowrap">Show Less</button></>
                  )}
                </>
              ) : (
                <>
                  {truncateText(description, MAX_LENGTH)}...
                  <button onClick={() => setShowMore(true)} className="text-orange-500 hover:text-orange-600 font-semibold whitespace-nowrap">Show More</button>
                </>
              )
            )}
          </p>
        </div>

        <Link
          to={`/podcast/${podcast.podcastId}`}
          className="mt-6 w-full px-4 py-2 font-semibold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2 text-center"
        >
          <PlayCircle size={20} /> Watch Now
        </Link>
      </div>
    </div>
  );
};

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const blogSectionRef = useRef(null);

  const { data: blogs, isLoading: isLoadingBlogs, isError: isErrorBlogs } = useBlogs();
  const { data: podcasts, isLoading: isLoadingPodcasts, isError: isErrorPodcasts } = usePodcasts();

  const { data: blogContent } = useBlogBanner();

  const heroImageUrl = blogContent?.heroBanner?.imageUrl;
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto-format&fit=crop';

  const categories = useMemo(() => {
    if (!blogs) return ["All"];
    return ["All", ...new Set(blogs.map(post => post.tag))];
  }, [blogs]);

  const filteredPosts = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter(post =>
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       post.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || post.tag === selectedCategory)
    );
  }, [searchTerm, selectedCategory, blogs]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      blogSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="pt-0 bg-white min-h-screen">
      {/* Hero Section - Unchanged */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden -mt-16 bg-black">
        <div
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `url(${heroImageUrl || fallbackImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white all-text-color tracking-tight"
          >
            Travel Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/90 all-text-color max-w-2xl mx-auto mt-6"
          >
            Discover travel tips, destination guides, and inspiring stories from fellow travelers around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl mx-auto mt-10"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 w-full p-4 border border-white/30 bg-white/90 backdrop-blur-sm rounded-full shadow-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <div className="flex flex-wrap justify-center gap-3 max-w-7xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white/90 backdrop-blur-sm text-[#2A3A5B] border border-white/50 hover:bg-white hover:shadow-lg'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FIX: Create a single wrapper div for the sections with the shared background */}
      {/* Assuming bg-[#dcf0ff] is the desired common base background for the content sections */}
      <div className="bg-[#dcf0ff] all-bg-color">
        {/* Section 1: Blog Listings */}
        <section ref={blogSectionRef} className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {isLoadingBlogs && <p className="text-center">Loading blogs...</p>}
            {isErrorBlogs && <p className="text-center text-red-500">Failed to load blogs.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs && filteredPosts.map((post, index) => (
                <motion.div
                  key={post.blogId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
            {blogs && filteredPosts.length === 0 && !isLoadingBlogs && (
              <div className="text-center py-12 col-span-full">
                <h3 className="text-2xl font-bold text-[#2A3A5B]">No articles found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Podcast Listings */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white all-text-color">Watch Our Podcasts</h2>
              <p className="text-lg text-white all-text-color mt-4">Insights and stories from the road, delivered to your ears.</p>
            </div>
            {isLoadingPodcasts && <p className="text-center">Loading podcasts...</p>}
            {isErrorPodcasts && <p className="text-center text-red-500">Failed to load podcasts.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {podcasts && podcasts.map((podcast, index) => (
                <motion.div 
                  key={podcast.podcastId} 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PodcastCard podcast={podcast} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter (if uncommented) would also fall under this continuous background */}
        {/* <Newsletter /> */}
      </div> {/* End of the wrapper div */}
    </div>
  );
}