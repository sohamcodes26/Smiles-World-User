import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Sun, TrendingUp, Star, IndianRupee, FileText } from "lucide-react";
import { useState } from "react";
import InquiryModal from "./inquiryModal";

const packageCard = ({ 
  packageData, 
  theme = "default", // "default", "pink", "orange", "yellow"
  delay = 0 
}) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Helper function to truncate text at last complete word
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
  };

  // Extract data from packageData object
  const {
    id,
    title,
    description,
    duration,
    placesCovered,
    bestTimeToVisit,
    peakSeason,
    midSeason,
    startingFrom,
    itinerariesDay1,
    // Keep existing fields for backward compatibility
    startDate,
    endDate,
    places = [],
    timeline = [],
    price,
    availableSeats,
    type,
    thumbnail,
    shortDescription,
    inclusions = [],
    exclusions = []
  } = packageData;

  // Keep for backward compatibility if needed
  const visiblePlaces = places.slice(0, 2);
  const hiddenPlacesCount = places.length - 2;

  // Theme variants
  const getThemeStyles = () => {
    switch(theme) {
      case "pink":
        return {
          card: "bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-all duration-300",
          typeTag: "bg-pink-500 text-white",
          button: "bg-pink-500 hover:bg-pink-600 text-white"
        };
      case "orange":
        return {
          card: "bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300",
          typeTag: "bg-orange-500 text-white",
          button: "bg-orange-500 hover:bg-orange-600 text-white"
        };
      case "yellow":
        return {
          card: "bg-white rounded-2xl shadow-lg border border-yellow-100 overflow-hidden hover:shadow-xl transition-all duration-300",
          typeTag: "bg-yellow-500 text-white",
          button: "bg-yellow-500 hover:bg-yellow-600 text-white"
        };
      default:
        return {
          card: "bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300",
          typeTag: type === "Adventure" ? "bg-green-500 text-white" : 
                   type === "Culture" ? "bg-purple-500 text-white" : 
                   "bg-blue-500 text-white",
          button: "bg-blue-600 hover:bg-blue-700 text-white"
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={`${styles.card} group flex flex-col`}
        style={{ height: showMore ? 'auto' : undefined }}
      >
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={thumbnail || '/placeholder.svg'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.typeTag}`}>
              {type}
            </span>
          </div>
        </div>

        {/* Package Info */}
        <div className="p-2.5 space-y-1.5 flex flex-col flex-grow">
          {/* Title */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          </div>

          {/* Description with Show More functionality */}
          <div className="mb-2">
            {description && description.length > 0 && !showMore ? (
              <p className="text-gray-600 text-sm">
                {truncateText(description, 95)}...{" "}
                <button
                  onClick={() => setShowMore(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                >
                  Show More
                </button>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                {description || shortDescription}
                {description && description.length > 80 && showMore && (
                  <>
                    {" "}
                    <button
                      onClick={() => setShowMore(false)}
                      className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                    >
                      Show Less
                    </button>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Duration */}
          {duration && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} className="text-blue-500 flex-shrink-0" />
              <span className="truncate"><strong>Duration:</strong> {duration}</span>
            </div>
          )}

          {/* Places Covered */}
          {placesCovered && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin size={16} className="text-blue-500 flex-shrink-0" />
              <span className="truncate"><strong>Places Covered:</strong> {placesCovered}</span>
            </div>
          )}

          {/* Best Time to Visit */}
          {bestTimeToVisit && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sun size={16} className="text-green-500 flex-shrink-0" />
              <span className="truncate"><strong>Best Time to Visit:</strong> {bestTimeToVisit}</span>
            </div>
          )}

          {/* Peak Season */}
          {peakSeason && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp size={16} className="text-red-500 flex-shrink-0" />
              <span className="truncate"><strong>Peak Season:</strong> {peakSeason}</span>
            </div>
          )}

          {/* Mid Season */}
          {midSeason && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star size={16} className="text-orange-500 flex-shrink-0" />
              <span className="truncate"><strong>Mid Season:</strong> {midSeason}</span>
            </div>
          )}

          {/* Starting From */}
          {startingFrom && (
            <div className="flex items-center space-x-2 text-lg text-blue-600">
              <IndianRupee size={18} className="text-green-600 flex-shrink-0" />
              <span>Starting From: ₹{startingFrom}</span>
            </div>
          )}

          {/* Itineraries Day 1 */}
          {itinerariesDay1 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="flex items-center space-x-2 font-medium text-gray-800 text-sm mb-1">
                <FileText size={16} className="text-blue-500 flex-shrink-0" />
                <span>Day 1 Itinerary</span>
              </h4>
              <p className="text-xs text-gray-600 ml-6 line-clamp-2">{itinerariesDay1}</p>
            </div>
          )}

          {/* Button - Pushed to bottom */}
          <div className="mt-auto pt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInquiry(true);
              }}
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
        modalData={{
          packageTitle: title,
          packagePrice: startingFrom || price,
          destination: placesCovered || places?.join(", "),
          duration: duration || `${startDate} - ${endDate}`,
          type: type
        }}
        packageData={packageData}
        theme={theme}
      />
    </>
  );
};

export default packageCard;