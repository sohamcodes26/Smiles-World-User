import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Sun, TrendingUp, Star, IndianRupee, ArrowLeft, Download, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Highlights from "../components/highlights";
import ItineraryDay from "../components/itineraryDay";

const PackageDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state?.packageData;
  const contentRef = useRef(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Load html2pdf library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // If no package data, redirect to home
  if (!packageData) {
    useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const {
    title,
    description,
    duration,
    placesCovered,
    bestTimeToVisit,
    peakSeason,
    midSeason,
    startingFrom,
    thumbnail,
    fullItinerary = [],
    highlights = [],
    inclusions = [],
    exclusions = [],
    importantNotes = []
  } = packageData;

  // Function to generate and download PDF
  const downloadPDF = async () => {
    // Create a clone of the content for PDF generation
    const element = document.createElement('div');
    element.style.width = '210mm'; // A4 width
    element.style.background = 'white';
    element.style.padding = '0';
    
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <!-- Header Image -->
        <div style="position: relative; width: 100%; height: 300px; overflow: hidden;">
          <img src="${thumbnail}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 30px;">
            <h1 style="color: white; font-size: 36px; margin: 0; font-weight: bold;">${title}</h1>
          </div>
        </div>

        <!-- Description -->
        <div style="padding: 30px; background: white;">
          <p style="font-size: 16px; line-height: 1.8; color: #374151; margin-bottom: 30px; text-align: justify;">
            ${description}
          </p>

          <!-- Info Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #3b82f6; margin-right: 8px;">📅</span>
                <strong style="color: #1f2937; font-size: 14px;">Duration</strong>
              </div>
              <p style="color: #4b5563; margin: 0; font-size: 14px;">${duration}</p>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #8b5cf6; margin-right: 8px;">📍</span>
                <strong style="color: #1f2937; font-size: 14px;">Places Covered</strong>
              </div>
              <p style="color: #4b5563; margin: 0; font-size: 13px;">${placesCovered}</p>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #10b981; margin-right: 8px;">☀️</span>
                <strong style="color: #1f2937; font-size: 14px;">Best Time to Visit</strong>
              </div>
              <p style="color: #4b5563; margin: 0; font-size: 14px;">${bestTimeToVisit}</p>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #ef4444; margin-right: 8px;">📈</span>
                <strong style="color: #1f2937; font-size: 14px;">Peak Season</strong>
              </div>
              <p style="color: #4b5563; margin: 0; font-size: 14px;">${peakSeason}</p>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #f59e0b; margin-right: 8px;">⭐</span>
                <strong style="color: #1f2937; font-size: 14px;">Mid Season</strong>
              </div>
              <p style="color: #4b5563; margin: 0; font-size: 14px;">${midSeason}</p>
            </div>

            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 15px; border-radius: 8px; color: white;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="margin-right: 8px;">💰</span>
                <strong style="font-size: 14px;">Starting From</strong>
              </div>
              <p style="margin: 0; font-size: 24px; font-weight: bold;">₹${startingFrom}</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Per Person</p>
            </div>
          </div>

          <!-- Highlights Section -->
          ${highlights && highlights.length > 0 ? `
            <div style="margin-top: 30px; background: #faf5ff; border-left: 4px solid #8b5cf6; padding: 20px; border-radius: 0 8px 8px 0;">
              <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="color: #8b5cf6; margin-right: 10px; font-size: 28px;">✨</span>
                Package Highlights
              </h2>
              ${highlights.map(highlight => `
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #7c3aed; font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">
                    ${highlight.title}
                  </h3>
                  <ul style="margin: 0; padding-left: 0; list-style: none;">
                    ${highlight.items.map(item => `
                      <li style="color: #4b5563; margin-bottom: 6px; padding-left: 20px; position: relative; font-size: 14px; line-height: 1.6;">
                        <span style="position: absolute; left: 0; color: #8b5cf6; font-weight: bold;">•</span>
                        ${item}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Itinerary -->
          ${fullItinerary && fullItinerary.length > 0 ? `
            <div style="margin-top: 30px;">
              <h2 style="color: #1f2937; font-size: 28px; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="background: #3b82f6; color: white; border-radius: 50%; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 20px;">📅</span>
                Detailed Itinerary
              </h2>
              
              ${fullItinerary.map(day => `
                <div style="border-left: 4px solid #3b82f6; padding: 15px 15px 15px 20px; margin-bottom: 20px; background: #f9fafb; border-radius: 0 8px 8px 0;">
                  <h3 style="color: #1f2937; font-size: 18px; font-weight: bold; margin: 0 0 12px 0;">
                    Day ${day.day}: ${day.title}
                  </h3>
                  ${day.activities && day.activities.length > 0 ? `
                    <ul style="margin: 0; padding-left: 0; list-style: none;">
                      ${day.activities.map(activity => `
                        <li style="color: #4b5563; margin-bottom: 8px; padding-left: 20px; position: relative; font-size: 14px; line-height: 1.6;">
                          <span style="position: absolute; left: 0; color: #3b82f6; font-weight: bold;">•</span>
                          ${activity}
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                  ${day.description ? `<p style="color: #4b5563; margin: 10px 0 0 0; font-size: 14px;">${day.description}</p>` : ''}
                </div>
              `).join('')}

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px dashed #d1d5db;">
                <p style="font-size: 20px; font-weight: bold; color: #6b7280; margin: 0;">TOUR ENDS</p>
              </div>
            </div>
          ` : `
            <div style="text-align: center; padding: 30px; color: #6b7280;">
              <p>Detailed itinerary will be shared by our travel consultant.</p>
            </div>
          `}

          <!-- Footer -->
          <div style="margin-top: 40px; padding: 25px; background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; color: white; text-align: center;">
            <h2 style="font-size: 24px; margin: 0 0 15px 0;">Thank You for Your Inquiry!</h2>
            <p style="font-size: 16px; margin: 0 0 20px 0;">
              Our travel consultant will contact you within 24 hours with detailed information.
            </p>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
              <div style="background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 8px; font-size: 14px;">
                📞 Call: +91-1234567890
              </div>
              <div style="background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 8px; font-size: 14px;">
                📧 Email: info@smilesworld.com
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Wait for images to load
    const images = element.getElementsByTagName('img');
    const imagePromises = Array.from(images).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    });

    await Promise.all(imagePromises);

    // Generate PDF using html2pdf
    const opt = {
      margin: 0,
      filename: `${title.replace(/\s+/g, '_')}_Package_Details.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Check if html2pdf is loaded
    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save();
    } else {
      alert('PDF library is loading. Please try again in a moment.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 -mt-16">
      {/* Hero Section with Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={thumbnail || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 sm:left-6 bg-white/90 hover:bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-lg z-20 text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Back</span>
        </button>

        {/* Success Message with Close Button - Mobile Optimized */}
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:max-w-md bg-green-500 text-white px-4 py-3 rounded-lg flex items-center justify-between shadow-xl z-50"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">✓</span>
              <span className="font-medium text-sm sm:text-base">Inquiry Submitted Successfully!</span>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-2 hover:bg-green-600 rounded-full p-1.5 transition-colors flex-shrink-0"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </motion.div>
        )}

        {/* Download Button - Mobile Optimized - Moved down when success message shows */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={downloadPDF}
          className={`absolute ${showSuccessMessage ? 'top-40' : 'top-24'} right-4 sm:right-6 sm:top-24 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center space-x-1.5 shadow-lg transition-all duration-300 z-20 text-sm`}
        >
          <Download size={16} />
          <span className="font-medium">Download</span>
        </motion.button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <p className="text-gray-700 text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Quick Info Cards - Equal Height */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-fr"
        >
          {/* Duration */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="text-blue-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
            </div>
            <p className="text-gray-600 text-lg mt-auto">{duration}</p>
          </div>

          {/* Places Covered */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="text-purple-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Places Covered</h3>
            </div>
            <p className="text-gray-600 mt-auto">{placesCovered}</p>
          </div>

          {/* Best Time to Visit */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <Sun className="text-green-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Best Time to Visit</h3>
            </div>
            <p className="text-gray-600 mt-auto">{bestTimeToVisit}</p>
          </div>

          {/* Peak Season */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="text-red-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Peak Season</h3>
            </div>
            <p className="text-gray-600 mt-auto">{peakSeason}</p>
          </div>

          {/* Mid Season */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <Star className="text-orange-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Mid Season</h3>
            </div>
            <p className="text-gray-600 mt-auto">{midSeason}</p>
          </div>

          {/* Pricing - Same style as other cards */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <IndianRupee className="text-blue-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Starting From</h3>
            </div>
            <div className="mt-auto">
              <p className="text-blue-600 text-2xl font-bold">₹{startingFrom}</p>
              <p className="text-gray-500 text-sm mt-1">Per Person</p>
            </div>
          </div>
        </motion.div>

        {/* Highlights Component */}
        <Highlights highlights={highlights} />

        {/* Itinerary Component */}
        <ItineraryDay 
          fullItinerary={fullItinerary}
          inclusions={inclusions}
          exclusions={exclusions}
          importantNotes={importantNotes}
        />

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Thank You for Your Inquiry!</h2>
          <p className="text-xl mb-6">
            Our travel consultant will contact you within 24 hours with detailed information and answer any questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+911234567890"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Call Us Now
            </a>
            <a
              href="mailto:info@smilesworld.com"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackageDetails;
