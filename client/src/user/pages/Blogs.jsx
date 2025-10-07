import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, PlayCircle } from 'lucide-react';

// Import your existing components
import BlogCard from '../components/BlogCard'; 
import Newsletter from '../components/Newsletter'; 
import TopicCard from '../components/TopicCard'; 

// --- Mock Data (Blogs) ---
export const mockBlogData = [
  { id: 1, title: "10 Essential Tips for First-Time Solo Female Travelers", image: "https://images.unsplash.com/photo-1503220317375-903a9c367676?q=80&w=2070&auto=format&fit=crop", excerpt: "An empowering experience awaits. Here are our top 10 tips for a safe and memorable journey.", category: "Solo Travel", publishDate: "2025-10-15", readTime: "8 min read", author: "Elena Petrova", content: "Full blog content for solo travel goes here..." },
  { id: 2, title: "Hidden Gems of Rajasthan: Beyond the Golden Triangle", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop", excerpt: "Explore the lesser-known treasures of Rajasthan that offer authentic experiences away from the tourist crowds.", category: "Destinations", publishDate: "2025-10-10", readTime: "6 min read", author: "Rajesh Kumar", content: "Full blog content for Rajasthan goes here..." },
  { id: 3, title: "Sustainable Travel: How to Explore the World Responsibly", image: "https://images.unsplash.com/photo-1516280440614-376394488837?q=80&w=2070&auto=format&fit=crop", excerpt: "Learn how to minimize your environmental impact while maximizing your travel experiences.", category: "Sustainable Travel", publishDate: "2025-10-05", readTime: "7 min read", author: "Dr. Meera Patel", content: "Full blog content for sustainable travel goes here..." },
];

const popularTopicsData = [
  { topic: "Solo Travel", emoji: "🎒", count: "25 articles" }, { topic: "Women Safety", emoji: "🛡️", count: "18 articles" }, { topic: "Budget Travel", emoji: "💰", count: "32 articles" },
  { topic: "Adventure", emoji: "🏔️", count: "22 articles" }, { topic: "Food & Culture", emoji: "🍛", count: "28 articles" }, { topic: "Photography", emoji: "📸", count: "15 articles" },
];

// --- NEW: Mock Podcast Data ---
const mockPodcastData = [
    { id: 1, title: "The Art of Solo Travel", episode: 12, duration: "45 min", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop", description: "Dive into the essentials of planning your first solo adventure, from safety tips to can't-miss destinations." },
    { id: 2, title: "Culinary Journeys: A Taste of Southeast Asia", episode: 11, duration: "52 min", image: "https://images.unsplash.com/photo-1559847844-5315695d9e06?q=80&w=1974&auto=format&fit=crop", description: "Join us as we explore the vibrant street food scenes of Thailand, Vietnam, and Malaysia with expert food bloggers." },
    { id: 3, title: "Budget Backpacking Through Europe", episode: 10, duration: "38 min", image: "https://images.unsplash.com/photo-1473951574080-018b96946224?q=80&w=2070&auto=format&fit=crop", description: "Discover how to see the best of Europe without breaking the bank. We share our secrets on hostels, transport, and free attractions." },
];

// --- NEW: PodcastCard Component ---
const PodcastCard = ({ podcast }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <img src={podcast.image} alt={podcast.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-orange-500">Episode {podcast.episode} &bull; {podcast.duration}</p>
                <h3 className="text-xl font-bold text-[#2A3A5B] mt-2 flex-grow">{podcast.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{podcast.description}</p>
                <button className="mt-6 w-full px-4 py-2 font-semibold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <PlayCircle size={20} /> Listen Now
                </button>
            </div>
        </div>
    );
};

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const blogSectionRef = useRef(null);
  
  const categories = ["All", ...new Set(mockBlogData.map(post => post.category))];
  const filteredPosts = useMemo(() => mockBlogData.filter(post =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "All" || post.category === selectedCategory)
  ), [searchTerm, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Scroll to blog section smoothly
    setTimeout(() => {
      blogSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  return (
    <div className="pt-0 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden -mt-16 bg-black">
        <div
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            Travel Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mt-6"
          >
            Discover travel tips, destination guides, and inspiring stories from fellow travelers around the world.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
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

          {/* Categories Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
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

      {/* Blog Post Grid */}
      <section ref={blogSectionRef} className="py-16 px-4 bg-[#dcf0ff]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
          {filteredPosts.length === 0 && (
             <div className="text-center py-12 col-span-full">
               <h3 className="text-2xl font-bold text-[#2A3A5B]">No articles found</h3>
               <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
             </div>
          )}
        </div>
      </section>

      {/* --- NEW: Podcasts Section --- */}
      <section className="py-24 px-4 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2A3A5B]">Listen to Our Podcasts</h2>
            <p className="text-lg text-orange-800 mt-4">Insights and stories from the road, delivered to your ears.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPodcastData.map((podcast, index) => (
              <motion.div key={podcast.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <PodcastCard podcast={podcast} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />

      {/* Popular Topics Section */}
      <section className="py-24 px-4 bg-white"> 
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2A3A5B]">Popular Travel Topics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularTopicsData.map((topic, index) => (
              <motion.div
                key={topic.topic}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TopicCard 
                  emoji={topic.emoji}
                  topic={topic.topic}
                  count={topic.count}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}