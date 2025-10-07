import { motion } from "framer-motion";
import { MapPin, Users, Clock, Star, Heart, ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import PackageCard from "../components/packageCard";
import InfoCard from "../components/infoCard";
import heroWomen from "../../assets/group_image.webp";

// Sample domestic women travel packages
const domesticWomenPackages = [
  {
    id: 'wd-1',
    title: 'Rajasthan Queens Heritage Tour',
    destination: 'Jaipur - Udaipur - Jodhpur',
    duration: '7 Days 6 Nights',
    price: '₹35,999',
    image: '/placeholder.svg',
    highlights: ['Women-only group', 'Female guides', 'Safe accommodations', 'Cultural workshops'],
    rating: 4.9,
    safety: 'Maximum Safety',
    groupSize: '8-12 women'
  },
  {
    id: 'wd-2',
    title: 'Kerala Wellness Retreat',
    destination: 'Munnar - Alleppey - Kochi',
    duration: '6 Days 5 Nights',
    price: '₹42,999',
    image: '/placeholder.svg',
    highlights: ['Ayurveda treatments', 'Yoga sessions', 'Cooking classes', 'Nature walks'],
    rating: 4.8,
    safety: 'Women-Friendly',
    groupSize: '6-10 women'
  },
  {
    id: 'wd-3',
    title: 'Himachal Adventure for Women',
    destination: 'Manali - Dharamshala - Dalhousie',
    duration: '8 Days 7 Nights',
    price: '₹38,999',
    image: '/placeholder.svg',
    highlights: ['Mountain trekking', 'Adventure activities', 'Bonfire evenings', 'Photography workshops'],
    rating: 4.7,
    safety: 'Adventure Safe',
    groupSize: '10-15 women'
  }
];

export default function WomenTravelDomestic() {
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
              🇮🇳 Women's Domestic Tours
            </motion.h1>
            <motion.p 
              className="text-base sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Explore India safely with fellow women travelers. 
              Specially curated experiences designed for women, by women.
            </motion.p>
            
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span>100% Safe</span>
              </div>
              <div className="flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>Women-Only Groups</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span>Expert Female Guides</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domestic Women Tours */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domesticWomenPackages.map((pkg, index) => (
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
                    description: `${pkg.duration} women-only travel experience. ${pkg.highlights.join(', ')}.`,
                    duration: pkg.duration,
                    placesCovered: pkg.destination,
                    startingFrom: pkg.price,
                    type: 'Women Only',
                    thumbnail: pkg.image,
                    rating: pkg.rating,
                    highlights: pkg.highlights,
                    safety: pkg.safety,
                    groupSize: pkg.groupSize
                  }}
                  theme="pink"
                  delay={0.1 * index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 px-4 bg-pink-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Safety is Our Priority
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive safety measures for worry-free domestic travel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Verified Accommodations",
                description: "Pre-screened, women-friendly hotels and resorts with excellent safety records"
              },
              {
                icon: "👩‍🏫",
                title: "Female Tour Guides",
                description: "Experienced female guides who understand women travelers' needs and preferences"
              },
              {
                icon: "🚗",
                title: "Safe Transportation",
                description: "Reliable, well-maintained vehicles with verified drivers and GPS tracking"
              },
              {
                icon: "📱",
                title: "24/7 Support",
                description: "Round-the-clock assistance with dedicated women's helpline support"
              },
              {
                icon: "👥",
                title: "Small Groups",
                description: "Intimate group sizes (6-15 women) for better safety and personalized attention"
              },
              {
                icon: "🏥",
                title: "Medical Support",
                description: "First aid trained guides and tie-ups with local hospitals and clinics"
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

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Our Women Travelers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Priya Mehta",
                location: "Mumbai",
                review: "The Rajasthan women's tour was incredible! I felt safe throughout and made amazing friends. The female guide was knowledgeable and caring.",
                rating: 5,
                tour: "Rajasthan Queens Heritage Tour"
              },
              {
                name: "Sneha Patel",
                location: "Bangalore",
                review: "Kerala wellness retreat was exactly what I needed. The yoga sessions and Ayurveda treatments were rejuvenating. Highly recommend for solo women travelers!",
                rating: 5,
                tour: "Kerala Wellness Retreat"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-pink-50 text-pink-700 rounded border border-pink-200">
                    {testimonial.tour}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}