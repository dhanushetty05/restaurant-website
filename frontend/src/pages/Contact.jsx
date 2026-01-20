import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 pb-20" data-testid="contact-page">
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-background-alt">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello!
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-background-alt rounded-2xl border border-border/50 hover:border-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone</h3>
                    <p className="text-foreground-muted">+1 (000) 000-0000</p>
                    <p className="text-sm text-foreground-muted mt-1">Available: Mon-Sun, 10am-11pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-background-alt rounded-2xl border border-border/50 hover:border-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <p className="text-foreground-muted">demo@example.com</p>
                    <p className="text-sm text-foreground-muted mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-background-alt rounded-2xl border border-border/50 hover:border-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Address</h3>
                    <p className="text-foreground-muted">000 Demo Street</p>
                    <p className="text-foreground-muted">Sample City, XX 00000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-background-alt rounded-2xl border border-border/50 hover:border-primary/20 transition-colors">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Opening Hours</h3>
                    <div className="space-y-1 text-foreground-muted">
                      <p>Monday - Friday: 11:00 AM - 11:00 PM</p>
                      <p>Saturday: 10:00 AM - 12:00 AM</p>
                      <p>Sunday: 10:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/10000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-6 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
                  data-testid="whatsapp-link"
                >
                  <MessageCircle className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium mb-1">Chat on WhatsApp</h3>
                    <p className="text-sm opacity-90">Quick responses for urgent queries</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
                Find Us
              </h2>
              
              <div className="bg-background-alt rounded-2xl overflow-hidden border border-border/50 h-96 mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133376008!2d-73.99017418459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant Location Map"
                  data-testid="google-maps-embed"
                />
                <div className="p-4 bg-background-alt border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-foreground-muted text-sm">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>000 Demo Street, Sample City, XX 00000</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=000+Demo+Street+Sample+City+XX+00000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 transition-colors"
                    data-testid="maps-link"
                  >
                    Get Directions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-primary text-white rounded-2xl p-8 text-center">
                <h3 className="font-serif text-2xl font-semibold mb-4">
                  Ready to Dine?
                </h3>
                <p className="mb-6 text-white/90">
                  Book your table now and experience culinary excellence
                </p>
                <button
                  onClick={() => window.location.href = '/booking'}
                  className="bg-white text-primary rounded-full px-8 py-3 font-medium hover:bg-white/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  data-testid="contact-book-btn"
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
