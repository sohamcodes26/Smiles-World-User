import { motion } from "framer-motion";
import { MapPin, Users, Clock, Star, Heart, ArrowLeft, Shield, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import PackageCard from "../components/packageCard";
import InfoCard from "../components/infoCard";
import heroWomen from "../../assets/group_image.webp";

// Sample international women travel packages
const internationalWomenPackages = [
  {
    id: 'wi-1',
    title: 'Bali Sisterhood Retreat',
    destination: 'Bali, Indonesia',
    duration: '7 Days 6 Nights',
    price: '₹95,999',
    image: '/placeholder.svg',
    highlights: ['Beach yoga sessions', 'Cultural immersion', 'Spa treatments', 'Female-only activities'],
    rating: 4.9,
    safety: 'Ultra Safe',
    groupSize: '8-12 women',
    includes: ['Flights', 'Visa support', 'Insurance']
  },
  {
    id: 'wi-2',
    title: 'Dubai Ladies Special',
    destination: 'Dubai, UAE',
    duration: '5 Days 4 Nights',
    price: '₹89,999',
    image: '/placeholder.svg',
    highlights: ['Ladies-only shopping tours', 'Desert safari', 'Luxury spa day', 'High tea experiences'],
    rating: 4.8,
    safety: 'Maximum Safety',
    groupSize: '10-15 women',
    includes: ['Flights', 'Luxury hotels', 'All meals']
  },
  {
    id: 'wi-3',
    title: 'Thailand Girls Trip',
    destination: 'Bangkok - Phuket',
    duration: '8 Days 7 Nights',
    price: '₹1,15,999',
    image: '/placeholder.svg',
    highlights: ['Island hopping', 'Thai cooking classes', 'Massage workshops', 'Beach relaxation'],
    rating: 4.7,
    safety: 'Women-Friendly',
    groupSize: '12-18 women',
    includes: ['Flights', 'Hotels', 'Island tours']
  },
  {
    id: 'wi-4',
    title: 'Singapore Shopping Extravaganza',
    destination: 'Singapore',
    duration: '4 Days 3 Nights',
    price: '₹75,999',
    image: '/placeholder.svg',
    highlights: ['Orchard Road shopping', 'Gardens by the Bay', 'Food tours', 'Marina Bay experience'],
    rating: 4.6,
    safety: 'Super Safe',
    groupSize: '8-14 women',
    includes: ['Flights', 'City hotels', 'Shopping vouchers']
  }
];

export default function WomenTravelInternational() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Navbar with absolute positioning */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-transparent">
          <div className="bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
            <Navbar />
          </div>
        </div>
        
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroWomen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Link to="/women" className="inline-flex items-center text-white/90 hover:text-white mb-8 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Women Travel
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              🌍 Women's International Adventures
            </motion.h1>
            <motion.p 
              className="text-base sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Explore the world safely with fellow women adventurers. 
              International tours designed with women's safety, comfort, and interests in mind.
            </motion.p>
            
            <div className="flex justify-center flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span>Visa Support</span>
              </div>
              <div className="flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>Women-Only Groups</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <Plane className="w-4 h-4" />
                <span>Flights Included</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* International Women Tours */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internationalWomenPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <PackageCard
                  packageData={{
                    id: pkg.id,
                    title: pkg.title,
                    description: `${pkg.duration} international women-only tour. ${pkg.highlights.join(', ')}.`,
                    duration: pkg.duration,
                    placesCovered: pkg.destination,
                    startingFrom: pkg.price,
                    type: 'Women Only International',
                    thumbnail: pkg.image,
                    rating: pkg.rating,
                    highlights: pkg.highlights,
                    safety: pkg.safety,
                    groupSize: pkg.groupSize,
                    includes: pkg.includes
                  }}
                  theme="pink"
                  delay={0.1 * index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Safety Features */}
      <section className="py-16 px-4 bg-pink-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              International Travel Made Safe & Easy
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive support for worry-free international adventures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛂",
                title: "Complete Visa Support",
                description: "End-to-end visa assistance, documentation help, and embassy coordination"
              },
              {
                icon: "✈️",
                title: "Premium Flight Experience",
                description: "Carefully selected airlines with good safety records and women-friendly policies"
              },
              {
                icon: "🏨",
                title: "Verified Accommodations",
                description: "Women-safe hotels in prime locations with excellent security and reviews"
              },
              {
                icon: "📱",
                title: "Global Connectivity",
                description: "International SIM cards, WiFi access, and 24/7 communication support"
              },
              {
                icon: "🗣️",
                title: "Language Assistance",
                description: "Local female guides and translators who understand women's needs"
              },
              {
                icon: "🚨",
                title: "Emergency Support",
                description: "Embassy contacts, medical assistance, and emergency evacuation coverage"
              }
            ].map((feature, index) => (
              <InfoCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.1 * index}
                variant="pink"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Popular International Destinations for Women
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { country: "Dubai, UAE", emoji: "🏙️", reason: "Ultra-safe, luxury shopping" },
              { country: "Singapore", emoji: "🌸", reason: "Clean, safe, food paradise" },
              { country: "Bali, Indonesia", emoji: "🏝️", reason: "Spiritual, wellness-focused" },
              { country: "Thailand", emoji: "🏖️", reason: "Beautiful beaches, culture" },
              { country: "Malaysia", emoji: "🏛️", reason: "Diverse culture, great food" },
              { country: "Japan", emoji: "🗾", reason: "Safe, unique experiences" },
              { country: "South Korea", emoji: "🏯", reason: "K-culture, beauty tourism" },
              { country: "Nepal", emoji: "🏔️", reason: "Spiritual journeys, nature" }
            ].map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-6 bg-white rounded-3xl shadow-2xl border border-gray-200 hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-3">{dest.emoji}</div>
                <h3 className="font-bold text-foreground mb-2">{dest.country}</h3>
                <p className="text-sm text-muted-foreground">{dest.reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Explore the World Safely?
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of confident women who have traveled internationally with us. 
              Your dream destination awaits!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center">
                📞 Call Women's Travel Expert
              </button>
              <button className="bg-white hover:bg-pink-50 text-pink-500 px-8 py-3 rounded-full border-2 border-pink-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center">
                💬 Join Women's Travel Community
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}