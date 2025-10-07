import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Highlights = ({ highlights }) => {
  // Return null if no highlights data
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-8 mb-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
          <Sparkles size={20} />
        </span>
        Package Highlights
      </h2>
      
      <div className="space-y-8">
        {highlights.map((highlight, index) => (
          <div key={index} className="border-l-4 border-purple-500 pl-6 py-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{highlight.title}</h3>
            <ul className="space-y-3">
              {highlight.items && highlight.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-3">
                  <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Highlights;
