import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const ItineraryDay = ({ fullItinerary, inclusions, exclusions, importantNotes }) => {
  if (!fullItinerary || fullItinerary.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <span className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
          <Calendar size={20} />
        </span>
        Detailed Itinerary
      </h2>

      <div className="space-y-6 mb-8">
        {fullItinerary.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 rounded-r-xl hover:bg-blue-50 transition-colors"
          >
            {/* --- FIX: Use the 'dayTitle' property from the database --- */}
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {day.dayTitle}
            </h3>

            {/* --- FIX: Use the 'description' property for the day's details --- */}
            {day.description && (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{day.description}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* The rest of the component for Inclusions, Exclusions, etc. remains the same */}
      {inclusions && inclusions.length > 0 && (
        <div className="mb-8 border-t pt-8">
          {/* ... Inclusions JSX ... */}
        </div>
      )}
      {exclusions && exclusions.length > 0 && (
        <div className="mb-8 border-t pt-8">
          {/* ... Exclusions JSX ... */}
        </div>
      )}
      {importantNotes && importantNotes.length > 0 && (
        <div className="border-t pt-8">
          {/* ... Important Notes JSX ... */}
        </div>
      )}
    </motion.div>
  );
};

export default ItineraryDay;