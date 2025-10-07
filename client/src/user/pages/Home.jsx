import { motion } from "framer-motion";
import { MapPin, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PackageCard from "../components/packageCard";
import InfoCard from "../components/infoCard";

// Updated package data with new structure
const travelPackages = [
  {
    id: 1,
    title: "Mystical Mountains of Manali",
    description: "Experience the thrilling heights and serene beauty of the Himalayas in this adventurous trip to Manali. Discover snow-capped peaks, pristine valleys, and vibrant local culture while enjoying exciting activities like paragliding, river rafting, and mountain trekking.",
    duration: "5 Days, 4 Nights",
    placesCovered: "Manali, Solang Valley, Rohtang Pass, Kullu",
    bestTimeToVisit: "October to June",
    peakSeason: "December to February (Snow Season)",
    midSeason: "March to May & September to November",
    startingFrom: "25000",
    itinerariesDay1: "Arrival in Manali, check-in to hotel, local sightseeing including Hadimba Temple and Mall Road, evening at leisure",
    // Keeping old fields for backward compatibility
    startDate: "Oct 15, 2025",
    endDate: "Oct 20, 2025",
    places: ["Manali", "Solang Valley", "Rohtang Pass"],
    timeline: [{ description: "Arrival and acclimatization in Manali." }],
    price: 25000,
    availableSeats: 12,
    type: "Adventure",
    thumbnail: "https://images.unsplash.com/photo-1626621341526-45281a88a374?q=80&w=2070&auto=format&fit=crop",
    shortDescription: "Experience the thrilling heights and serene beauty of the Himalayas in this adventurous trip to Manali."
  },
  {
    id: 2,
    title: "Golden Triangle Glory",
    description: "A classic journey through India's most iconic cities, witnessing the grandeur of Mughal and Rajput architecture. Explore the bustling streets of Delhi, marvel at the Taj Mahal in Agra, and immerse yourself in the royal heritage of Jaipur.",
    duration: "6 Days, 5 Nights",
    placesCovered: "Delhi, Agra, Jaipur",
    bestTimeToVisit: "October to March",
    peakSeason: "November to February",
    midSeason: "October & March",
    startingFrom: "35000",
    itinerariesDay1: "Arrival in Delhi, airport pickup, check-in to hotel, evening visit to India Gate and Connaught Place",
    fullItinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        activities: [
          "Arrive at Delhi International Airport and transfer to hotel",
          "Evening visit to India Gate and Connaught Place",
          "Welcome dinner at a local restaurant",
          "Overnight stay in Delhi"
        ]
      },
      {
        day: 2,
        title: "Delhi City Tour",
        activities: [
          "Visit Red Fort and Jama Masjid",
          "Explore Chandni Chowk market with rickshaw ride",
          "Visit Qutub Minar and Humayun's Tomb",
          "Drive past President House and Parliament",
          "Overnight stay in Delhi"
        ]
      },
      {
        day: 3,
        title: "Delhi to Agra",
        activities: [
          "Morning drive to Agra (Approx. 210 km / 4 hrs)",
          "Check-in to hotel and refresh",
          "Visit Agra Fort - UNESCO World Heritage Site",
          "Sunset visit to Mehtab Bagh for Taj Mahal view",
          "Overnight stay in Agra"
        ]
      },
      {
        day: 4,
        title: "Agra to Jaipur via Fatehpur Sikri",
        activities: [
          "Early morning visit to Taj Mahal at sunrise",
          "Return to hotel for breakfast",
          "Drive to Jaipur with enroute visit to Fatehpur Sikri",
          "Arrive in Jaipur and check-in to hotel",
          "Overnight stay in Jaipur"
        ]
      },
      {
        day: 5,
        title: "Jaipur Sightseeing",
        activities: [
          "Morning visit to Amber Fort with elephant/jeep ride",
          "Photo stop at Jal Mahal (Water Palace)",
          "Visit City Palace and Jantar Mantar",
          "Photo stop at Hawa Mahal (Palace of Winds)",
          "Evening free for shopping at local bazaars",
          "Overnight stay in Jaipur"
        ]
      },
      {
        day: 6,
        title: "Jaipur to Delhi & Departure",
        activities: [
          "After breakfast, drive back to Delhi (Approx. 260 km / 5 hrs)",
          "Optional shopping at Delhi markets",
          "Transfer to airport for onward journey"
        ]
      }
    ],
    highlights: [
      {
        title: "Delhi Highlights",
        items: [
          "Red Fort & Jama Masjid – Historically magnificent Mughal architecture",
          "India Gate & Connaught Place – Iconic landmarks and vibrant shopping",
          "Qutub Minar – Architecturally stunning UNESCO World Heritage Site",
          "Chandni Chowk – Bustling markets with authentic street food"
        ]
      },
      {
        title: "Agra Highlights",
        items: [
          "Taj Mahal – Eternally beautiful monument of love",
          "Agra Fort – Majestically impressive red sandstone fortress",
          "Fatehpur Sikri – Historically rich abandoned Mughal city",
          "Mehtab Bagh – Picturesquely scenic sunset views of Taj Mahal"
        ]
      },
      {
        title: "Jaipur Highlights",
        items: [
          "Amber Fort – Regally magnificent hilltop palace",
          "City Palace – Opulently beautiful royal residence",
          "Hawa Mahal – Intricately designed Palace of Winds",
          "Jantar Mantar – Astronomically fascinating observatory",
          "Local Bazaars – Vibrantly colorful markets for shopping"
        ]
      }
    ],
    inclusions: [
      "Accommodation in 3/4 star hotels",
      "Daily breakfast",
      "All transfers and sightseeing by AC vehicle",
      "Professional English-speaking guide",
      "Monument entrance fees as per itinerary",
      "All applicable taxes"
    ],
    exclusions: [
      "Airfare/train fare",
      "Lunch and dinner",
      "Camera fees at monuments",
      "Personal expenses and tips",
      "Travel insurance",
      "Any items not mentioned in inclusions"
    ],
    importantNotes: [
      "Taj Mahal is closed on Fridays",
      "Dress modestly when visiting religious sites",
      "Carry valid ID proof at all times",
      "Best time to visit is October to March",
      "Book at least 2 weeks in advance for better rates"
    ],
    // Keeping old fields for backward compatibility
    startDate: "Nov 05, 2025",
    endDate: "Nov 10, 2025",
    places: ["Delhi", "Agra", "Jaipur"],
    timeline: [{ description: "Explore the historic capital city of Delhi." }],
    price: 35000,
    availableSeats: 8,
    type: "Culture",
    thumbnail: "https://images.unsplash.com/photo-1582512423565-d4b38ce71939?q=80&w=1974&auto=format&fit=crop",
    shortDescription: "A classic journey through India's most iconic cities, witnessing the grandeur of Mughal and Rajput architecture."
  },
  {
    id: 3,
    title: "Kerala Backwaters Bliss",
    description: "Cruise through the serene backwaters of Kerala and enjoy the lush green landscapes of God's Own Country. Experience traditional houseboat stays, spice plantations, and witness the unique ecosystem of the backwaters.",
    duration: "7 Days, 6 Nights",
    placesCovered: "Kochi, Alleppey, Munnar, Thekkady",
    bestTimeToVisit: "September to March",
    peakSeason: "December to February",
    midSeason: "September to November & March",
    startingFrom: "40000",
    itinerariesDay1: "Arrival in Kochi, transfer to hotel, visit Chinese Fishing Nets, St. Francis Church, and Dutch Palace",
    // Keeping old fields for backward compatibility
    startDate: "Dec 01, 2025",
    endDate: "Dec 07, 2025",
    places: ["Kochi", "Alleppey", "Munnar"],
    timeline: [{ description: "Arrival in Kochi, the Queen of the Arabian Sea." }],
    price: 40000,
    availableSeats: 15,
    type: "Relaxation",
    thumbnail: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1935&auto=format&fit=crop",
    shortDescription: "Cruise through the serene backwaters of Kerala and enjoy the lush green landscapes of God's Own Country."
  },
  {
    id: 4,
    title: "Goan Beach Paradise",
    description: "Relax on the sun-kissed beaches, enjoy vibrant nightlife, and savor delicious seafood in Goa. Experience the perfect blend of Portuguese colonial architecture, tropical beaches, and laid-back coastal lifestyle.",
    duration: "5 Days, 4 Nights",
    placesCovered: "North Goa, South Goa, Panaji, Old Goa",
    bestTimeToVisit: "November to February",
    peakSeason: "December to January",
    midSeason: "November & February to March",
    startingFrom: "22000",
    itinerariesDay1: "Arrival in Goa, check-in to beach resort, relaxation at Calangute Beach, evening at leisure",
    // Keeping old fields for backward compatibility
    startDate: "Jan 10, 2026",
    endDate: "Jan 15, 2026",
    places: ["North Goa", "South Goa", "Panaji"],
    timeline: [{ description: "Check into your beachside resort." }],
    price: 22000,
    availableSeats: 20,
    type: "Leisure",
    thumbnail: "https://images.unsplash.com/photo-1570222646968-ab23c1a2e737?q=80&w=1974&auto=format&fit=crop",
    shortDescription: "Relax on the sun-kissed beaches, enjoy vibrant nightlife, and savor delicious seafood in Goa."
  },
  {
    id: 5,
    title: "Regal Rajasthan",
    description: "Explore the majestic forts, opulent palaces, and rich cultural heritage of the land of kings. Journey through the pink city of Jaipur, the city of lakes Udaipur, and the blue city of Jodhpur while experiencing royal hospitality.",
    duration: "8 Days, 7 Nights",
    placesCovered: "Jaipur, Udaipur, Jodhpur, Pushkar",
    bestTimeToVisit: "October to March",
    peakSeason: "November to February",
    midSeason: "October & March",
    startingFrom: "45000",
    itinerariesDay1: "Arrival in Jaipur, check-in to heritage hotel, visit City Palace and Jantar Mantar, evening at local markets",
    // Keeping old fields for backward compatibility
    startDate: "Feb 12, 2026",
    endDate: "Feb 20, 2026",
    places: ["Jaipur", "Udaipur", "Jodhpur"],
    timeline: [{ description: "Discover the Pink City, Jaipur." }],
    price: 45000,
    availableSeats: 10,
    type: "Culture",
    thumbnail: "https://images.unsplash.com/photo-1599661046227-14e7a70d3240?q=80&w=1932&auto=format&fit=crop",
    shortDescription: "Explore the majestic forts, opulent palaces, and rich cultural heritage of the land of kings."
  },
  {
    id: 6,
    title: "Spiritual Rishikesh Retreat",
    description: "Rejuvenate your mind, body, and soul in the yoga capital of the world, nestled in the Himalayan foothills. Experience authentic yoga sessions, meditation by the Ganges, and spiritual awakening in this sacred city.",
    duration: "5 Days, 4 Nights",
    placesCovered: "Rishikesh, Haridwar",
    bestTimeToVisit: "September to April",
    peakSeason: "February to April",
    midSeason: "September to January & May",
    startingFrom: "18000",
    itinerariesDay1: "Arrival in Rishikesh, check-in to ashram/hotel, evening Ganga Aarti at Triveni Ghat, yoga orientation session",
    // Keeping old fields for backward compatibility
    startDate: "Mar 05, 2026",
    endDate: "Mar 10, 2026",
    places: ["Rishikesh", "Haridwar"],
    timeline: [{ description: "Yoga and meditation by the Ganges." }],
    price: 18000,
    availableSeats: 25,
    type: "Wellness",
    thumbnail: "https://images.unsplash.com/photo-1591732588741-b38a75b2a592?q=80&w=2070&auto=format&fit=crop",
    shortDescription: "Rejuvenate your mind, body, and soul in the yoga capital of the world, nestled in the Himalayan foothills."
  }
];

// Data for the "Why Choose Us" section
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
  return (
    // Using a fragment as the top-level element since Layout is removed
    <>
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden -mt-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop')`,
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
                className="text-2xl md:text-4xl text-white/80 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Explore more. Smile wider.
              </motion.p>
            </div>

            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Discover magical destinations with our carefully crafted travel packages.
              Each journey is designed to create unforgettable memories and bring smiles to your adventures.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/customize" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                <Sparkles className="mr-2" size={18} />
                Customize Your Trip
              </Link>
              <Link to="/women" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 transition-colors">
                <Heart className="mr-2" size={18} />
                Women's Safe Travel
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
      </section>

      {/* Featured Packages Section */}
      <section className="py-20 px-4 bg-[#dcf0ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              ✨ Featured Travel Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hand-picked destinations that promise incredible experiences. Request full details to learn more about any package.
            </p>
          </motion.div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelPackages.slice(0, 6).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Corrected prop name from 'package' to 'packageData' */}
                <PackageCard packageData={pkg} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
            {/* Refactored to use the InfoCard component */}
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

      {/* CTA Section */}
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
                <Heart className="mr-2" size={20} />
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}