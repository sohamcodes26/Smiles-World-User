import { Link } from "react-router-dom";
import logo from "../../assets/logo.ico";

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

export function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-gray-300 bg-[white]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <img src={logo} alt="Smiles World Logo" className="w-8 sm:w-10 h-8 sm:h-10" />
            <span className="text-2xl sm:text-3xl font-bold text-primary">Smiles World</span>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg px-4 text-[#5d5b5b]">
            Explore more. Smile wider.
          </p>
          {/* Main Navigation */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-muted-foreground px-4 text-[#5d5b5b]">
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