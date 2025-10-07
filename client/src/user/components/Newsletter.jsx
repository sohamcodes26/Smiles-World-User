import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-20 px-4 bg-yellow-50"> {/* Background changed */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-[#2A3A5B]">
            Stay Updated with Travel Tips & Stories
          </h2>
          <p className="text-lg text-gray-600">
            Subscribe to our newsletter for the latest travel insights, destination guides, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              placeholder="Enter your email" 
              className="flex-1 w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" // Focus ring changed
            />
            <button className="px-8 py-3 font-semibold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg"> {/* Button color changed */}
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Join 10,000+ fellow travelers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;