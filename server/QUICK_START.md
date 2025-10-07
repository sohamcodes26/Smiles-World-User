# 🚀 Quick Start Guide - Smiles World Backend

## ✅ Setup Complete!

Your backend is now fully configured and running! Here's what has been set up:

## 📦 What's Been Built

### 1. **Configuration Files**
- ✅ `.env` - Environment variables with your MongoDB and Cloudinary credentials
- ✅ `.env.example` - Template for environment variables
- ✅ `.gitignore` - Protects sensitive files from git

### 2. **Database Configuration**
- ✅ MongoDB connection setup
- ✅ Cloudinary configuration for image uploads

### 3. **Models** (Database Schemas)
- ✅ `Testimonial` - For customer testimonials with images
- ✅ `Inquiry` - For contact form submissions
- ✅ `Newsletter` - For email subscriptions

### 4. **Services** (Business Logic)
- ✅ `testimonialService.js` - Handle testimonial operations
- ✅ `inquiryService.js` - Handle inquiry operations
- ✅ `newsletterService.js` - Handle newsletter operations

### 5. **Controllers** (Request Handlers)
- ✅ `testimonialController.js` - Testimonial endpoints
- ✅ `inquiryController.js` - Inquiry endpoints
- ✅ `newsletterController.js` - Newsletter endpoints

### 6. **Routes** (API Endpoints)
- ✅ `POST /api/user/testimonials` - Submit testimonial
- ✅ `GET /api/user/testimonials` - Get approved testimonials
- ✅ `POST /api/user/inquiries` - Submit inquiry
- ✅ `POST /api/user/newsletters` - Subscribe to newsletter
- ✅ `GET /api/user/newsletters/check/:email` - Check subscription
- ✅ `POST /api/user/newsletters/unsubscribe` - Unsubscribe

### 7. **Middleware**
- ✅ File upload handling (Multer)
- ✅ Error handling
- ✅ Request validation
- ✅ CORS configuration

### 8. **Utilities**
- ✅ Cloudinary upload helper
- ✅ Async handler wrapper
- ✅ API response formatter

---

## 🎯 Server Status

Your server is currently **RUNNING** on:
- **URL**: http://localhost:5000
- **Database**: Connected to MongoDB (smilesworld)
- **Cloudinary**: Connected and ready for image uploads

---

## 🧪 Test Your API

### Option 1: Using Browser
Visit: http://localhost:5000

### Option 2: Test Health Endpoint
Visit: http://localhost:5000/api/user/health

### Option 3: Using cURL (PowerShell)

**Test Health Check:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/user/health" -Method Get
```

**Get Testimonials:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/user/testimonials" -Method Get
```

**Submit Newsletter Subscription:**
```powershell
$body = @{
    email = "test@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/user/newsletters" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

**Submit Inquiry:**
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+1234567890"
    subject = "Test Subject"
    message = "This is a test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/user/inquiries" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

---

## 📝 Available Scripts

```bash
# Start server (production)
npm start

# Start server with auto-reload (development)
npm run dev
```

---

## 🔌 Integration with Frontend

To connect your React frontend (client folder) to this backend:

### 1. Update API Base URL in Frontend

In your frontend code, use:
```javascript
const API_BASE_URL = 'http://localhost:5000/api/user';
```

### 2. Example Frontend API Calls

**Submit Testimonial:**
```javascript
const submitTestimonial = async (formData) => {
  const response = await fetch('http://localhost:5000/api/user/testimonials', {
    method: 'POST',
    body: formData, // FormData with name, email, message, rating, image
  });
  const data = await response.json();
  return data;
};
```

**Get Testimonials:**
```javascript
const getTestimonials = async () => {
  const response = await fetch('http://localhost:5000/api/user/testimonials');
  const data = await response.json();
  return data;
};
```

**Submit Inquiry:**
```javascript
const submitInquiry = async (inquiryData) => {
  const response = await fetch('http://localhost:5000/api/user/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inquiryData),
  });
  const data = await response.json();
  return data;
};
```

**Subscribe Newsletter:**
```javascript
const subscribeNewsletter = async (email) => {
  const response = await fetch('http://localhost:5000/api/user/newsletters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return data;
};
```

---

## 📂 Project Structure

```
server/
├── user/
│   ├── config/          # Database & Cloudinary configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Upload, validation, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── .env                 # Environment variables (⚠️ not in git)
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies
├── server.js           # Main application file
├── README.md           # Full documentation
├── API_DOCUMENTATION.md # API endpoints guide
└── QUICK_START.md      # This file
```

---

## 🔒 Security Notes

1. **.env file is protected** - It's in .gitignore and won't be committed to git
2. **CORS is configured** - Currently allows all origins (change in production)
3. **Input validation** - All requests are validated
4. **File upload limits** - Max 5MB for images
5. **Error handling** - Errors are caught and formatted properly

---

## 🐛 Common Issues & Solutions

### Issue: Port 5000 already in use
**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart server
npm start
```

### Issue: MongoDB connection failed
**Solution:**
- Check if MongoDB URI is correct in `.env`
- Verify your IP is whitelisted in MongoDB Atlas
- Check network connection

### Issue: Cloudinary upload fails
**Solution:**
- Verify Cloudinary credentials in `.env`
- Check image size (max 5MB)
- Ensure file format is supported (JPEG, PNG, WebP)

---

## 📚 Documentation Files

1. **README.md** - Complete backend documentation
2. **API_DOCUMENTATION.md** - Detailed API endpoint documentation
3. **QUICK_START.md** - This quick start guide

---

## ✅ Next Steps

1. **Test all endpoints** using the examples above
2. **Connect your frontend** to these APIs
3. **Build admin panel** (admin folder is ready for admin features)
4. **Add more features** as needed

---

## 🎉 You're All Set!

Your backend is fully functional and ready to use. All endpoints are working, database is connected, and image uploads are configured.

**Happy Coding! 🚀**

---

## 📞 Need Help?

If you encounter any issues:
1. Check the terminal logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB and Cloudinary credentials are valid
4. Review the API documentation for endpoint usage

---

**Server Status:** ✅ Running on http://localhost:5000
**Database:** ✅ Connected (smilesworld)
**Cloudinary:** ✅ Connected
**All Systems:** ✅ Operational
