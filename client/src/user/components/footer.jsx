import { Link } from "react-router-dom";
import logo from "../../assets/logo.ico";
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"; // <-- IMPORT ICONS

// --- NAVIGATION UPDATED ---
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Customize", href: "/customize" },
  { name: "Domestic Tours", href: "/domestic-tours" },
  { name: "International Tours", href: "/international-tours" },
  { name: "Women Travel", href: "/women" },
  { name: "Group Departure", href: "/group-departure" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const policyLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Cancellations & Refunds", href: "/cancellation-policy" },
];

// --- SOCIAL MEDIA LINKS ADDED ---
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/smilesworld10?igsh=MXA0MW02b21qc3IyNw==", icon: Instagram, color: "#E4405F" },
  { name: "Facebook", href: "Facebook/smilesworldpune", icon: Facebook, color: "#1877F2" },
  // { name: "Twitter", href: "#", icon: Twitter, color: "#1DA1F2" },
  { name: "YouTube", href: "https://www.youtube.com/@smilesworldpune", icon: Youtube, color: "#FF0000" },
  // { name: "LinkedIn", href: "#", icon: Linkedin, color: "#0A66C2" },
];

export function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-gray-300 bg-[white]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <img src={logo} alt="Smiles World Logo" className="w-8 sm:w-10 h-8 sm:h-10" />
            <span className="text-2xl sm:text-3xl font-bold text-[#04153c]">Smiles World</span>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg px-4 text-[#5d5b5b]">
            <span className="text-[#ff0c91]">Explore more.</span> <span className="text-[#eeb832]">Smile wider.</span>
          </p>

          {/* --- SOCIAL MEDIA SECTION --- */}
          <div className="pt-4 flex justify-center gap-5">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-transform duration-300 hover:scale-110"
                aria-label={item.name}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </a>
            ))}
          </div>

          {/* Main Navigation */}
          <div className="pt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-muted-foreground px-4 text-[#5d5b5b]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hover:text-primary transition-colors text-sm sm:text-base"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Policy links */}
          <div className="pt-4 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-muted-foreground px-4 text-[#5d5b5b]">
            {policyLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hover:text-primary transition-colors text-xs sm:text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Smiles World. Made with ❤️ for travelers worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
}