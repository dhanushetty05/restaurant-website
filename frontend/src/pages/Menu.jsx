import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Drumstick, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export default function Menu() {
  const [menu] = useState(STATIC_MENU); // Use static menu - always available

  const MenuItem = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border/50 group"
      data-testid={`menu-item-${item.id}`}
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
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 pb-20" data-testid="menu-page">
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-background-alt" data-testid="menu-header">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, crafted with passion and the finest ingredients
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="starters" className="w-full" data-testid="menu-tabs">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 bg-background-alt p-2 rounded-full">
              <TabsTrigger value="starters" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="tab-starters">
                Starters
              </TabsTrigger>
              <TabsTrigger value="mains" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="tab-mains">
                Mains
              </TabsTrigger>
              <TabsTrigger value="desserts" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="tab-desserts">
                Desserts
              </TabsTrigger>
              <TabsTrigger value="beverages" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="tab-beverages">
                Beverages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="starters" data-testid="starters-content">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menu.starters.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mains" data-testid="mains-content">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menu.mains.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="desserts" data-testid="desserts-content">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menu.desserts.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beverages" data-testid="beverages-content">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menu.beverages.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-background-alt text-center" data-testid="menu-cta">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Ready to Experience These Flavors?
          </h2>
          <p className="text-xl text-foreground-muted mb-8">
            Book your table now and embark on a culinary journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/booking'}
              className="bg-primary text-primary-foreground rounded-full px-8 py-3.5 font-medium text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              data-testid="book-table-cta-btn"
            >
              Book a Table
            </button>
            <button
              onClick={() => window.location.href = '/delivery'}
              className="bg-secondary text-secondary-foreground rounded-full px-8 py-3.5 font-medium text-lg hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              data-testid="order-delivery-cta-btn"
            >
              Order for Delivery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
