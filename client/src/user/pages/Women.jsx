import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Sparkles, Plane, Users, Shield, Star, Heart } from "lucide-react";
import PackageCard from "../components/packageCard";
import InfoCard from "../components/infoCard";
import heroWomen from "../../assets/group_image.webp";

// Sample women travel packages data
const womenTravelPackages = [
  // Domestic packages
  {
    id: 'wd-1',
    title: 'Rajasthan Queens Heritage Tour',
    description: 'Experience the royal heritage of Rajasthan with an exclusive women-only group. Explore majestic palaces, vibrant markets, and immerse yourself in cultural workshops led by local female artisans.',
    placesCovered: 'Jaipur - Udaipur - Jodhpur',
    duration: '7 Days 6 Nights',
    bestTimeToVisit: 'October to March',
    peakSeason: 'November to February',
    midSeason: 'October & March',
    startingFrom: '35999',
    thumbnail: '/placeholder.svg',
    itinerariesDay1: 'Arrival in Jaipur, welcome ceremony with female guides, check-in to heritage hotel, evening cultural workshop and traditional Rajasthani dinner',
    type: 'Women Only',
    highlights: ['Women-only group', 'Female guides', 'Safe accommodations', 'Cultural workshops'],
    rating: 4.9,
    safety: 'Maximum Safety',
    groupSize: '8-12 women',
    category: 'domestic',
    inclusions: ['Accommodation', 'All meals', 'Transportation', 'Female guide'],
    exclusions: ['Personal expenses', 'Travel insurance']
  },
  {
    id: 'wd-2',
    title: 'Kerala Wellness Retreat',
    description: 'Rejuvenate your mind, body, and soul in the serene landscapes of Kerala. Enjoy Ayurvedic treatments, yoga sessions, and cooking classes in a safe, women-friendly environment.',
    placesCovered: 'Munnar - Alleppey - Kochi',
    duration: '6 Days 5 Nights',
    bestTimeToVisit: 'September to March',
    peakSeason: 'October to February',
    midSeason: 'September & March',
    startingFrom: '42999',
    thumbnail: '/placeholder.svg',
    itinerariesDay1: 'Arrival in Kochi, transfer to wellness resort, Ayurvedic consultation, evening yoga session by the backwaters, organic dinner',
    type: 'Women Only',
    highlights: ['Ayurveda treatments', 'Yoga sessions', 'Cooking classes', 'Nature walks'],
    rating: 4.8,
    safety: 'Women-Friendly',
    groupSize: '6-10 women',
    category: 'domestic',
    inclusions: ['Resort stays', 'Spa treatments', 'All meals', 'Yoga sessions'],
    exclusions: ['Personal shopping', 'Travel insurance']
  },
  {
    id: 'wd-3',
    title: 'Himachal Adventure for Women',
    description: 'Challenge yourself with mountain adventures in the stunning Himalayas. Trek through scenic trails, enjoy bonfire evenings, and capture breathtaking moments in this empowering women-only expedition.',
    placesCovered: 'Manali - Dharamshala - Dalhousie',
    duration: '8 Days 7 Nights',
    bestTimeToVisit: 'March to June, September to November',
    peakSeason: 'April to June',
    midSeason: 'March & September to November',
    startingFrom: '38999',
    thumbnail: '/placeholder.svg',
    itinerariesDay1: 'Arrival in Manali, acclimatization walk, meet fellow adventurers, safety briefing by female trek leader, dinner and bonfire',
    type: 'Women Only',
    highlights: ['Mountain trekking', 'Adventure activities', 'Bonfire evenings', 'Photography workshops'],
    rating: 4.7,
    safety: 'Adventure Safe',
    groupSize: '10-15 women',
    category: 'domestic',
    inclusions: ['Mountain lodges', 'Adventure gear', 'All meals', 'Guide'],
    exclusions: ['Personal equipment', 'Travel insurance']
  },
  // International packages
  {
    id: 'wi-1',
    title: 'Bali Sisterhood Retreat',
    description: 'Discover the magic of Bali with a sisterhood of travelers. Enjoy beach yoga, cultural immersion, spa treatments, and create unforgettable memories in this tropical paradise.',
    placesCovered: 'Ubud - Seminyak - Canggu, Bali',
    duration: '7 Days 6 Nights',
    bestTimeToVisit: 'April to October',
    peakSeason: 'July to August',
    midSeason: 'April to June, September to October',
    startingFrom: '95999',
    thumbnail: '/placeholder.svg',
    itinerariesDay1: 'Arrival in Bali, airport transfer to beachfront resort, welcome beach yoga session, group introduction dinner, evening spa treatment',
    type: 'Women Only',
    highlights: ['Beach yoga sessions', 'Cultural immersion', 'Spa treatments', 'Female-only activities'],
    rating: 4.9,
    safety: 'Ultra Safe',
    groupSize: '8-12 women',
    category: 'international',
    inclusions: ['Flights', 'Visa support', 'Beach resorts', 'Spa treatments'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Optional activities']
  },
  {
    id: 'wi-2',
    title: 'Dubai Ladies Special',
    description: 'Experience luxury and adventure in Dubai with an exclusive ladies-only tour. Shop at premium malls, enjoy desert safaris, indulge in spa treatments, and savor high tea at iconic venues.',
    placesCovered: 'Dubai, UAE',
    duration: '5 Days 4 Nights',
    bestTimeToVisit: 'November to March',
    peakSeason: 'December to February',
    midSeason: 'November & March',
    startingFrom: '89999',
    thumbnail: '/placeholder.svg',
    itinerariesDay1: 'Arrival in Dubai, luxury hotel check-in, ladies-only shopping tour at Dubai Mall, evening at Burj Khalifa, high tea at Atlantis',
    type: 'Women Only',
    highlights: ['Ladies-only shopping tours', 'Desert safari', 'Luxury spa day', 'High tea experiences'],
    rating: 4.8,
    safety: 'Maximum Safety',
    groupSize: '10-15 women',
    category: 'international',
    inclusions: ['Flights', 'Luxury hotels', 'All meals', 'Shopping tours'],
    exclusions: ['Personal shopping', 'Optional activities', 'Travel insurance']
  },
  {
    id: 'wi-3',
    title: 'Thailand Girls Trip',
    description: 'Join fellow women travelers for an exciting adventure in Thailand. Island hop through stunning beaches, learn Thai cooking, enjoy massage workshops, and relax in paradise.',
    placesCovered: 'Bangkok - Phuket - Phi Phi Islands',
    duration: '8 Days 7 Nights',
    bestTimeToVisit: 'November to April',
    peakSeason: 'December to February',
    midSeason: 'November & March to April',
    startingFrom: '115999',
    thumbnail: '/placeholder.svg',
    itinerariesDay1: 'Arrival in Bangkok, temple tours with female guide, visit Wat Pho and Wat Arun, Thai cooking class, evening river cruise',
    type: 'Women Only',
    highlights: ['Island hopping', 'Thai cooking classes', 'Massage workshops', 'Beach relaxation'],
    rating: 4.7,
    safety: 'Women-Friendly',
    groupSize: '12-18 women',
    category: 'international',
    inclusions: ['Flights', 'Hotels', 'Island tours', 'Cooking classes'],
    exclusions: ['Personal expenses', 'Optional activities', 'Travel insurance']
  }
];

export default function Women() {
  const [selectedType, setSelectedType] = useState('domestic');
  const packagesRef = useRef(null);
  
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
  
  const filteredPackages = womenTravelPackages.filter(pkg => pkg.category === selectedType);
  
  return (
    <div className="w-full min-h-screen -mt-16 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroWomen})`,
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
            
            {/* Package Type Selection */}
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

      {/* Women Travel Packages */}
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
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
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

      {/* Why Choose Women-Only Travel */}
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

      {/* Safety Features */}
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

      {/* Testimonials */}
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

      {/* CTA Section */}
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