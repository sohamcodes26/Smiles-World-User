import React from 'react';

const TopicCard = ({ emoji, topic, count }) => {
  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="font-bold text-[#2A3A5B] mb-1">{topic}</h3> {/* Text color aligned */}
      <p className="text-sm text-gray-500">{count}</p>
    </div>
  );
};

export default TopicCard;