import React, { useState } from "react";
import { motion } from "framer-motion";
import { submitCustomEnquiry } from "../services/formsApi"; // Note: Adjust this import path based on your project structure

// SVG Icon Components
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const HotelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M10 22v-6.57" /><path d="M12 11h.01" /><path d="M12 7h.01" /><path d="M14 22v-6.57" /><path d="M12 15h.01" /><path d="M2 13.4V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4.4" /><path d="M12 3v18" /></svg>;
const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1h2" /><path d="M7 17h10" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>;
const MealIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M3 2v6h6" /><path d="M21.09 15.11A10 10 0 1 1 12 2a10 10 0 0 1 9.63 13.8L22 22Z" /><path d="M7 12a5 5 0 0 1 5-5" /><path d="M12 17a5 5 0 0 1-5-5" /></svg>;
const BudgetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M9.94 18.06 12 21l2.06-2.94" /><path d="m14.06 9.94 2.94-2.06-2.94-2.06" /><path d="M12 3 9.94 5.94" /><path d="m5.94 9.94-2.94 2.06 2.94 2.06" /><path d="M3 12h3" /><path d="M18 12h3" /><path d="M12 6V3" /><path d="M12 21v-3" /></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" /></svg>;
const ChevronDownIcon = () => <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;


export default function Customize() {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", residence: "",
    destination: "", travelDates: "", duration: "", adults: "1", children: "",
    hotelCategory: "", roomType: "", otherRoomType: "",
    travelStyle: "", mealPreferences: "",
    budget: "", specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare payload by transforming form data to match the backend model structure.
    const boardOptions = ['Breakfast Only', 'Half Board (Breakfast + Dinner)', 'Full Board (All Meals)'];
    const dietOptions = ['Vegetarian', 'Jain Food', 'Non-Vegetarian'];
    
    let selectedBoard = "";
    let selectedDiet = [];

    if (boardOptions.includes(formData.mealPreferences)) {
        selectedBoard = formData.mealPreferences;
    } else if (dietOptions.includes(formData.mealPreferences)) {
        // Defaulting board because it's required by the backend, but not specified in the form for diet-only options.
        selectedBoard = "Breakfast Only";
        selectedDiet = [formData.mealPreferences];
    }

    const payload = {
      fullName: formData.fullName,
      emailAddress: formData.email,
      phoneNumber: formData.phone,
      residence: formData.residence,
      destination: formData.destination,
      preferredDates: formData.travelDates,
      duration: formData.duration,
      travelers: {
        adults: Number(formData.adults),
        children: formData.children,
      },
      stayPreferences: {
        hotelCategory: formData.hotelCategory,
        roomType: formData.roomType,
        otherRoomType: formData.otherRoomType,
      },
      travelStyle: formData.travelStyle ? [formData.travelStyle] : [],
      mealPreferences: {
          board: selectedBoard,
          diet: selectedDiet,
      },
      budgetPerPerson: formData.budget,
      specialRequests: formData.specialRequests,
    };

    try {
      const response = await submitCustomEnquiry(payload);
      alert(response.message || "Request Sent! Our travel experts will be in touch within 24 hours. 🎉");
      // Optionally reset the form here after successful submission
      // setFormData({ ...initial state... })
    } catch (error) {
      console.error("Submission failed:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName = "w-full p-3 bg-slate-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";
  const selectClassName = `${fieldClassName} appearance-none pr-12`;

  return (
    <main className="font-sans text-zinc-800 bg-[#dcf0ff] -mt-16">
      {/* Hero Section */}
      <section className="py-35 px-4 text-center">
        <motion.div 
          className="max-w-4xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold">Customize Your Dream Trip</h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Tell us about your travel dreams, and we'll craft the perfect journey just for you.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col space-y-12">

            {/* Personal Details */}
            <div className="flex flex-col space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold"><UserIcon /><span>Personal Details</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="fullName" className="font-medium text-sm">Full Name *</label>
                  <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className={fieldClassName} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="font-medium text-sm">Email Address *</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className={fieldClassName} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="font-medium text-sm">Contact Number *</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className={fieldClassName} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="residence" className="font-medium text-sm">City / Country of Residence</label>
                  <input id="residence" name="residence" value={formData.residence} onChange={handleChange} className={fieldClassName} />
                </div>
              </div>
            </div>

            {/* Travel Information */}
            <div className="flex flex-col space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold"><MapPinIcon /><span>Travel Information</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label htmlFor="destination" className="font-medium text-sm">Destination(s) you wish to travel *</label>
                  <input id="destination" name="destination" value={formData.destination} onChange={handleChange} required className={fieldClassName} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="travelDates" className="font-medium text-sm">Preferred Travel Dates</label>
                  <input id="travelDates" name="travelDates" placeholder="e.g., December 2025" value={formData.travelDates} onChange={handleChange} className={fieldClassName} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="duration" className="font-medium text-sm">Number of Days</label>
                  <input id="duration" name="duration" placeholder="e.g., 7 Days" value={formData.duration} onChange={handleChange} className={fieldClassName} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="adults" className="font-medium text-sm">Number of Adults</label>
                  <input id="adults" name="adults" type="number" min="1" value={formData.adults} onChange={handleChange} className={fieldClassName} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="children" className="font-medium text-sm">Children (with age)</label>
                  <input id="children" name="children" placeholder="e.g., 1 child, 8 years" value={formData.children} onChange={handleChange} className={fieldClassName} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex flex-col space-y-6">
                <h2 className="flex items-center space-x-3 text-2xl font-bold"><HotelIcon /><span>Stay Preferences</span></h2>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="hotelCategory" className="font-medium text-sm">Hotel Category</label>
                  <div className="relative">
                    <select id="hotelCategory" name="hotelCategory" value={formData.hotelCategory} onChange={handleChange} className={selectClassName}>
                      <option value="" disabled>Select a category...</option>
                      {["3 Star", "4 Star", "5 Star", "Luxury / Boutique"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDownIcon /></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="roomType" className="font-medium text-sm">Room Type</label>
                  <div className="relative">
                    <select id="roomType" name="roomType" value={formData.roomType} onChange={handleChange} className={selectClassName}>
                      <option value="" disabled>Select a room type...</option>
                      {["Single", "Double", "Family Suite", "Other"].map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDownIcon /></div>
                  </div>
                  {formData.roomType === 'Other' && <input name="otherRoomType" value={formData.otherRoomType} onChange={handleChange} placeholder="Please specify" className={`mt-2 ${fieldClassName}`} />}
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <h2 className="flex items-center space-x-3 text-2xl font-bold"><CarIcon /><span>Travel Style</span></h2>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="travelStyle" className="font-medium text-sm">Primary Travel Style</label>
                  <div className="relative">
                    <select id="travelStyle" name="travelStyle" value={formData.travelStyle} onChange={handleChange} className={selectClassName}>
                      <option value="" disabled>Select a travel style...</option>
                      {["Leisure & Relaxation", "Adventure & Thrill", "Honeymoon / Romantic", "Family Holiday", "Culture & Heritage", "Wildlife & Nature", "MICE / Corporate Trip", "Other"].map(style => <option key={style} value={style}>{style}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDownIcon /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex flex-col space-y-6">
                <h2 className="flex items-center space-x-3 text-2xl font-bold"><MealIcon /><span>Meal Preferences</span></h2>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="mealPreferences" className="font-medium text-sm">Select Preference</label>
                  <div className="relative">
                    <select id="mealPreferences" name="mealPreferences" value={formData.mealPreferences} onChange={handleChange} className={selectClassName}>
                      <option value="" disabled>Select a meal preference...</option>
                      {["Breakfast Only", "Half Board (Breakfast + Dinner)", "Full Board (All Meals)", "Vegetarian", "Jain Food", "Non-Vegetarian"].map(meal => <option key={meal} value={meal}>{meal}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDownIcon /></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <h2 className="flex items-center space-x-3 text-2xl font-bold"><BudgetIcon /><span>Budget Preference</span></h2>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="budget" className="font-medium text-sm">Per person, excluding flights</label>
                  <div className="relative">
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={selectClassName}>
                      <option value="" disabled>Select a budget range...</option>
                      {["Economy (₹30,000 – ₹50,000)", "Premium (₹50,000 – ₹80,000)", "Luxury (₹80,000 – ₹1.5 Lakh)", "Ultra Luxury (₹1.5 Lakh & above)"].map(budget => <option key={budget} value={budget}>{budget}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDownIcon /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="flex flex-col space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold"><SparklesIcon /><span>Special Requests</span></h2>
              <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="4" placeholder="Any specific activities or requirements?" className={fieldClassName} />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 py-3 px-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] disabled:bg-slate-400 disabled:shadow-none disabled:scale-100">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Your Custom Package...</span>
                  </>
                ) : (
                  <>
                    <SendIcon />
                    <span>Create My Custom Package</span>
                  </>
                )}
              </button>
              <p className="text-center text-sm text-zinc-500 mt-4">Our travel experts will get in touch within 24 hours.</p>
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
}