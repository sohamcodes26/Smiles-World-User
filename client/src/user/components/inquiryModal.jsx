import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, User, MessageSquare, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitPackageEnquiry } from "../services/formsApi"; // Adjust path as needed

// Helper function to add a package ID to local storage
const addUnlockedPackage = (packageId) => {
  try {
    const unlocked = JSON.parse(localStorage.getItem('unlockedPackages') || '[]');
    if (!unlocked.includes(packageId)) {
      unlocked.push(packageId);
      localStorage.setItem('unlockedPackages', JSON.stringify(unlocked));
    }
  } catch (error) {
    console.error("Could not update unlocked packages in Local Storage", error);
  }
};

const InquiryModal = ({ 
  isOpen = false,
  onClose,
  modalData,
  theme = "default",
  packageData
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    travelers: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    packageTitle = "Travel Package",
    packagePrice,
    destination,
    duration,
    type
  } = modalData || {};

  const styles = {
    header: "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    accent: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const enquiryPayload = {
      fullName: formData.name,
      emailAddress: formData.email,
      phoneNumber: formData.phone,
      numberOfTravelers: parseInt(formData.travelers, 10),
      message: formData.message,
      // --- FIX: Use _id from the database ---
      packageId: packageData._id,
      type: 'Package Enquiry',
    };

    try {
      const response = await submitPackageEnquiry(enquiryPayload);
      alert(response.message || "Inquiry sent successfully!");
      
      // --- FIX: Use _id to unlock the package ---
      addUnlockedPackage(packageData._id);
      onClose();

      // --- FIX: Navigate with URL parameter, which PackageDetails page expects ---
      navigate(`/packages/${packageData._id}`);

    } catch (error) {
      console.error("Submission failed:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        >
          <div className={`${styles.header} px-6 py-4 relative`}>
            <button onClick={onClose} className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"> <X size={24} /> </button>
            <div>
              <h2 className="text-xl font-bold mb-1">Inquiry for Package</h2>
              <p className="text-white/90 text-sm">{packageTitle}</p>
            </div>
          </div>
          
          {(packagePrice || destination || duration || type) && (
            <div className={`${styles.bg} px-6 py-3 border-b ${styles.border}`}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {packagePrice && (<div><span className="text-gray-600">Price:</span><span className={`font-semibold ml-1 ${styles.accent}`}>₹{packagePrice?.toLocaleString()}</span></div>)}
                {type && (<div><span className="text-gray-600">Type:</span><span className="font-medium ml-1">{type}</span></div>)}
                {destination && (<div className="col-span-2"><MapPin size={14} className="inline mr-1 text-gray-500" /><span className="text-gray-700">{destination}</span></div>)}
              </div>
            </div>
          )}

          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><User size={16} className="inline mr-1" /> Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><Mail size={16} className="inline mr-1" /> Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><Phone size={16} className="inline mr-1" /> Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                <select name="travelers" value={formData.travelers} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">{[1,2,3,4,5,6,7,8,9,10].map(num => (<option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>))}</select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><MessageSquare size={16} className="inline mr-1" /> Additional Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Any specific requirements..."/>
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${styles.button} disabled:bg-gray-400`}>
                {isSubmitting ? (<><Loader2 className="animate-spin mr-2" size={20} /> Sending...</>) : ('Send Inquiry')}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InquiryModal;