import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, User, MessageSquare, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inquiryModal = ({ 
  isOpen = false,
  onClose,
  modalData,
  theme = "default", // "default", "pink", "orange", "yellow"
  packageData // Full package data for details page
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    travelers: 1
  });

  // Extract data from modalData object (with defaults)
  const {
    packageTitle = "Travel Package",
    packagePrice,
    destination,
    duration,
    type
  } = modalData || {};

  // Theme variants
  const getThemeStyles = () => {
    switch(theme) {
      case "pink":
        return {
          header: "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
          button: "bg-pink-500 hover:bg-pink-primary/90 text-white",
          accent: "text-pink-600",
          border: "border-pink-200",
          bg: "bg-pink-50"
        };
      case "orange":
        return {
          header: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
          button: "bg-orange-500 hover:bg-orange-600 text-white",
          accent: "text-orange-600",
          border: "border-orange-200",
          bg: "bg-orange-50"
        };
      case "yellow":
        return {
          header: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
          button: "bg-yellow-500 hover:bg-yellow-600 text-white",
          accent: "text-yellow-600",
          border: "border-yellow-200",
          bg: "bg-yellow-50"
        };
      default:
        return {
          header: "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
          button: "bg-blue-600 hover:bg-blue-700 text-white",
          accent: "text-blue-600",
          border: "border-blue-200",
          bg: "bg-blue-50"
        };
    }
  };

  const styles = getThemeStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Inquiry submitted:", { ...formData, packageTitle });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      travelers: 1
    });
    
    // Close modal
    onClose();
    
    // Navigate to package details page with package data
    navigate('/package-details', { 
      state: { packageData: packageData || modalData } 
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className={`${styles.header} px-6 py-4 relative`}>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div>
              <h2 className="text-xl font-bold mb-1">Inquiry for Package</h2>
              <p className="text-white/90 text-sm">{packageTitle}</p>
            </div>
          </div>

          {/* Package Info */}
          {(packagePrice || destination || duration || type) && (
            <div className={`${styles.bg} px-6 py-3 border-b ${styles.border}`}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {packagePrice && (
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <span className={`font-semibold ml-1 ${styles.accent}`}>₹{packagePrice?.toLocaleString()}</span>
                  </div>
                )}
                {type && (
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium ml-1">{type}</span>
                  </div>
                )}
                {destination && (
                  <div className="col-span-2">
                    <MapPin size={14} className="inline mr-1 text-gray-500" />
                    <span className="text-gray-700">{destination}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User size={16} className="inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail size={16} className="inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone size={16} className="inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Number of Travelers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Travelers
                </label>
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MessageSquare size={16} className="inline mr-1" />
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Any specific requirements or questions..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${styles.button}`}
              >
                Send Inquiry
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t text-center">
            <p className="text-xs text-gray-600">
              We'll respond within 24 hours with detailed information
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default inquiryModal;