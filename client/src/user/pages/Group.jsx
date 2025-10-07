import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Plane, Sparkles } from "lucide-react";
import InfoCard from "../components/infoCard";
import PackageCard from "../components/packageCard";

export default function GroupDeparture() {
  const [selectedType, setSelectedType] = useState('domestic');
  const packagesRef = useRef(null);
  
  // Set body styles to remove any default margins/padding
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Handle tab change with scroll
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
  
  // Updated group departures data with new package structure
  const groupDepartures = [
    {
      id: 1,
      title: "Golden Triangle Tour",
      description: "Join our exclusive group departure for a 7-day journey through India's Golden Triangle. Experience the rich history and culture of Delhi, witness the eternal love story at the Taj Mahal in Agra, and explore the royal heritage of Jaipur with like-minded travelers.",
      duration: "7 Days, 6 Nights",
      placesCovered: "Delhi, Agra, Jaipur, Fatehpur Sikri",
      bestTimeToVisit: "October to March",
      peakSeason: "November to February",
      midSeason: "October & March",
      startingFrom: "25000",
      itinerariesDay1: "Arrival in Delhi, meet and greet with group members, check-in to hotel, welcome dinner and briefing session",
      // Keeping old fields for backward compatibility
      startDate: "Jan 15, 2024",
      endDate: "Jan 22, 2024",
      places: ["Delhi", "Agra", "Jaipur"],
      timeline: [
        { day: 1, description: "Arrival in Delhi and city tour" },
        { day: 2, description: "Travel to Agra, visit Taj Mahal" },
        { day: 3, description: "Explore Agra Fort and travel to Jaipur" }
      ],
      price: 25000,
      availableSeats: 5,
      type: selectedType === 'domestic' ? 'Family' : 'Adventure',
      thumbnail: "/group_image.webp",
      shortDescription: "7 Days group travel experience through India's Golden Triangle",
      inclusions: ['Accommodation', 'Meals', 'Transportation', 'Group activities'],
      exclusions: ['Personal expenses', 'Travel insurance'],
      category: 'domestic'
    },
    {
      id: 2,
      title: "Thailand Explorer",
      description: "Embark on an exciting 10-day international group adventure in Thailand. Discover the vibrant temples of Bangkok, relax on the pristine beaches of Phuket, and experience the stunning landscapes of Krabi with fellow travelers from around the globe.",
      duration: "10 Days, 9 Nights",
      placesCovered: "Bangkok, Phuket, Krabi, Phi Phi Islands",
      bestTimeToVisit: "November to April",
      peakSeason: "December to February",
      midSeason: "November & March to April",
      startingFrom: "65000",
      itinerariesDay1: "Arrival in Bangkok, airport transfer to hotel, group introduction session, visit to famous temples including Wat Pho and Wat Arun",
      // Keeping old fields for backward compatibility
      startDate: "Feb 01, 2024",
      endDate: "Feb 11, 2024",
      places: ["Bangkok", "Phuket", "Krabi"],
      timeline: [
        { day: 1, description: "Arrival in Bangkok, temple tours" },
        { day: 2, description: "Bangkok city exploration" },
        { day: 3, description: "Flight to Phuket, beach activities" }
      ],
      price: 65000,
      availableSeats: 7,
      type: selectedType === 'international' ? 'Adventure' : 'Culture',
      thumbnail: "/group_image.webp",
      shortDescription: "10 Days international group adventure in Thailand",
      inclusions: ['Flights', 'Accommodation', 'Meals', 'Visa Assistance'],
      exclusions: ['Personal shopping', 'Travel insurance'],
      category: 'international'
    }
  ];
  
  const filteredDepartures = groupDepartures.filter(departure => departure.category === selectedType);

  return (
    <div className="w-full min-h-screen -mt-16 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/group_image.webp)`,
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
            
            {/* <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-sm sm:text-base md:text-xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-[#fff6f6] max-w-2xl mx-auto px-4"
            >
              Join fellow travelers on our carefully curated group tours. 
              Make new friends while exploring incredible destinations with the support and camaraderie of like-minded adventurers.
            </motion.p> */}
            
            {/* Package Type Selection */}
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

      {/* Group Departure Packages */}
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
            {filteredDepartures.map((departure, index) => (
              <motion.div
                key={`card-${selectedType}-${departure.id}-${index}`}
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

      {/* Why Choose Group Travel */}
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
              {
                icon: "👫",
                title: "Make New Friends",
                description: "Connect with like-minded travelers and create lasting friendships"
              },
              {
                icon: "💰",
                title: "Better Value",
                description: "Enjoy competitive prices with group discounts and shared costs"
              },
              {
                icon: "🛡️",
                title: "Safety & Support",
                description: "Travel with confidence knowing you have support and companionship"
              },
              {
                icon: "📋",
                title: "Hassle-Free Planning",
                description: "Leave the planning to us while you focus on enjoying your trip"
              },
              {
                icon: "🏛️",
                title: "Expert Guides",
                description: "Learn from experienced local guides who know the best spots"
              },
              {
                icon: "🎊",
                title: "Shared Experiences",
                description: "Share magical moments and create memories together"
              }
            ].map((benefit, index) => (
              <InfoCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                delay={0.1 * index}
                variant="orange"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}