import { motion } from "framer-motion";
import { MapPin, Calendar, Sun, TrendingUp, Star, IndianRupee, FileText, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InquiryModal from "./inquiryModal";

// Reads the list of unlocked package IDs from Local Storage
const getUnlockedPackages = () => {
  try {
    return JSON.parse(localStorage.getItem('unlockedPackages') || '[]');
  } catch (error) {
    console.error("Could not read from Local Storage", error);
    return [];
  }
};

const PackageCard = ({ 
  packageData, 
  theme = "default",
  delay = 0 
}) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
  };
  
  const {
    _id, name, shortDescription, duration, placesCovered, bestTime,
    startingFromPrice, itinerary, tag, cardImage
  } = packageData;

  const itineraryDay1 = itinerary && itinerary.length > 0 ? itinerary[0].description : "Details available upon request.";
  const peakSeason = bestTime?.peakSeason;
  const midSeason = bestTime?.midSeason;

  const styles = {
    card: "bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300",
    typeTag: tag === "domestic" ? "bg-green-500 text-white" : 
             tag === "international" ? "bg-purple-500 text-white" : 
             "bg-blue-500 text-white",
    button: "bg-blue-600 hover:bg-blue-700 text-white"
  };

  // It now checks if the package is unlocked before navigating
  const handleGetDetailsClick = (e) => {
    e.stopPropagation();
    const unlockedPackages = getUnlockedPackages();

    if (unlockedPackages.includes(_id)) {
      // If package ID is found, navigate directly
      navigate(`/packages/${_id}`);
    } else {
      // Otherwise, show the inquiry form
      setShowInquiry(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={`${styles.card} group flex flex-col`}
        style={{ height: 'auto' }}
      >
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img src={cardImage || '/placeholder.svg'} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
          {tag && <div className="absolute top-3 right-3"><span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles.typeTag}`}>{tag}</span></div>}
        </div>

        <div className="p-4 space-y-2 flex flex-col flex-grow">
          {/* --- MODIFICATION: Title truncation is now conditional on 'showMore' state --- */}
          <div><h3 className={`text-lg font-bold text-gray-800 mb-1 ${!showMore ? 'truncate' : ''}`}>{name}</h3></div>

          <div className="mb-2">
            {shortDescription && shortDescription.length > 95 && !showMore ? (
              <p className="text-gray-600 text-sm">{truncateText(shortDescription, 95)}... <button onClick={() => setShowMore(true)} className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">Show More</button></p>
            ) : (
              <p className="text-gray-600 text-sm">{shortDescription}{shortDescription && shortDescription.length > 95 && showMore && (<> <button onClick={() => setShowMore(false)} className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">Show Less</button></>)}</p>
            )}
          </div>

          <div className="space-y-2">
            {duration && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Calendar size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className={!showMore ? "truncate" : ""}>
                  <strong>Duration:</strong> {duration}
                </p>
              </div>
            )}
            {placesCovered && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <MapPin size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className={!showMore ? "truncate" : ""}>
                  <strong>Places:</strong> {placesCovered}
                </p>
              </div>
            )}
            {peakSeason && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <TrendingUp size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className={!showMore ? "truncate" : ""}>
                  <strong>Peak Season:</strong> {peakSeason}
                </p>
              </div>
            )}
            {midSeason && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Star size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <p className={!showMore ? "truncate" : ""}>
                  <strong>Mid Season:</strong> {midSeason}
                </p>
              </div>
            )}
            {itineraryDay1 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="flex items-center space-x-2 font-medium text-gray-800 text-sm mb-1">
                  <FileText size={16} className="text-blue-500 flex-shrink-0" />
                  <span>Day 1 Itinerary</span>
                </h4>
                <p className={`text-xs text-gray-600 ml-6 ${!showMore ? 'truncate' : ''}`}>
                  {itineraryDay1}
                </p>
              </div>
            )}
          </div>
           
          {startingFromPrice && (<div className="flex items-center space-x-2 text-lg text-blue-600 font-semibold mt-2"><IndianRupee size={18} className="text-green-600 flex-shrink-0" /><span>{startingFromPrice}</span></div>)}
          
          <div className="mt-auto pt-3">
            <button
              onClick={handleGetDetailsClick}
              className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${styles.button}`}
              type="button"
            >
              Get Full Details
            </button>
          </div>
        </div>
      </motion.div>

      <InquiryModal
        isOpen={showInquiry}
        onClose={() => setShowInquiry(false)}
        modalData={{ packageTitle: name, packagePrice: startingFromPrice, destination: placesCovered, duration, type: tag }}
        packageData={packageData}
        theme={theme}
      />
    </>
  );
};

export default PackageCard;