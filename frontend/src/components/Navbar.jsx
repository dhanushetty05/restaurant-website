import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
            <span className="font-serif text-2xl font-bold text-foreground">
              Urban Plate
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground'
                }`}
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              data-testid="book-table-btn"
            >
              Book Table
            </Link>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-primary text-primary-foreground rounded-full px-6 py-3 font-medium mt-4"
                data-testid="mobile-book-table-btn"
              >
                Book Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
