import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown, ChevronUp, Star } from "lucide-react";

const practiceAreas = [
  { name: "Traffic Accidents", path: "/injuries/traffic-accidents" },
  { name: "Workplace Injuries", path: "/injuries/workplace-injuries" },
  { name: "Medical Malpractice", path: "/injuries/medical-malpractice" },
  { name: "Occupational Disease", path: "/injuries/occupational-disease" },
  { name: "Sports & Recreation", path: "/injuries/sports-recreation" },
  { name: "Children's Injuries", path: "/injuries/childrens-injuries" },
  { name: "Brain Injuries", path: "/injuries/brain-injuries" },
  { name: "Business Owners", path: "/injuries/business-owners" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top bar */}
        <div className="bg-navy-700 text-white text-xs py-1.5 hidden md:block">
          <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-navy-900 px-3 py-0.5 rounded text-[10px] font-semibold">
                State Bar Certified Personal Injury Specialists
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-purple-400" />
                ))}
                <span className="ml-1">127 reviews</span>
              </div>
              <span className="text-white/60">|</span>
              <span>EN</span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <Link to="/" className="animate-logo text-xl md:text-2xl font-extrabold text-navy-900 tracking-tight">
            Apex <span className="text-purple-500">Injury</span> Advocates
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/about-us"
              className={`font-medium transition-colors duration-200 ${
                isActive("/about-us") ? "text-purple-500 border-b-2 border-purple-500" : "text-foreground hover:text-purple-500"
              }`}
            >
              About Us
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  location.pathname.startsWith("/injuries") ? "text-purple-500" : "text-foreground hover:text-purple-500"
                }`}
              >
                Practice Areas <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg mt-2 py-2 min-w-[240px] border border-border">
                  {practiceAreas.map((area) => (
                    <Link
                      key={area.path}
                      to={area.path}
                      className="block px-4 py-2 hover:bg-secondary transition-colors text-sm text-foreground"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/costs"
              className={`font-medium transition-colors duration-200 ${
                isActive("/costs") ? "text-purple-500 border-b-2 border-purple-500" : "text-foreground hover:text-purple-500"
              }`}
            >
              Costs
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors duration-200 ${
                isActive("/contact") ? "text-purple-500 border-b-2 border-purple-500" : "text-foreground hover:text-purple-500"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:4157892200"
              className="hidden md:flex items-center gap-2 bg-navy-700 text-white px-5 py-2 rounded-full hover:bg-navy-800 transition-colors text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              415-789-2200
            </a>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-navy-900" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-xl font-extrabold text-navy-900">
                Apex <span className="text-purple-500">Injury</span> Advocates
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-1">
              <Link
                to="/about-us"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-lg hover:bg-secondary font-medium text-foreground"
              >
                About Us
              </Link>
              <button
                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                className="py-3 px-4 rounded-lg hover:bg-secondary font-medium text-foreground flex items-center justify-between w-full"
              >
                Practice Areas
                {mobileSubmenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {mobileSubmenuOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {practiceAreas.map((area) => (
                    <Link
                      key={area.path}
                      to={area.path}
                      onClick={() => setMobileOpen(false)}
                      className="py-2 px-4 rounded-lg hover:bg-secondary text-sm text-muted-foreground"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                to="/costs"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-lg hover:bg-secondary font-medium text-foreground"
              >
                Costs
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-lg hover:bg-secondary font-medium text-foreground"
              >
                Contact
              </Link>
              <a
                href="tel:4157892200"
                className="mt-4 flex items-center justify-center gap-2 bg-navy-700 text-white px-5 py-3 rounded-full font-semibold"
              >
                <Phone className="w-4 h-4" />
                415-789-2200
              </a>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-purple-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">127 reviews</span>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
