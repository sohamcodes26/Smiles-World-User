import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Highlights from "../components/highlights";
import ItineraryDay from "../components/itineraryDay";

// --- IMPORT THE CUSTOM HOOK ---
import { usePackageById } from "../hooks/usePackages.jsx"; // Adjust path as needed

const PackageDetails = () => {
  // --- GET PACKAGE ID FROM URL ---
  const { packageId } = useParams();
  const navigate = useNavigate();

  // --- FETCH PACKAGE DATA USING THE HOOK ---
  const { data: packageData, isLoading, isError } = usePackageById(packageId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading package details...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isError || !packageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the package you're looking for.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  // --- UPDATED: Destructuring properties to match backend schema ---
  const {
    name,
    shortDescription,
    cardImage,
    itinerary = [],
    highlights = [],
  } = packageData;

  return (
    <div className="min-h-screen bg-gray-50 -mt-16">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src={cardImage || '/placeholder.svg'} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 sm:left-6 bg-white/90 hover:bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-lg z-20"
        >
          <ArrowLeft size={18} />
          <span className="font-medium hidden sm:inline">Back</span>
        </button>
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            {name}
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <p className="text-gray-700 text-lg leading-relaxed">{shortDescription}</p>
        </motion.div>
        
        {/* Pass the correct prop names to child components */}
        <Highlights highlights={highlights} />
        <ItineraryDay fullItinerary={itinerary} />
      </div>
    </div>
  );
};

export default PackageDetails;