import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const ItineraryDay = ({ fullItinerary, inclusions, exclusions, importantNotes }) => {
  // Return null if no itinerary data
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

      {/* Day by Day Itinerary */}
      <div className="space-y-6 mb-8">
        {fullItinerary.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 rounded-r-xl hover:bg-blue-50 transition-colors"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Day {day.day}: {day.title}
            </h3>
            {day.activities && day.activities.length > 0 && (
              <ul className="space-y-2">
                {day.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1 font-bold flex-shrink-0">•</span>
                    <span className="text-gray-700 leading-relaxed">{activity}</span>
                  </li>
                ))}
              </ul>
            )}
            {day.description && (
              <p className="text-gray-600 mt-3 italic">{day.description}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Inclusions */}
      {inclusions && inclusions.length > 0 && (
        <div className="mb-8 border-t pt-8">
          <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
            <span className="mr-2">✓</span>
            Inclusions
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start space-x-3 bg-green-50 p-3 rounded-lg">
                <span className="text-green-600 mt-0.5 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exclusions */}
      {exclusions && exclusions.length > 0 && (
        <div className="mb-8 border-t pt-8">
          <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
            <span className="mr-2">✗</span>
            Exclusions
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start space-x-3 bg-red-50 p-3 rounded-lg">
                <span className="text-red-600 mt-0.5 font-bold flex-shrink-0">✗</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Important Notes */}
      {importantNotes && importantNotes.length > 0 && (
        <div className="border-t pt-8">
          <h3 className="text-2xl font-bold text-amber-600 mb-4 flex items-center">
            <span className="mr-2">⚠</span>
            Important Notes
          </h3>
          <ul className="space-y-2">
            {importantNotes.map((note, index) => (
              <li key={index} className="flex items-start space-x-3 bg-amber-50 p-3 rounded-lg">
                <span className="text-amber-600 mt-0.5 font-bold flex-shrink-0">•</span>
                <span className="text-gray-700">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default ItineraryDay;
