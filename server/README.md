# Smiles World Backend API

Backend server for Smiles World application built with Node.js, Express, MongoDB, and Cloudinary.

## 🚀 Features

- **Testimonials Management**: Submit and retrieve customer testimonials with image uploads
- **Inquiry System**: Handle customer inquiries and contact form submissions
- **Newsletter Subscription**: Manage newsletter subscriptions with duplicate prevention
- **Image Upload**: Seamless image uploads to Cloudinary
- **Error Handling**: Comprehensive error handling and validation
- **CORS Enabled**: Cross-origin resource sharing configured

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB account
- Cloudinary account
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values with your actual credentials

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📝 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CORS_ORIGIN=*
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/user
```

### Testimonials

#### Submit a Testimonial
```http
POST /testimonials
Content-Type: multipart/form-data

Body:
- name: string (required)
- email: string (required)
- message: string (required)
- rating: number (required, 1-5)
- image: file (optional, max 5MB)
```

#### Get Approved Testimonials
```http
GET /testimonials?page=1&limit=10
```

### Inquiries

#### Submit an Inquiry
```http
POST /inquiries
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "General Inquiry",
  "message": "Your message here"
}
```

### Newsletters

#### Subscribe to Newsletter
```http
POST /newsletters
Content-Type: application/json

Body:
{
  "email": "user@example.com"
}
```

#### Check Subscription Status
```http
GET /newsletters/check/:email
```

#### Unsubscribe from Newsletter
```http
POST /newsletters/unsubscribe
Content-Type: application/json

Body:
{
  "email": "user@example.com"
}
```

### Health Check
```http
GET /health
```

## 📁 Project Structure

```
server/
├── user/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── cloudinary.js     # Cloudinary configuration
│   ├── controllers/
│   │   ├── testimonialController.js
│   │   ├── inquiryController.js
│   │   └── newsletterController.js
│   ├── middleware/
│   │   ├── upload.js         # Multer file upload
│   │   ├── errorHandler.js   # Error handling
│   │   └── validator.js      # Request validation
│   ├── models/
│   │   ├── Testimonial.js
│   │   ├── Inquiry.js
│   │   └── Newsletter.js
│   ├── routes/
│   │   ├── testimonialRoutes.js
│   │   ├── inquiryRoutes.js
│   │   ├── newsletterRoutes.js
│   │   └── index.js
│   ├── services/
│   │   ├── testimonialService.js
│   │   ├── inquiryService.js
│   │   └── newsletterService.js
│   └── utils/
│       ├── cloudinaryUpload.js
│       ├── asyncHandler.js
│       └── apiResponse.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🗄️ Database Schema

### Testimonial
```javascript
{
  name: String,
  email: String,
  message: String,
  rating: Number (1-5),
  image: {
    url: String,
    publicId: String
  },
  status: String (pending/approved/rejected),
  timestamps: true
}
```

### Inquiry
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String (pending/in-progress/resolved/closed),
  timestamps: true
}
```

### Newsletter
```javascript
{
  email: String (unique),
  subscribedAt: Date,
  isActive: Boolean,
  timestamps: true
}
```

## 🔒 Security Features

- Input validation and sanitization
- File upload restrictions (size, type)
- CORS configuration
- Error message sanitization
- Mongoose schema validation

## 🧪 Testing the API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Your frontend application

### Example curl command:
```bash
# Submit a testimonial
curl -X POST http://localhost:5000/api/user/testimonials \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "message=Great service!" \
  -F "rating=5" \
  -F "image=@/path/to/image.jpg"

# Get testimonials
curl http://localhost:5000/api/user/testimonials
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errors": []
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure MongoDB is running (if using local instance)

### Cloudinary Upload Issues
- Verify your Cloudinary credentials
- Check if the image file size is within limits (5MB)
- Ensure allowed file formats (JPEG, JPG, PNG, WebP)

### Port Already in Use
```bash
# Find and kill the process using port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **cloudinary**: Cloud-based image management
- **multer**: File upload handling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **express-validator**: Request validation
- **streamifier**: Stream conversion utility

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

ISC

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- MongoDB for database
- Cloudinary for image hosting
- Express.js community
