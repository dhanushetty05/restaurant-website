import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ChefHat, Award, Heart } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ChefHat,
      title: 'Expert Chefs',
      description: 'Michelin-trained culinary masters crafting each dish',
    },
    {
      icon: Award,
      title: 'Quality Ingredients',
      description: 'Fresh, locally-sourced organic produce daily',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every dish prepared with passion and care',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Absolutely amazing experience! The food was exceptional and the ambience was perfect.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      text: 'Best restaurant in town. The truffle pasta is to die for!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      text: 'Fantastic service and delicious food. Will definitely come back!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/33474124/pexels-photo-33474124.jpeg)',
        }}
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            data-testid="hero-title"
          >
            Where Every Meal is a Memory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-8 text-gray-200"
            data-testid="hero-subtitle"
          >
            Experience culinary artistry in a warm, inviting atmosphere
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-testid="hero-cta"
          >
            <button
              onClick={() => navigate('/booking')}
              className="bg-primary text-primary-foreground rounded-full px-8 py-3.5 font-medium text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              data-testid="hero-book-table-btn"
            >
              Book a Table
            </button>
            <button
              onClick={() => navigate('/pre-order')}
              className="bg-transparent border-2 border-white text-white rounded-full px-8 py-3.5 font-medium text-lg hover:bg-white/10 transition-all"
              data-testid="hero-pre-order-btn"
            >
              Pre-Order Food
            </button>
            <button
              onClick={() => navigate('/delivery')}
              className="bg-secondary text-secondary-foreground rounded-full px-8 py-3.5 font-medium text-lg hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              data-testid="hero-delivery-btn"
            >
              Order Delivery
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background" data-testid="about-preview-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Welcome to Urban Plate
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                At Urban Plate, we believe that dining is more than just a meal—it's an experience. Our passionate chefs combine traditional techniques with modern innovation to create dishes that delight all your senses.
              </p>
              <p className="text-lg text-foreground-muted leading-relaxed mb-8">
                From farm-fresh ingredients to artful presentation, every detail is crafted with care to ensure your dining experience is unforgettable.
              </p>
              <button
                onClick={() => navigate('/about')}
                className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-2"
                data-testid="learn-more-btn"
              >
                Learn More About Us →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1761062083136-dcfbd2a000f9"
                alt="Restaurant interior"
                className="rounded-2xl shadow-lg h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1744421461525-3ece303e8a37"
                alt="Chef preparing food"
                className="rounded-2xl shadow-lg h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background-alt" data-testid="features-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              We're committed to providing an exceptional dining experience through quality, passion, and attention to detail.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-3xl border border-border/50 hover:border-primary/20 transition-all hover:shadow-lg"
                data-testid={`feature-${index}`}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              What Our Guests Say
            </h2>
            <p className="text-lg text-foreground-muted">
              Hear from our happy diners
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border/50"
                data-testid={`testimonial-${index}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground-muted mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-medium text-foreground">— {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background-alt" data-testid="location-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Visit Us
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-foreground-muted">000 Demo Street, Sample City, XX 00000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Hours</p>
                    <p className="text-foreground-muted">Mon-Fri: 11am-11pm | Sat: 10am-12am | Sun: 10am-10pm</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="bg-primary text-primary-foreground rounded-full px-8 py-3 font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                data-testid="get-directions-btn"
              >
                Get Directions
              </button>
            </div>
            <div className="bg-background-alt rounded-2xl overflow-hidden border border-border/50 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133376008!2d-73.99017418459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
                data-testid="home-map-embed"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
