import { useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

// Static menu data - always available for clients to view
const STATIC_MENU = {
  starters: [
    {"id": "1", "name": "Bruschetta", "description": "Toasted bread with tomatoes, basil & garlic", "price": 8.99, "category": "veg", "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f"},
    {"id": "2", "name": "Crispy Calamari", "description": "Golden fried squid with aioli sauce", "price": 12.99, "category": "non-veg", "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0"},
    {"id": "3", "name": "Stuffed Mushrooms", "description": "Baked mushrooms with herbs & cheese", "price": 9.99, "category": "veg", "image": "https://images.unsplash.com/photo-1611171711482-7c8b28388814"},
    {"id": "14", "name": "Caesar Salad", "description": "Crisp romaine lettuce with parmesan and croutons", "price": 10.99, "category": "veg", "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1"},
    {"id": "15", "name": "Chicken Wings", "description": "Spicy buffalo wings with blue cheese dip", "price": 13.99, "category": "non-veg", "image": "https://images.unsplash.com/photo-1527477396000-e27137b8710b"},
    {"id": "16", "name": "Spring Rolls", "description": "Crispy vegetable spring rolls with sweet chili sauce", "price": 7.99, "category": "veg", "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624"}
  ],
  mains: [
    {"id": "4", "name": "Grilled Salmon", "description": "Fresh Atlantic salmon with seasonal vegetables", "price": 24.99, "category": "non-veg", "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288"},
    {"id": "5", "name": "Truffle Pasta", "description": "Homemade pasta with truffle cream sauce", "price": 18.99, "category": "veg", "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"},
    {"id": "6", "name": "Grilled Ribeye Steak", "description": "300g premium ribeye with herb butter, roasted vegetables", "price": 32.99, "category": "non-veg", "image": "https://images.unsplash.com/photo-1558030006-450675393462"},
    {"id": "7", "name": "Mushroom Risotto", "description": "Arborio rice with porcini, parmesan and white wine", "price": 16.99, "category": "veg", "image": "https://images.unsplash.com/photo-1476124369491-c4ca3e2e8bb9"},
    {"id": "17", "name": "Herb Crusted Chicken", "description": "Tender chicken breast with roasted potatoes and vegetables", "price": 22.99, "category": "non-veg", "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791"},
    {"id": "18", "name": "Margherita Pizza", "description": "Classic pizza with fresh mozzarella, basil and tomato", "price": 14.99, "category": "veg", "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002"},
    {"id": "19", "name": "Beef Lasagna", "description": "Layered pasta with beef ragu, béchamel and cheese", "price": 19.99, "category": "non-veg", "image": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3"},
    {"id": "20", "name": "Vegetarian Curry", "description": "Mixed vegetables in aromatic coconut curry sauce", "price": 15.99, "category": "veg", "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe"}
  ],
  desserts: [
    {"id": "8", "name": "Tiramisu", "description": "Classic Italian coffee-flavored dessert", "price": 7.99, "category": "veg", "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9"},
    {"id": "9", "name": "Chocolate Lava Cake", "description": "Warm chocolate cake with molten center", "price": 8.99, "category": "veg", "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51"},
    {"id": "10", "name": "Crème Brûlée", "description": "Vanilla custard with caramelized sugar", "price": 7.99, "category": "veg", "image": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc"},
    {"id": "21", "name": "Cheesecake", "description": "New York style cheesecake with berry compote", "price": 8.99, "category": "veg", "image": "https://images.unsplash.com/photo-1524351199678-941a58a3df50"},
    {"id": "22", "name": "Apple Pie", "description": "Warm apple pie with vanilla ice cream", "price": 7.99, "category": "veg", "image": "https://images.unsplash.com/photo-1621303837174-89787a7d4729"},
    {"id": "23", "name": "Chocolate Brownie", "description": "Rich chocolate brownie with chocolate sauce", "price": 6.99, "category": "veg", "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"}
  ],
  beverages: [
    {"id": "11", "name": "Fresh Lemonade", "description": "House-made lemonade with mint", "price": 4.99, "category": "veg", "image": "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0f"},
    {"id": "12", "name": "Cappuccino", "description": "Espresso with steamed milk foam", "price": 5.99, "category": "veg", "image": "https://images.unsplash.com/photo-1572442388796-11668a67e53d"},
    {"id": "13", "name": "Red Wine", "description": "House selection from local vineyard", "price": 9.99, "category": "veg", "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"},
    {"id": "24", "name": "Mango Smoothie", "description": "Fresh mango blended with yogurt and ice", "price": 5.99, "category": "veg", "image": "https://images.unsplash.com/photo-1505252585461-04c3a5d88dc2"},
    {"id": "25", "name": "Iced Tea", "description": "Refreshing iced tea with lemon and mint", "price": 4.99, "category": "veg", "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc"},
    {"id": "26", "name": "Fresh Orange Juice", "description": "Freshly squeezed orange juice", "price": 5.49, "category": "veg", "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba"}
  ]
};

export default function PreOrder() {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    booking_date: '',
    booking_time: '',
  });
  const [menu] = useState(STATIC_MENU); // Use static menu - always available
  const [cart, setCart] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { name: item.name, price: item.price, quantity: 1, notes: '' }]);
    }
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter((item) => item.name !== itemName));
  };

  const updateQuantity = (itemName, change) => {
    setCart(
      cart.map((item) =>
        item.name === itemName
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validate required fields
    if (!formData.customer_name || !formData.phone || !formData.booking_date || !formData.booking_time) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (cart.length === 0) {
      toast.error('Please add items to your order');
      return;
    }

    setSubmitting(true);

    try {
      const orderData = {
        ...formData,
        items: cart,
        total_amount: parseFloat(calculateTotal()),
        payment_method: 'pay_at_restaurant',
      };
      
      await axios.post(`${API}/pre-orders`, orderData);
      toast.success('Pre-order confirmed! Your food will be ready when you arrive.');
      
      setFormData({
        customer_name: '',
        phone: '',
        email: '',
        booking_date: '',
        booking_time: '',
      });
      setCart([]);
    } catch (error) {
      console.error('Pre-order error:', error);
      toast.error('Failed to create pre-order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const allMenuItems = [
    ...menu.starters,
    ...menu.mains,
    ...menu.desserts,
    ...menu.beverages,
  ];

  return (
    <div className="min-h-screen pt-20 pb-20" data-testid="pre-order-page">
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-background-alt">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Pre-Order for Your Table
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Order ahead and have your food ready when you arrive. No waiting!
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg border border-border/50 p-8 mb-8">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Booking Details
                </h2>
                <form onSubmit={handleSubmit} data-testid="pre-order-form">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="customer_name" className="text-foreground mb-2 block font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="customer_name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                        placeholder="John Doe"
                        className="h-12 rounded-xl border-border focus:border-primary"
                        data-testid="pre-order-name-input"
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
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                        placeholder="+1 (000) 000-0000"
                        className="h-12 rounded-xl border-border focus:border-primary"
                        data-testid="pre-order-phone-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="text-foreground mb-2 block font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        placeholder="john@example.com"
                        className="h-12 rounded-xl border-border focus:border-primary"
                        data-testid="pre-order-email-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <Label htmlFor="booking_date" className="text-foreground mb-2 block font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Booking Date *
                      </Label>
                      <Input
                        id="booking_date"
                        name="booking_date"
                        type="date"
                        value={formData.booking_date}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="h-12 rounded-xl border-border focus:border-primary"
                        data-testid="pre-order-date-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="booking_time" className="text-foreground mb-2 block font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Booking Time *
                      </Label>
                      <Input
                        id="booking_time"
                        name="booking_time"
                        type="time"
                        value={formData.booking_time}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                        className="h-12 rounded-xl border-border focus:border-primary"
                        data-testid="pre-order-time-input"
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.customer_name || !formData.phone || !formData.booking_date || !formData.booking_time) {
                          toast.error('Please fill in all required fields');
                          return;
                        }
                        toast.success('Booking details saved! Now add items from the menu below.');
                      }}
                      className="w-full bg-secondary text-secondary-foreground rounded-full px-8 py-3 font-medium hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
                      data-testid="save-booking-btn"
                    >
                      Save Booking Details
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  Select Your Dishes
                </h2>
                {allMenuItems.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-border/50">
                    <p className="text-foreground-muted mb-4">Menu is currently unavailable</p>
                    <p className="text-sm text-foreground-muted">Please contact us for menu details</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMenuItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group"
                        data-testid={`pre-order-item-${item.id}`}
                      >
                        {item.image && (
                          <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(item.name);
                              }}
                            />
                            <div className="absolute top-3 right-3">
                              <span className={`w-3 h-3 rounded-full inline-block ${
                                item.category === 'veg' ? 'bg-green-500' : 'bg-red-500'
                              }`} title={item.category === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}></span>
                            </div>
                          </div>
                        )}
                        <div className="p-5">
                          <div className="mb-2">
                            <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${
                              item.category === 'veg' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {item.category === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                            {item.name}
                          </h3>
                          <p className="text-foreground-muted text-sm mb-4 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-border/30">
                            <span className="text-2xl font-bold text-primary">${item.price}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                              data-testid={`add-to-cart-${item.id}`}
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12 bg-primary text-white rounded-3xl p-8 text-center">
                <h3 className="font-serif text-2xl font-semibold mb-4">
                  Don't Have a Table Yet?
                </h3>
                <p className="mb-6 text-white/90">
                  Book your table first, then pre-order your food
                </p>
                <button
                  onClick={() => window.location.href = '/booking'}
                  className="bg-white text-primary rounded-full px-8 py-3 font-medium hover:bg-white/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  data-testid="book-table-btn"
                >
                  Book a Table
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg border border-border/50 p-8 sticky top-24">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                  Your Order
                </h2>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 text-foreground-muted mx-auto mb-4 opacity-50" />
                    <p className="text-foreground-muted mb-2">No items in cart yet</p>
                    <p className="text-sm text-foreground-muted">
                      Add items from the menu to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto" data-testid="cart-items">
                    {cart.map((item, index) => (
                      <div key={index} className="pb-4 border-b border-border/50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="text-destructive hover:text-destructive/80 text-sm"
                            data-testid={`remove-item-${index}`}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.name, -1)}
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-background-alt transition-colors"
                              data-testid={`decrease-qty-${index}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.name, 1)}
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-background-alt transition-colors"
                              data-testid={`increase-qty-${index}`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="border-t border-border/50 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-xl font-semibold text-foreground">Total</span>
                      <span className="font-serif text-2xl font-bold text-primary" data-testid="cart-total">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting || cart.length === 0}
                  className="w-full bg-primary text-primary-foreground rounded-full px-8 py-4 font-medium text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  data-testid="submit-pre-order-btn"
                >
                  {submitting ? 'Placing Order...' : cart.length === 0 ? 'Add Items to Order' : 'Confirm Pre-Order'}
                </button>

                <p className="text-xs text-foreground-muted text-center mt-4">
                  {cart.length > 0 ? 'Payment at restaurant upon arrival' : 'Fill in your details and add items from the menu'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
