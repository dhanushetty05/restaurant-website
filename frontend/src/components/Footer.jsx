import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-20" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold">Urban Plate</span>
            </div>
            <p className="text-background-alt leading-relaxed">
              Experience culinary excellence with our carefully crafted dishes, warm ambience, and exceptional service.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-background-alt hover:text-primary transition-colors" data-testid="footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-background-alt hover:text-primary transition-colors" data-testid="footer-menu">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-background-alt hover:text-primary transition-colors" data-testid="footer-booking">
                  Book Table
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-background-alt hover:text-primary transition-colors" data-testid="footer-gallery">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background-alt">+1 (000) 000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background-alt">demo@example.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background-alt">000 Demo Street, Sample City, XX 00000</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Hours</h3>
            <ul className="space-y-2 text-background-alt">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>11am - 11pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10am - 12am</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10am - 10pm</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-background-alt hover:text-primary transition-colors" data-testid="facebook-link">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background-alt hover:text-primary transition-colors" data-testid="instagram-link">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background-alt hover:text-primary transition-colors" data-testid="twitter-link">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background-alt/20 mt-12 pt-8 text-center text-background-alt text-sm">
          <p>&copy; 2024 Urban Plate Restaurant. All rights reserved. | Template by Emergent</p>
        </div>
      </div>
    </footer>
  );
};
