# User Backend Module

This directory contains the complete backend implementation for user-facing (public) API endpoints of the Smiles World travel website.

## 📁 Directory Structure

```
user/
├── controllers/         # Request handlers
│   ├── packagesController.js
│   ├── pagesController.js
│   ├── blogsController.js
│   └── formsController.js
├── middleware/          # Request processing middleware
│   ├── asyncHandler.js
│   ├── errorHandler.js
│   └── validationMiddleware.js
├── routes/             # API route definitions
│   ├── index.js        # Main router
│   ├── packagesRoutes.js
│   ├── pagesRoutes.js
│   ├── blogsRoutes.js
│   ├── podcastsRoutes.js
│   └── formsRoutes.js
├── services/           # Business logic layer
│   ├── packagesService.js
│   ├── pagesService.js
│   ├── blogsService.js
│   └── formsService.js
├── utils/              # Helper utilities
│   ├── responseFormatter.js
│   └── validators.js
└── USER_API_DOCUMENTATION.md
```

## 🏗️ Architecture

The user backend follows a **layered architecture** for clean separation of concerns:

### 1. **Routes Layer** (`routes/`)
- Defines API endpoints and their HTTP methods
- Maps endpoints to controller functions
- Applies middleware (validation, authentication, etc.)
- **Entry Point**: `routes/index.js` aggregates all routes under `/api/user`

### 2. **Controllers Layer** (`controllers/`)
- Handles HTTP requests and responses
- Extracts data from requests
- Calls service layer for business logic
- Formats and sends responses using utility functions
- Uses `asyncHandler` middleware to catch errors

### 3. **Services Layer** (`services/`)
- Contains pure business logic
- Interacts with database models
- Reusable functions independent of HTTP
- Throws operational errors when needed

### 4. **Middleware Layer** (`middleware/`)
- **asyncHandler**: Wraps async functions to catch errors
- **errorHandler**: Global error handling with proper HTTP status codes
- **validationMiddleware**: Request validation (ObjectId, form data)

### 5. **Utils Layer** (`utils/`)
- **responseFormatter**: Consistent API response formatting
- **validators**: Input validation helpers

## 🔌 API Endpoints

All endpoints are prefixed with `/api/user`

### Packages API
- `GET /packages` - Get all packages (with filters)
- `GET /packages/:id` - Get package by ID
- `GET /packages/featured` - Get featured packages
- `GET /packages/women-only` - Get women-only packages
- `GET /packages/group-departure` - Get group departure packages

### Pages API
- `GET /pages/home` - Get home page content
- `GET /pages/about` - Get about page content
- `GET /pages/women-travel` - Get women travel page content
- `GET /pages/group-departures` - Get group departures page content
- `GET /pages/contact` - Get contact page content

### Blogs & Podcasts API
- `GET /blogs` - Get all blog posts
- `GET /blogs/:blogId` - Get single blog post
- `GET /podcasts` - Get all podcasts
- `GET /podcasts/:podcastId` - Get single podcast

### Forms API
- `POST /messages` - Submit contact form message
- `POST /enquiries` - Submit package enquiry

See **[USER_API_DOCUMENTATION.md](./USER_API_DOCUMENTATION.md)** for complete API documentation with examples.

## 🗄️ Database Models Used

This module **reads from** existing models but **does not modify** them:

- `Package` - Travel packages
- `HomeContent` - Home page content
- `AboutContent` - About page content
- `WomenTravelContent` - Women travel page content
- `GroupDepartureContent` - Group departures page content
- `ContactContent` - Contact page content
- `BlogPageContent` - Blogs and podcasts
- `Message` - Contact form submissions (write)
- `Enquiry` - Package enquiries (write)

## 🛡️ Error Handling

Comprehensive error handling at multiple levels:

1. **Validation Errors**: Caught by validation middleware (400)
2. **Not Found Errors**: Custom errors in services (404)
3. **Database Errors**: Mongoose validation errors (400)
4. **Server Errors**: Global error handler (500)

All errors follow a consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Optional array of error details"]
}
```

## ✅ Response Format

All successful responses follow this structure:
```json
{
  "success": true,
  "message": "Description of the action",
  "data": { /* Response data */ }
}
```

## 🔒 Security Features

1. **Input Validation**: All user inputs are validated
2. **Sanitization**: String inputs are trimmed and sanitized
3. **Error Messages**: Non-revealing error messages in production
4. **CORS**: Configured for secure cross-origin requests
5. **Schema Validation**: Mongoose schema validation for data integrity

## 🚀 Usage

The user routes are automatically mounted in `server.js`:

```javascript
const userRoutes = require('./user/routes/index');
app.use('/api/user', userRoutes);
```

### Example API Calls

**Get all international packages:**
```
GET /api/user/packages?tag=international
```

**Get a specific package:**
```
GET /api/user/packages/64abc123def456789
```

**Submit contact form:**
```
POST /api/user/messages
Content-Type: application/json

{
  "fullName": "John Doe",
  "emailAddress": "john@example.com",
  "phoneNumber": "+91-9876543210",
  "subject": "Package Inquiry",
  "message": "I'd like to know more..."
}
```

## 📝 Adding New Endpoints

To add a new endpoint, follow these steps:

1. **Create Service Function** (`services/`)
   ```javascript
   const getNewData = async () => {
     // Business logic here
   };
   ```

2. **Create Controller** (`controllers/`)
   ```javascript
   const getNewData = asyncHandler(async (req, res) => {
     const data = await service.getNewData();
     return successResponse(res, data, 'Success');
   });
   ```

3. **Add Route** (`routes/`)
   ```javascript
   router.get('/new-endpoint', controller.getNewData);
   ```

4. **Update Documentation** (USER_API_DOCUMENTATION.md)

## 🧪 Testing

Test the API using tools like:
- **Postman**: Import the endpoint collection
- **cURL**: Command-line testing
- **Thunder Client**: VS Code extension
- **REST Client**: VS Code extension

Example cURL:
```bash
curl http://localhost:5000/api/user/packages
```

## 🔄 Data Flow

```
Client Request
    ↓
Route Handler
    ↓
Validation Middleware (if applicable)
    ↓
Controller
    ↓
Service (Business Logic)
    ↓
Database Model
    ↓
Service (Format Data)
    ↓
Controller (Format Response)
    ↓
Response to Client
```

## 📚 Dependencies

This module uses the following npm packages:
- `express` - Web framework
- `mongoose` - MongoDB ODM (via existing models)
- Standard Node.js modules

## 🎯 Best Practices

1. **Async/Await**: All async operations use async/await with error handling
2. **Lean Queries**: Database queries use `.lean()` for better performance
3. **Indexing**: Queries leverage MongoDB indexes defined in schemas
4. **Modular Code**: Each module has a single responsibility
5. **Consistent Naming**: Clear, descriptive function and variable names
6. **Error Handling**: Comprehensive error handling at all levels
7. **Documentation**: Code comments and API documentation

## 🐛 Common Issues

### Issue: "Package not found"
**Solution**: Verify the package ID is a valid MongoDB ObjectId

### Issue: "Validation failed"
**Solution**: Check that all required fields are present and properly formatted

### Issue: "Invalid ID format"
**Solution**: Ensure IDs are 24-character hexadecimal strings

## 📞 Support

For questions or issues related to the user backend module, refer to:
- [USER_API_DOCUMENTATION.md](./USER_API_DOCUMENTATION.md) - Complete API reference
- Main project README.md
- Database structure documentation

---

**Note**: This module only implements READ operations for page content and packages, and WRITE operations for messages and enquiries. Admin operations (CREATE, UPDATE, DELETE for packages and pages) are in the `admin/` folder.
