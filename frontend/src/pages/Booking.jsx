import { useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

export default function Booking() {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    special_requests: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/bookings`, formData);
      toast.success('Booking confirmed! We look forward to serving you.');
      setFormData({
        customer_name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: 2,
        special_requests: '',
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20" data-testid="booking-page">
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-background-alt">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Book Your Table
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Reserve your spot for an unforgettable dining experience
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-border/50 p-8 md:p-12">
            <form onSubmit={handleSubmit} data-testid="booking-form">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="customer_name" className="text-foreground mb-2 block font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="h-12 rounded-xl border-border focus:border-primary"
                    data-testid="customer-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground mb-2 block font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (000) 000-0000"
                    className="h-12 rounded-xl border-border focus:border-primary"
                    data-testid="phone-input"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="email" className="text-foreground mb-2 block font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="h-12 rounded-xl border-border focus:border-primary"
                  data-testid="email-input"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label htmlFor="date" className="text-foreground mb-2 block font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Date *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="h-12 rounded-xl border-border focus:border-primary"
                    data-testid="date-input"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-foreground mb-2 block font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Time *
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-border focus:border-primary"
                    data-testid="time-input"
                  />
                </div>
                <div>
                  <Label htmlFor="guests" className="text-foreground mb-2 block font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Guests *
                  </Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-border focus:border-primary"
                    data-testid="guests-input"
                  />
                </div>
              </div>

              <div className="mb-8">
                <Label htmlFor="special_requests" className="text-foreground mb-2 block font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Special Requests
                </Label>
                <Textarea
                  id="special_requests"
                  name="special_requests"
                  value={formData.special_requests}
                  onChange={handleChange}
                  placeholder="Any dietary restrictions, allergies, or special occasions we should know about?"
                  rows={4}
                  className="rounded-xl border-border focus:border-primary resize-none"
                  data-testid="special-requests-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground rounded-full px-8 py-4 font-medium text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="submit-booking-btn"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>

              <p className="text-sm text-foreground-muted text-center mt-6">
                You will receive a confirmation via phone and email shortly
              </p>
            </form>
          </div>

          <div className="mt-12 bg-background-alt rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Want to Pre-Order Your Food?
            </h3>
            <p className="text-foreground-muted mb-6">
              Save time when you arrive by pre-ordering your meal for your table booking
            </p>
            <button
              onClick={() => window.location.href = '/pre-order'}
              className="bg-secondary text-secondary-foreground rounded-full px-8 py-3 font-medium hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              data-testid="pre-order-link-btn"
            >
              Pre-Order Food
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
