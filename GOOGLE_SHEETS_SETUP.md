# Google Sheets Admin Dashboard Setup Guide

This guide will help you set up Google Sheets as your admin dashboard to receive all bookings and orders from your restaurant website.

---

## Overview

Instead of a complex admin panel, this solution uses **Google Sheets** as your dashboard. All bookings and orders are automatically stored in organized sheets that you can access from anywhere.

---

## Step 1: Create Your Google Sheets

### 1.1 Create a New Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it: **"Urban Plate - Orders & Bookings"** (or your restaurant name)

### 1.2 Create Three Separate Sheets

Inside your spreadsheet, create 3 tabs (sheets):

1. **Table_Bookings**
2. **Pre_Orders**
3. **Delivery_Orders**

---

## Step 2: Set Up Each Sheet

### Sheet 1: Table_Bookings

**Columns (Row 1 headers):**

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Customer Name | Phone | Email | Date | Time | Guests | Special Requests |

### Sheet 2: Pre_Orders

**Columns (Row 1 headers):**

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Customer Name | Phone | Email | Booking Date | Booking Time | Items (JSON) | Total Amount | Payment Status | Payment Method |

### Sheet 3: Delivery_Orders

**Columns (Row 1 headers):**

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Customer Name | Phone | Email | Address | Items (JSON) | Total Amount | Delivery Time | Payment Status | Payment Method |

---

## Step 3: Google Sheets API Integration (Optional - Advanced)

To automatically send data from your website to Google Sheets:

### Option A: Using Google Apps Script (Free)

1. In your Google Sheet, click **Extensions > Apps Script**
2. Delete the default code and paste:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.type;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'Sheet not found' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ✅ DO NOT add timestamp here — backend already handles it
    const row = data.values;

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

```

3. Click **Deploy > New deployment**
4. Choose **Web app**
5. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**
7. Copy the **Web App URL** (you'll need this)

### Option B: Using Zapier (No coding required)

1. Sign up at [Zapier.com](https://zapier.com)
2. Create a new Zap:
   - **Trigger**: Webhooks by Zapier - Catch Hook
   - **Action**: Google Sheets - Create Spreadsheet Row
3. Connect your Google account
4. Map the webhook data to your sheet columns
5. Copy the webhook URL

### Option C: Using Make.com (Visual automation)

1. Sign up at [Make.com](https://make.com)
2. Create a new scenario:
   - **Trigger**: Webhook
   - **Action**: Google Sheets - Add a Row
3. Configure the connections
4. Copy the webhook URL

---

## Step 4: Update Your Website Backend

Once you have your webhook URL (from Apps Script, Zapier, or Make), update the backend to send data:

**File to edit:** `/app/backend/server.py`

Add this function after the imports:

```python
import requests

GOOGLE_SHEETS_WEBHOOK = "YOUR_WEBHOOK_URL_HERE"

async def send_to_google_sheets(data, sheet_type):
    """Send data to Google Sheets via webhook"""
    try:
        data['type'] = sheet_type
        response = requests.post(GOOGLE_SHEETS_WEBHOOK, json=data)
        return response.status_code == 200
    except Exception as e:
        print(f"Error sending to Google Sheets: {e}")
        return False
```

Then update each endpoint to call this function:

```python
# In create_booking endpoint
await send_to_google_sheets(booking_obj.model_dump(), 'Table_Bookings')

# In create_pre_order endpoint
await send_to_google_sheets(order_obj.model_dump(), 'Pre_Orders')

# In create_delivery_order endpoint
await send_to_google_sheets(order_obj.model_dump(), 'Delivery_Orders')
```

---

## Step 5: WhatsApp Notifications Setup

### Option 1: WhatsApp Business API (Official)

1. Sign up for [WhatsApp Business API](https://business.whatsapp.com)
2. Get your API credentials
3. Use a service like Twilio, MessageBird, or 360dialog
4. Add notification code to your backend

### Option 2: Simple WhatsApp Link (Quick Solution)

Update the contact page to redirect to WhatsApp when order is placed:

```javascript
// After successful booking/order
window.open(`https://wa.me/10000000000?text=${encodeURIComponent(
  `New booking from ${customerName} for ${guests} guests on ${date} at ${time}`
)}`, '_blank');
```

Replace `10000000000` with your WhatsApp number (country code + number).

### Option 3: Using Zapier/Make for WhatsApp

1. In your Zapier/Make scenario
2. Add another action: **WhatsApp Business - Send Message**
3. Connect your WhatsApp Business account
4. Configure the message template

---

## Step 6: Email Notifications Setup

### Using Google Sheets Built-in Notifications

1. In your Google Sheet, click **Tools > Notification rules**
2. Select: **When a user submits a form** or **Any changes are made**
3. Choose: **Email - right away**
4. Click **Save**

### Using Apps Script for Custom Emails

Add this to your Apps Script:

```javascript
function sendEmailNotification(data, sheetName) {
  var recipient = "demo@example.com";
  var subject = "New " + sheetName + " - Urban Plate";
  var body = "New order/booking details:\n\n" + JSON.stringify(data, null, 2);
  
  MailApp.sendEmail(recipient, subject, body);
}

// Call this in your doPost function after adding row
sendEmailNotification(data, sheetName);
```

---

## Step 7: Viewing Your Orders

### Access Your Dashboard

1. Open your Google Sheet from any device
2. All new bookings/orders appear automatically
3. You can:
   - Filter by date
   - Sort by customer name
   - Export to PDF/Excel
   - Share with staff (view or edit access)

### Using Google Sheets Mobile App

1. Download Google Sheets app on your phone
2. Open your sheet
3. Get real-time notifications
4. Update order status on the go

---

## Sample Workflows

### Daily Operations

**Morning:**
1. Open Google Sheets
2. Check "Table_Bookings" for today's reservations
3. Check "Pre_Orders" for pre-ordered meals
4. Prepare accordingly

**Throughout the day:**
1. Receive email/WhatsApp notifications for new orders
2. Check "Delivery_Orders" for pending deliveries
3. Update status as you fulfill orders

**End of day:**
1. Review all completed orders
2. Export data for accounting
3. Analyze popular dishes

---

## Tips & Best Practices

1. **Backup Your Data**: Google Sheets auto-saves, but export weekly backups
2. **Color Coding**: Use conditional formatting to highlight:
   - Pending orders (yellow)
   - Completed orders (green)
   - Cancelled orders (red)
3. **Add Notes Column**: For kitchen notes or special handling
4. **Create Charts**: Use Google Sheets charts to visualize:
   - Popular dishes
   - Peak hours
   - Revenue trends
5. **Staff Access**: Share sheet with staff with appropriate permissions
6. **Archive Monthly**: Move old data to separate sheets to keep main sheet fast

---

## Troubleshooting

**Orders not appearing in Sheet?**
- Check webhook URL is correct
- Verify Apps Script is deployed as "Anyone" access
- Check backend logs for errors

**Email notifications not working?**
- Verify email in notification rules
- Check spam folder
- Confirm Apps Script has email permissions

**WhatsApp not sending?**
- Verify phone number format (country code + number)
- Check API credentials
- Test with a simple message first

---

## Advanced: Adding Order Status Tracking

Add a "Status" column to each sheet with dropdown:
- Pending
- Confirmed
- In Progress
- Ready
- Delivered/Completed
- Cancelled

Use conditional formatting to color-code each status.

---

## Need Help?

- [Google Sheets Help Center](https://support.google.com/sheets)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Zapier Support](https://zapier.com/help)

---

**Your restaurant management dashboard is now ready!** 🎉
