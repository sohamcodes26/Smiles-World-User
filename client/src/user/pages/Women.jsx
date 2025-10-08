import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Sparkles, Plane, Users, Shield, Star, Heart } from "lucide-react";
import PackageCard from "../components/packageCard";
import InfoCard from "../components/infoCard";
import heroWomen from "../../assets/group_image.webp";
import { useWomenOnlyPackages } from "../hooks/usePackages";

// --- 1. IMPORT THE BANNER HOOK ---
import { useWomenBanner } from "../hooks/useHeroBanner.jsx";


export default function Women() {
  const [selectedType, setSelectedType] = useState('domestic');
  const packagesRef = useRef(null);
  
  const { data: womenTravelPackages, isLoading, isError } = useWomenOnlyPackages();
  
  // --- 2. CALL THE BANNER HOOK ---
  const { data: womenContent } = useWomenBanner();

  const heroImageUrl = womenContent?.heroBanner?.imageUrl;

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
  
  const filteredPackages = womenTravelPackages?.filter(pkg => pkg.tag === selectedType);
  
  return (
    <div className="w-full min-h-screen -mt-16 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            // --- 3. USE THE DYNAMIC IMAGE URL ---
            backgroundImage: `url(${heroImageUrl || heroWomen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#ec4899',
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
                className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-[#fff6f6]"
              >
                Women's Safe Haven
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-base sm:text-xl md:text-4xl bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-[#fff6f6] font-normal"
              >
                Travel with confidence. Connect with sisterhood.
              </motion.p>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-sm sm:text-base md:text-xl bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-[#fff6f6] max-w-2xl mx-auto px-4"
            >
              Exclusively designed travel experiences for women, by women. 
              Every journey prioritizes safety, empowerment, and creating lasting friendships 
              with fellow female travelers.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => handleTabChange('domestic')}
                className={`w-full sm:w-auto rounded-full px-6 sm:px-8 py-3 font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center ${
                  selectedType === 'domestic' 
                    ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                    : 'bg-white/90 text-pink-500 hover:bg-pink-500 hover:text-white'
                }`}
              >
                <MapPin className="mr-2" size={18} />
                Domestic Tours
              </button>
              <button
                onClick={() => handleTabChange('international')}
                className={`w-full sm:w-auto rounded-full px-6 sm:px-8 py-3 font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center ${
                  selectedType === 'international' 
                    ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                    : 'bg-white/90 text-pink-500 hover:bg-pink-500 hover:text-white'
                }`}
              >
                <Plane className="mr-2" size={18} />
                International Tours
              </button>
            </motion.div>
            
            <motion.div
              className="flex justify-center pt-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/customize" className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center transition-all duration-300">
                <Sparkles className="mr-2" size={18} />
                Customize My Journey
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={packagesRef} className="py-16 px-4 bg-pink-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {selectedType === 'domestic' ? 'Domestic Women Tours' : 'International Women Tours'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              {selectedType === 'domestic' 
                ? 'Explore India safely with fellow women travelers' 
                : 'International adventures designed for women\'s safety and comfort'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && <p className="col-span-full text-center">Loading packages...</p>}
            {isError && <p className="col-span-full text-center text-red-600">Could not fetch packages.</p>}
            
            {filteredPackages && filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <PackageCard
                  packageData={pkg}
                  theme="pink"
                  delay={0.1 * index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Women-Only Travel?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Experience the freedom, safety, and empowerment that comes with traveling 
              in a supportive community of like-minded women.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Enhanced Safety",
                description: "Women-only groups, female guides, and carefully vetted accommodations ensure your security throughout the journey."
              },
              {
                icon: "👭", 
                title: "Sisterhood Bonds",
                description: "Connect with amazing women from diverse backgrounds and create lifelong friendships that extend beyond travel."
              },
              {
                icon: "🦋",
                title: "Personal Growth",
                description: "Step out of your comfort zone in a supportive environment that encourages confidence and self-discovery."
              },
              {
                icon: "🌟",
                title: "Authentic Experiences", 
                description: "Access unique cultural experiences and perspectives that are often more open to women-only groups."
              }
            ].map((benefit, index) => (
              <InfoCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                delay={index * 0.2}
                variant="pink"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-pink-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🔐 Your Safety, Our Priority
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive safety measures designed specifically for women travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👭",
                title: "Female-Only Groups",
                description: "Travel exclusively with other women in small, carefully curated groups of 8-12 participants."
              },
              {
                icon: "🏨",
                title: "Vetted Accommodations", 
                description: "Women-friendly hotels and resorts with enhanced security measures and female staff availability."
              },
              {
                icon: "📞",
                title: "24/7 Support",
                description: "Round-the-clock support hotline staffed by women who understand the unique needs of female travelers."
              }
            ].map((feature, index) => (
              <InfoCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.2}
                variant="pink"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              💬 What Our Sisters Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "Traveling with Smiles World's women-only group gave me the confidence to explore places I never thought I could visit alone. The sisterhood formed during our Goa retreat is something I'll cherish forever.",
                emoji: "🌟"
              },
              {
                name: "Anjali Patel",
                location: "Delhi",
                text: "As a first-time solo traveler, the Rishikesh women's retreat was perfect. I felt safe, supported, and came back feeling empowered and with amazing new friends from across India.",
                emoji: "🦋"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl mb-4">{testimonial.emoji}</div>
                <p className="text-gray-600 mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Ready to Join Our Sisterhood? 💕
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards empowering travel experiences. 
              Connect with amazing women and create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-5 py-[10px] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center">
                <Heart className="mr-2" size={20} />
                Join Women's Travel Group
              </button>
              <Link to="/contact" className="text-lg px-5 py-[10px] rounded-full border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white inline-flex items-center justify-center transition-all duration-300">
                <MapPin className="mr-2" size={20} />
                Ask Questions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}