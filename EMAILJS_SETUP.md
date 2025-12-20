# EmailJS Setup Instructions

## Overview
The forms on this website are configured to send emails to **skater.ryan11@gmail.com** using EmailJS. Follow these steps to set up EmailJS:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Create Email Service
1. In EmailJS Dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account (skater.ryan11@gmail.com)
5. Note the **Service ID** (e.g., `service_farmfinancer`)

## Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** `template_farmfinancer`

**Subject:** `New Contact Form Submission from Farm Financer`

**Content:**
```
New form submission from Farm Financer website:

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
Form Type: {{form_type}}
Loan Type: {{loan_type}}
Property Location: {{property_location}}
Loan Amount: {{loan_amount}}
```

4. Set **To Email** to: `skater.ryan11@gmail.com`
5. Set **From Name** to: `Farm Financer Website`
6. Note the **Template ID** (e.g., `template_farmfinancer`)

## Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (starts with a string of characters)

## Step 5: Update HTML Files
Replace `YOUR_PUBLIC_KEY` in these files with your actual EmailJS Public Key:
- `index.html` (line ~263)
- `contact.html` (line ~208)
- `get-loan/get-started.html` (line ~213)

**Find this code:**
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

**Replace with:**
```javascript
emailjs.init('your-actual-public-key-here');
```

## Step 6: Update Service and Template IDs (if needed)
If your Service ID or Template ID are different, update them in `script.js`:

**Find this code (around line 75):**
```javascript
emailjs.send('service_farmfinancer', 'template_farmfinancer', emailParams)
```

**Replace with your actual IDs:**
```javascript
emailjs.send('your-service-id', 'your-template-id', emailParams)
```

## Testing
1. Fill out the contact form on your website
2. Submit the form
3. Check skater.ryan11@gmail.com inbox for the email
4. If EmailJS isn't configured, the form will fallback to opening your email client with a pre-filled message

## Troubleshooting
- **Emails not sending?** Check browser console for errors
- **Service ID error?** Verify your Service ID matches in script.js
- **Template ID error?** Verify your Template ID matches in script.js
- **Public Key error?** Make sure you've replaced `YOUR_PUBLIC_KEY` in all HTML files

## Fallback
If EmailJS isn't configured, forms will automatically use a `mailto:` link as a fallback, which opens the user's email client with a pre-filled message to skater.ryan11@gmail.com.

