import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      {/* Contact preview */}
      <div className="bg-cream py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-2 leading-tight">
                Tell us <span className="italic">your story</span>
              </h2>
              <p className="font-display text-2xl font-semibold text-purple-500 italic">Get in touch</p>
            </div>
            <div>
              <h3 className="font-semibold text-navy-900/60 mb-4 text-xs uppercase tracking-widest">Office</h3>
              <div className="space-y-2 text-navy-900/70 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-purple-500" />
                  <span>1250 Market Street, Suite 400<br />San Francisco, CA 94102</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-purple-500" />
                  <a href="tel:4157892200" className="font-semibold text-navy-900 hover:text-purple-500 transition-colors">415-789-2200</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-purple-500" />
                  <a href="mailto:info@apexinjurylaw.com" className="hover:text-purple-500 transition-colors">info@apexinjurylaw.com</a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-navy-900/60 mb-4 text-xs uppercase tracking-widest">Menu</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-navy-900/70">
                <Link to="/about-us" className="hover:text-purple-500 transition-colors">About Us</Link>
                <Link to="/contact" className="hover:text-purple-500 transition-colors">Contact</Link>
                <Link to="/costs" className="hover:text-purple-500 transition-colors">Costs & Fees</Link>
                <Link to="/faq" className="hover:text-purple-500 transition-colors">FAQ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-cream border-t border-navy-900/10 py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-navy-900/40">
            <p>© 2024 Apex Injury Advocates. All rights reserved.</p>
            <p>Website by Vertex Design Studio</p>
          </div>
          <p className="text-[10px] text-navy-900/25 mt-4 text-center">
            The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
