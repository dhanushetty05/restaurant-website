/**
 * Minimal Express backend to replace the previous Python/FastAPI service.
 * Stores submissions in memory only; swap for a real database if needed.
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const GOOGLE_SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK;

app.use(
  cors({
    origin: ALLOWED_ORIGIN === '*' ? true : ALLOWED_ORIGIN,
  })
);
app.use(express.json());

// Dummy restaurant info (sample/testing only)
const RESTAURANT_INFO = {
  name: 'Urban Plate Demo',
  phone: '+1 (000) 000-0000',
  email: 'demo@example.com',
  address: '000 Demo Street, Sample City, XX 00000',
};

// In-memory storage for demo purposes
const storage = {
  bookings: [],
  preOrders: [],
  deliveryOrders: [],
};

const withMeta = (payload) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  created_at: new Date().toISOString(),
  ...payload,
});

const missingFields = (body, fields) =>
  fields.filter((field) => body[field] === undefined || body[field] === null || body[field] === '');

/**
 * ✅ FIXED: Correct payload + await response
 */
async function sendToGoogleSheets(data, sheetType) {
  if (!GOOGLE_SHEETS_WEBHOOK) {
    console.log('⚠️ Google Sheets webhook not configured');
    return false;
  }

  try {
    const timestamp = new Date().toISOString();
    let values = [];

    if (sheetType === 'Table_Bookings') {
      values = [
        timestamp,
        data.customer_name,
        data.phone,
        data.email || '',
        data.date,
        data.time,
        data.guests,
        data.special_requests || '',
      ];
    }

    if (sheetType === 'Pre_Orders') {
      values = [
        timestamp,
        data.customer_name,
        data.phone,
        data.email || '',
        data.booking_date,
        data.booking_time,
        JSON.stringify(data.items),
        data.total_amount,
        'Pending',
        data.payment_method || 'pay_at_restaurant',
      ];
    }

    if (sheetType === 'Delivery_Orders') {
      values = [
        timestamp,
        data.customer_name,
        data.phone,
        data.email || '',
        data.address,
        JSON.stringify(data.items),
        data.total_amount,
        data.delivery_time || '',
        'Pending',
        data.payment_method || 'cash_on_delivery',
      ];
    }

    const payload = {
      type: sheetType,
      values,
    };

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('Google Sheets response:', result);

    return result.success === true || result.status === 'success';
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    return false;
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'restaurant-backend-node',
    restaurant: RESTAURANT_INFO,
    counts: {
      bookings: storage.bookings.length,
      preOrders: storage.preOrders.length,
      deliveryOrders: storage.deliveryOrders.length,
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * ✅ FIXED: await Google Sheets + correct success response
 */
app.post('/api/bookings', async (req, res) => {
  const required = ['customer_name', 'phone', 'date', 'time', 'guests'];
  const missing = missingFields(req.body, required);

  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  const booking = withMeta({
    customer_name: req.body.customer_name,
    phone: req.body.phone,
    email: req.body.email || '',
    date: req.body.date,
    time: req.body.time,
    guests: Number(req.body.guests) || 0,
    special_requests: req.body.special_requests || '',
    source: 'web-booking',
  });

  storage.bookings.push(booking);

  const saved = await sendToGoogleSheets(booking, 'Table_Bookings');

  if (!saved) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create booking',
    });
  }

  return res.json({ success: true });
});

app.post('/api/pre-orders', async (req, res) => {
  const required = ['customer_name', 'phone', 'booking_date', 'booking_time', 'items'];
  const missing = missingFields(req.body, required);

  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order items are required.',
    });
  }

  const order = withMeta({
    customer_name: req.body.customer_name,
    phone: req.body.phone,
    email: req.body.email || '',
    booking_date: req.body.booking_date,
    booking_time: req.body.booking_time,
    items: req.body.items,
    total_amount: Number(req.body.total_amount) || 0,
    payment_method: req.body.payment_method || 'pay_at_restaurant',
    source: 'web-preorder',
  });

  storage.preOrders.push(order);
  await sendToGoogleSheets(order, 'Pre_Orders');

  return res.json({ success: true });
});

app.post('/api/delivery-orders', async (req, res) => {
  const required = ['customer_name', 'phone', 'address', 'items'];
  const missing = missingFields(req.body, required);

  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order items are required.',
    });
  }

  const order = withMeta({
    customer_name: req.body.customer_name,
    phone: req.body.phone,
    email: req.body.email || '',
    address: req.body.address,
    delivery_time: req.body.delivery_time || '',
    items: req.body.items,
    total_amount: Number(req.body.total_amount) || 0,
    payment_method: req.body.payment_method || 'cash_on_delivery',
    source: 'web-delivery',
  });

  storage.deliveryOrders.push(order);
  await sendToGoogleSheets(order, 'Delivery_Orders');

  return res.json({ success: true });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Node backend running on port ${PORT}`);
});
