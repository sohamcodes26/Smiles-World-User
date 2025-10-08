import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, X, Calendar, MapPin, Sun, TrendingUp, Star, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import Highlights from "../components/highlights";
import ItineraryDay from "../components/itineraryDay";
import { usePackageById } from "../hooks/usePackages.jsx";

const PackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const { data: packageData, isLoading, isError } = usePackageById(packageId);

  // --- ADDED: State for the success message from your old code ---
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  // --- ADDED: useEffect to load the PDF library from your old code ---
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading package details...</p>
      </div>
    );
  }

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

  // --- EXPANDED: Destructuring all necessary properties to match your old code and schema ---
  const {
    name,
    shortDescription,
    cardImage,
    duration,
    placesCovered,
    bestTime,
    startingFromPrice,
    itinerary = [],
    highlights = [],
    // You can add these to your schema later if needed
    // inclusions = [],
    // exclusions = [],
    // importantNotes = []
  } = packageData;

  // --- ADDED: PDF download function from your old code (with updated variables) ---
  const downloadPDF = async () => {
    const element = document.createElement('div');
    element.style.width = '210mm';
    element.style.padding = '0';
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; background: white;">
        <div style="position: relative; width: 100%; height: 300px; overflow: hidden;">
          <img src="${cardImage}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 30px;">
            <h1 style="color: white; font-size: 36px; margin: 0; font-weight: bold;">${name}</h1>
          </div>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.8; color: #374151; margin-bottom: 30px; text-align: justify;">
            ${shortDescription}
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;"><strong>Duration:</strong><p>${duration}</p></div>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6;"><strong>Places:</strong><p>${placesCovered}</p></div>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;"><strong>Best Time:</strong><p>${bestTime?.notes || '-'}</p></div>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;"><strong>Peak Season:</strong><p>${bestTime?.peakSeason || '-'}</p></div>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;"><strong>Mid Season:</strong><p>${bestTime?.midSeason || '-'}</p></div>
            <div style="background: #3b82f6; color: white; padding: 15px; border-radius: 8px;"><strong>Price:</strong><p style="font-size: 24px; font-weight: bold;">${startingFromPrice}</p></div>
          </div>
          </div>
      </div>
    `;
    
    if (window.html2pdf) {
      window.html2pdf().from(element).save(`${name.replace(/\s+/g, '_')}_Itinerary.pdf`);
    } else {
      alert('PDF library is still loading. Please try again in a moment.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 -mt-16">
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

        {/* --- ADDED: JSX for Success Message --- */}
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:max-w-md bg-green-500 text-white px-4 py-3 rounded-lg flex items-center justify-between shadow-xl z-50"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">✓</span>
              <span className="font-medium text-sm sm:text-base">Inquiry Submitted Successfully!</span>
            </div>
            <button onClick={() => setShowSuccessMessage(false)} className="ml-2 hover:bg-green-600 rounded-full p-1.5 transition-colors flex-shrink-0">
              <X size={18} />
            </button>
          </motion.div>
        )}

        {/* --- ADDED: JSX for Download Button --- */}
        <motion.button
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          onClick={downloadPDF}
          className={`absolute ${showSuccessMessage ? 'top-40' : 'top-24'} right-4 sm:right-6 sm:top-24 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center space-x-1.5 shadow-lg transition-all duration-300 z-20 text-sm`}
        >
          <Download size={16} />
          <span className="font-medium">Download</span>
        </motion.button>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-2">
            {name}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <p className="text-gray-700 text-lg leading-relaxed">{shortDescription}</p>
        </motion.div>

        {/* --- ADDED: JSX for the 6 Quick Info Cards --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-fr"
        >
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 flex flex-col"><div className="flex items-center space-x-3 mb-2"><Calendar className="text-blue-500" size={24} /><h3 className="text-lg font-semibold text-gray-800">Duration</h3></div><p className="text-gray-600 text-lg mt-auto">{duration}</p></div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 flex flex-col"><div className="flex items-center space-x-3 mb-2"><MapPin className="text-purple-500" size={24} /><h3 className="text-lg font-semibold text-gray-800">Places Covered</h3></div><p className="text-gray-600 mt-auto">{placesCovered}</p></div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 flex flex-col"><div className="flex items-center space-x-3 mb-2"><Sun className="text-green-500" size={24} /><h3 className="text-lg font-semibold text-gray-800">Best Time to Visit</h3></div><p className="text-gray-600 mt-auto">{bestTime?.notes || '-'}</p></div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 flex flex-col"><div className="flex items-center space-x-3 mb-2"><TrendingUp className="text-red-500" size={24} /><h3 className="text-lg font-semibold text-gray-800">Peak Season</h3></div><p className="text-gray-600 mt-auto">{bestTime?.peakSeason || '-'}</p></div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 flex flex-col"><div className="flex items-center space-x-3 mb-2"><Star className="text-orange-500" size={24} /><h3 className="text-lg font-semibold text-gray-800">Mid Season</h3></div><p className="text-gray-600 mt-auto">{bestTime?.midSeason || '-'}</p></div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 flex flex-col"><div className="flex items-center space-x-3 mb-2"><IndianRupee className="text-blue-500" size={24} /><h3 className="text-lg font-semibold text-gray-800">Starting From</h3></div><div className="mt-auto"><p className="text-blue-600 text-2xl font-bold">{startingFromPrice}</p></div></div>
        </motion.div>
        
        <Highlights highlights={highlights} />
        <ItineraryDay fullItinerary={itinerary} />
        
        {/* --- ADDED: JSX for the final Contact section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white text-center mt-8"
        >
          <h2 className="text-3xl font-bold mb-4">Thank You for Your Inquiry!</h2>
          <p className="text-xl mb-6">Our travel consultant will contact you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+911234567890" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Call Us Now</a>
            <a href="mailto:info@smilesworld.com" className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors">Email Us</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackageDetails;