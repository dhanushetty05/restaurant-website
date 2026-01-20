# Urban Plate Restaurant Website - Customization Guide

## 📖 Overview

This is a professional, ready-to-use restaurant website template that can be easily customized for any restaurant, cafe, or food business. The website includes table booking, pre-ordering, and online delivery ordering features with Google Sheets integration for order management.

---

## ✨ Features

- **Home Page** - Beautiful hero section with CTAs
- **About Page** - Restaurant story and values
- **Menu Page** - Categorized menu (Starters, Mains, Desserts, Beverages)
- **Table Booking** - Customer reservation form
- **Pre-Order System** - Order food before arriving at restaurant
- **Online Delivery** - Full delivery ordering with cart
- **Gallery** - Showcase food and ambience
- **Contact Page** - Location, hours, and contact info
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Warm, inviting design with professional aesthetics

---

## 🔧 How to Customize

### 1. Change Restaurant Name & Branding

**Files to edit:**
- `/app/frontend/src/components/Navbar.jsx` - Line 40-42 (Logo and name)
- `/app/frontend/src/components/Footer.jsx` - Line 11-13 (Footer branding)
- `/app/backend/server.js` - Health message payload
- All page titles and headers

**What to change:**
```javascript
// Change "Urban Plate" to your restaurant name
<span className="font-serif text-2xl font-bold text-foreground">
  Your Restaurant Name
</span>
```

---

### 2. Update Contact Information

**Files to edit:**
- `/app/frontend/src/components/Footer.jsx` - Lines 34-55 (Phone, Email, Address, Hours)
- `/app/frontend/src/pages/Contact.jsx` - Lines 25-75 (All contact details)
- `/app/frontend/src/pages/Home.jsx` - Lines 140-150 (Location section)

**What to change:**
```javascript
// Update phone number
<span className="text-background-alt">+1 (000) 000-0000</span>
// Change to: +1 (YOUR-PHONE-NUMBER)

// Update email
<span className="text-background-alt">demo@example.com</span>
// Change to: your-email@yourdomain.com

// Update address
<span className="text-background-alt">000 Demo Street...</span>
// Change to: Your Full Address
```

---

### 3. Customize Menu Items

**Files to edit (demo/static menu used by forms):**
- `/app/frontend/src/pages/PreOrder.jsx` - `STATIC_MENU`
- `/app/frontend/src/pages/Delivery.jsx` - `STATIC_MENU`

**How to add/edit menu items:**

```javascript
const STATIC_MENU = {
  starters: [
    {
      id: '1',
      name: 'Your Dish Name',
      description: 'Description of your dish',
      price: 12.99,
      category: 'veg', // or 'non-veg'
      image: 'https://your-image-url.com/image.jpg',
    },
    // Add more items...
  ],
  // mains, desserts, beverages...
};
```

**To add a new item:**
1. Copy an existing item block
2. Change the `id` to a unique value
3. Update name, description, price, category, and image URL
4. Add it to the appropriate category (starters, mains, desserts, beverages)

---

### 4. Update Images

**Gallery images:**
- `/app/frontend/src/pages/Gallery.jsx` - Lines 4-15 (Image URLs)

**Hero images:**
- `/app/frontend/src/pages/Home.jsx` - Line 54 (Hero background)
- `/app/frontend/src/pages/About.jsx` - Line 46 (About hero)

**How to change:**
```javascript
// Replace image URLs with your own
style={{
  backgroundImage: 'url(https://your-image-url.com/image.jpg)',
}}
```

**Recommended image sources:**
- Unsplash.com (free, high-quality)
- Pexels.com (free, high-quality)
- Your own professional photos

---

### 5. Change Colors & Styling

**File to edit:**
- `/app/frontend/tailwind.config.js` - Lines 8-49

**Current color scheme (Warm Earth):**
```javascript
primary: {
  DEFAULT: '#C05621',  // Burnt Orange
  foreground: '#FFFFFF'
},
secondary: {
  DEFAULT: '#5F6F52',  // Sage Green
  foreground: '#FFFFFF'
}
```

**To change colors:**
1. Choose your color palette (use tools like coolors.co or colorhunt.co)
2. Update the hex color codes in tailwind.config.js
3. Save and restart the frontend

---

### 6. Modify Opening Hours

**Files to edit:**
- `/app/frontend/src/components/Footer.jsx` - Lines 51-60
- `/app/frontend/src/pages/Contact.jsx` - Lines 61-67

```javascript
// Edit hours
<li className="flex justify-between">
  <span>Monday - Friday</span>
  <span>11am - 11pm</span>  // Change to your hours
</li>
```

---

## 📊 Google Forms & Sheets Integration Setup

This website can send all bookings and orders to Google Sheets for easy management.

### Step 1: Create Google Forms

1. Go to [Google Forms](https://forms.google.com)
2. Create three separate forms:
   - **Table Bookings Form**
   - **Pre-Orders Form**
   - **Delivery Orders Form**

3. For each form, add fields matching the website data:

**Table Bookings Form Fields:**
- Customer Name (Short answer)
- Phone Number (Short answer)
- Email (Short answer)
- Date (Date)
- Time (Time)
- Number of Guests (Number)
- Special Requests (Long answer)

**Pre-Orders Form Fields:**
- Customer Name
- Phone Number
- Email
- Booking Date
- Booking Time
- Items Ordered (Long answer - will receive JSON data)
- Total Amount (Number)
- Payment Method (Short answer)

**Delivery Orders Form Fields:**
- Customer Name
- Phone Number
- Email
- Delivery Address (Long answer)
- Items Ordered (Long answer)
- Total Amount (Number)
- Delivery Time (Time)
- Payment Method (Short answer)

### Step 2: Link Forms to Sheets

1. In each Google Form, click on "Responses" tab
2. Click on the Google Sheets icon to create a linked spreadsheet
3. This will automatically create a sheet that updates when form is submitted

### Step 3: Get Form URLs

1. In each form, click "Send"
2. Copy the form URL
3. You'll use these URLs to redirect customers (or use form embed codes)

### Step 4: Connect to Website (Optional - Advanced)

To automatically submit form data from website to Google Forms:
1. Use Google Apps Script to create a web app that receives POST requests
2. Or use a third-party service like Zapier or Make.com
3. Or implement Google Sheets API (requires API key and OAuth)

**Simple Alternative:**
Add a link/button that opens the Google Form in a new tab after customer completes website form.

---

## 📧 Email & WhatsApp Notifications Setup

### WhatsApp Integration

**File to edit:**
- `/app/frontend/src/pages/Contact.jsx` - Line 91

```javascript
// Update WhatsApp number
href="https://wa.me/10000000000"  // Change to your number
// Format: https://wa.me/[country code][phone number]
// Example: https://wa.me/919876543210 (India)
```

### Email Notifications

To receive email notifications for bookings/orders:

**Option 1: Use EmailJS (Recommended - Free)**
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create email template
3. Install: `cd /app/frontend && yarn add @emailjs/browser`
4. Add EmailJS code to booking/order submission handlers

**Option 2: Use Backend Email Service**
1. Install a Node email library: `npm install @sendgrid/mail` or `npm install nodemailer`
2. Add email sending function in `/app/backend/server.js`
3. Configure with your SMTP credentials or API keys

---

## 💳 Payment Gateway Integration (Optional)

The website is payment-ready. To enable online payments:

### Stripe Integration
1. Sign up at [stripe.com](https://stripe.com)
2. Get API keys from Stripe Dashboard
3. Install Stripe library:
   ```bash
   cd /app/backend
   npm install stripe
   ```
4. Add Stripe payment processing to order endpoints

### Razorpay Integration (India)
1. Sign up at [razorpay.com](https://razorpay.com)
2. Get API keys
3. Install Razorpay SDK
4. Integrate payment flow in order pages

---

## 🚀 Deployment

### Deploy to Vercel (Recommended for React)
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Configure build settings:
   - Framework: Create React App
   - Build Command: `cd frontend && yarn build`
   - Output Directory: `frontend/build`

### Deploy Backend (Node/Express)
1. Deploy to Railway.app, Render.com, or any Node-compatible host
2. Set environment variables (PORT, ALLOWED_ORIGIN, MongoDB URL if used)
3. Update frontend `.env` file with deployed backend URL

---

## 📱 Making It Your Own

### Quick Customization Checklist:

- [ ] Change restaurant name in Navbar and Footer
- [ ] Update all contact information (phone, email, address)
- [ ] Edit menu items and prices
- [ ] Replace all images with your own
- [ ] Update opening hours
- [ ] Change colors in tailwind.config.js (optional)
- [ ] Set up Google Forms for order management
- [ ] Update WhatsApp number
- [ ] Configure Google Maps location
- [ ] Test all booking/order forms
- [ ] Set up payment gateway (if needed)

---

## 🔧 Technical Details

**Tech Stack:**
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB-ready (currently using in-memory demo storage)
- UI Components: Shadcn/ui + Radix UI

**Requirements:**
- Node.js 18+
- MongoDB (only if you replace the demo in-memory store)

**Installation:**
```bash
# Backend (Node.js)
cd backend
npm install
npm run dev   # or: npm start

# Frontend
cd frontend
yarn install
yarn start
```

---

## 📄 License

This template is provided for commercial use. You can:
- Use it for your own restaurant
- Customize and resell to clients
- Modify as needed

---

## 🆘 Support

For customization help or technical issues:
- Email: demo@example.com (Replace with your support email)
- Documentation: Include link to your docs
- Demo: Include link to live demo

---

## 📝 Notes

- Demo backend stores submissions in memory (swap to MongoDB or another DB for production)
- Forms can be connected to Google Sheets for easy management
- Payment integration is optional but recommended
- Mobile responsive design included
- SEO-friendly structure
- Fast loading and lightweight

---

**Built with ❤️ for restaurants everywhere**
