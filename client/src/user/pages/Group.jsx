import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Plane, Sparkles } from "lucide-react";
import InfoCard from "../components/infoCard";
import PackageCard from "../components/packageCard";
import { useGroupDeparturePackages } from "../hooks/usePackages";

// --- 1. IMPORT THE BANNER HOOK ---
import { useGroupBanner } from "../hooks/useHeroBanner.jsx";

export default function GroupDeparture() {
  const [selectedType, setSelectedType] = useState('domestic');
  const packagesRef = useRef(null);
  
  const { data: groupDepartures, isLoading, isError } = useGroupDeparturePackages();
  
  // --- 2. CALL THE BANNER HOOK ---
  const { data: groupContent } = useGroupBanner();

  const heroImageUrl = groupContent?.heroBanner?.imageUrl;
  
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {};
  }, []);

  const handleTabChange = (type) => {
    setSelectedType(type);
    setTimeout(() => {
      if (packagesRef.current) {
        packagesRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };
  
  const filteredDepartures = groupDepartures?.filter(departure => departure.tag === selectedType);

  return (
    <div className="w-full min-h-screen -mt-16 all-bg-color  ">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            // --- 3. USE THE DYNAMIC IMAGE URL ---
            backgroundImage: `url(${heroImageUrl || '/group_image.webp'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f97316', 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-[#fff6f6]"
              >
                Group Adventures
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-base sm:text-xl md:text-4xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-[#fff6f6] font-normal"
              >
                Travel together. Explore together. Create memories together.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 px-4"
            >
              <button 
                onClick={() => handleTabChange('domestic')}
                className={`w-full sm:w-auto rounded-full px-6 sm:px-8 py-3 font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                  selectedType === 'domestic' 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-white/90 text-orange-500 hover:bg-orange-500 hover:text-white'
                }`}
              >
                <MapPin className="mr-2" size={18} />
                Domestic Tours
              </button>
              <button 
                onClick={() => handleTabChange('international')}
                className={`w-full sm:w-auto rounded-full px-6 sm:px-8 py-3 font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                  selectedType === 'international' 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-white/90 text-orange-500 hover:bg-orange-500 hover:text-white'
                }`}
              >
                <Plane className="mr-2" size={18} />
                International Tours
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex justify-center pt-4 px-4"
            >
              <Link 
                to="/customize"
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-decoration-none"
              >
                <Sparkles className="mr-2" size={18} />
                Customize My Group Journey
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={packagesRef} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={`title-${selectedType}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {selectedType === 'domestic' ? 'Domestic Group Tours' : 'International Group Tours'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              {selectedType === 'domestic' 
                ? 'Explore India together with fellow travelers' 
                : 'International adventures with group support and guidance'}
            </p>
          </motion.div>

          <motion.div 
            key={`cards-container-${selectedType}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {isLoading && <p className="col-span-full text-center">Loading packages...</p>}
            {isError && <p className="col-span-full text-center text-red-600">Could not fetch packages.</p>}
            
            {filteredDepartures && filteredDepartures.map((departure, index) => (
              <motion.div
                key={departure._id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <PackageCard
                  packageData={departure}
                  theme="orange"
                  delay={0}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Group Travel?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "👫", title: "Make New Friends", description: "Connect with like-minded travelers and create lasting friendships" },
              { icon: "💰", title: "Better Value", description: "Enjoy competitive prices with group discounts and shared costs" },
              { icon: "🛡️", title: "Safety & Support", description: "Travel with confidence knowing you have support and companionship" },
              { icon: "📋", title: "Hassle-Free Planning", description: "Leave the planning to us while you focus on enjoying your trip" },
              { icon: "🏛️", title: "Expert Guides", description: "Learn from experienced local guides who know the best spots" },
              { icon: "🎊", title: "Shared Experiences", description: "Share magical moments and create memories together" }
            ].map((benefit, index) => (
              <InfoCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} delay={0.1 * index} variant="orange" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}