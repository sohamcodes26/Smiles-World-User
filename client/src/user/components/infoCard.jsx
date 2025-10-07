import { motion } from "framer-motion";

const InfoCard = ({
  icon,
  title,
  description,
  delay = 0,
  variant = "default" // "default", "pink", "orange", "yellow"
}) => {
  // Theme variants for different pages
  const getVariantStyles = () => {
    switch(variant) {
      case "pink":
        return {
          card: "bg-white rounded-3xl shadow-xl border border-pink-100 p-8 text-center hover:shadow-2xl transition-all duration-300",
          glow: "from-pink-500/10 to-pink-600/10" // Example pink theme
        };
      case "orange":
        return {
          card: "bg-white rounded-3xl shadow-xl border border-orange-100 p-8 text-center hover:shadow-2xl transition-all duration-300",
          glow: "from-orange-500/10 to-orange-600/10"
        };
      case "yellow":
        return {
          card: "bg-white rounded-3xl shadow-xl border border-yellow-100 p-8 text-center hover:shadow-2xl transition-all duration-300",
          glow: "from-yellow-500/10 to-yellow-600/10"
        };
      default:
        return {
          card: "bg-white rounded-3xl shadow-xl border border-gray-200 p-8 text-center hover:shadow-2xl transition-all duration-300",
          glow: "from-blue-500/10 to-purple-500/10"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div
      // Corrected: Used template literal for className
      className={`${styles.card} group relative overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay }}
    >
      {/* Floating decoration */}
      <div className="absolute -top-4 -right-4 text-2xl opacity-20 animate-pulse">
        ✨
      </div>
      
      {/* Icon */}
      <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {title}
      </h3>
      
      {/* Description */}
      <div className="text-gray-600 leading-relaxed">
        <p>{description}</p>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {/* Corrected: Used template literal for className */}
        <div className={`absolute inset-4 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl`}></div>
      </div>
    </motion.div>
  );
};

export default InfoCard;
