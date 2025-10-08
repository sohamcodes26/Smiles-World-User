import { motion } from "framer-motion";
import { MapPin, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PackageCard from "../components/packageCard";
import InfoCard from "../components/infoCard";
import { useRef } from "react";
import { useDomesticPackages } from "../hooks/usePackages";

// --- 1. IMPORT THE BANNER HOOK ---
import { useDomesticBanner } from "../hooks/useHeroBanner.jsx";


const features = [
  {
    icon: "🛡️",
    title: "Safe & Secure",
    description: "Your safety is our priority. We ensure secure accommodations, reliable transportation, and 24/7 support throughout your journey."
  },
  {
    icon: "👥",
    title: "Expert Guides",
    description: "Local, experienced guides who know the hidden gems and cultural secrets of each destination, making your trip truly authentic."
  },
  {
    icon: "💝",
    title: "Personalized Experience",
    description: "Every package is customizable to your preferences. We create unique experiences that match your travel style and interests."
  }
];


export default function Home() {
  const packagesRef = useRef(null);
  
  const { data: domesticTravelPackages, isLoading, isError } = useDomesticPackages();

  // --- 2. CALL THE BANNER HOOK ---
  const { data: domesticContent } = useDomesticBanner();

  const heroImageUrl = domesticContent?.heroBanner?.imageUrl;
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto-format&fit=crop';

  const handleScrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden -mt-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            // --- 3. USE THE DYNAMIC IMAGE URL ---
            backgroundImage: `url(${heroImageUrl || fallbackImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Smiles World
              </motion.h1>

              <motion.p
                className="text-2xl md:text-4xl text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your Perfect Indian Holiday
              </motion.p>
            </div>

            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Explore the breathtaking diversity of your own country. From the majestic Himalayas to the serene coasts of the south, your next Indian adventure is waiting.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                type="button"
                onClick={handleScrollToPackages}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                <Sparkles className="mr-2" size={18} />
                Domestic Travel Packages
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={packagesRef} className="py-20 px-4 bg-[#dcf0ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🚂 Domestic Travel Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hand-picked destinations that promise incredible experiences. Request full details to learn more about any package.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && <p className="col-span-full text-center">Loading packages...</p>}
            {isError && <p className="col-span-full text-center text-red-600">Could not fetch packages. Please try again later.</p>}
            
            {domesticTravelPackages && domesticTravelPackages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PackageCard packageData={pkg} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#dcf0ff]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🌟 Why Travel With Us?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <InfoCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#dcf0ff]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-12 border border-gray-200"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let us craft the perfect journey just for you. Share your travel dreams and we'll make them reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/customize" className="inline-flex items-center justify-center text-lg px-3 py-2 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                <MapPin className="mr-2" size={20} />
                Plan My Trip
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center text-lg px-3 py-2 font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                <Heart className="mr-2" size={18} />
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}