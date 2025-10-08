import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Palette, Heart, Mail, Menu, X, Users, BookOpen, Landmark, Plane  } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.ico";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Customize", href: "/customize", icon: Palette },
  { name: "Domestic", href: "/domestic", icon: Landmark },
  { name: "International", href: "/international", icon: Plane  },
  { name: "Women Travel", href: "/women", icon: Heart },
  { name: "Group Departure", href: "/group-departure", icon: Users },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-[100] bg-blue-900/30 backdrop-blur-md border-b border-blue-800/20 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Fixed to stay on the left */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <img src={logo} alt="Smiles World Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold text-white whitespace-nowrap">Smiles World</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Adjusted spacing */}
          <div className="hidden lg:block flex-1">
            <div className="flex items-center justify-end space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                // Special handling for About page to cause full reload
                if (item.name === "About") {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? "bg-white/20 text-white shadow-md"
                          : "text-white/90 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "bg-white/20 text-white shadow-md"
                        : "text-white/90 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 hover:text-white cursor-pointer transition-colors z-50 relative"
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden pb-4 pt-2"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                // Special handling for About page to cause full reload
                if (item.name === "About") {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-base font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-white/90 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/90 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}