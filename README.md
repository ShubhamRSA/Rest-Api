# REST API

A full-stack REST API application with Node.js/Express backend and React frontend.

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Validation**: UUID validation, Foreign key constraints

### Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **Form Handling**: Formik with Zod validation
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors

## 📁 Project Structure

```
rest-api/
├── backend/
│   ├── src/
│   │   ├── car/
│   │   │   ├── controller.js
│   │   │   ├── queries.js
│   │   │   └── routes.js
│   │   └── person/
│   │       ├── controller.js
│   │       ├── queries.js
│   │       └── routes.js
│   ├── db.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── theme/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- PostgreSQL

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file (if needed):
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=rest_api_db
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

3. Start the server:
```bash
npm start
```

Server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Persons
- `GET /api/v1/person` - Get all persons
- `GET /api/v1/person/:id` - Get person by ID
- `POST /api/v1/person` - Create new person
- `PUT /api/v1/person/:id` - Update person
- `DELETE /api/v1/person/:id` - Delete person

### Cars
- `GET /api/v1/car` - Get all cars
- `GET /api/v1/car/:id` - Get car by ID
- `POST /api/v1/car` - Create new car
- `PUT /api/v1/car/:id` - Update car
- `DELETE /api/v1/car/:id` - Delete car

## ✨ Features

- ✅ Full CRUD operations for Persons and Cars
- ✅ Form validation using Formik + Zod
- ✅ Optional email field for persons
- ✅ Car assignment with foreign key validation
- ✅ UUID-based data relationships
- ✅ Redux state management
- ✅ Material-UI responsive design
- ✅ API interceptors for centralized error handling
- ✅ Reusable REST API model with request/response interceptors
- ✅ Auto-refetch after mutations
- ✅ Tooltip on UUID links

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm start      # Start server
npm run dev    # Start with nodemon (hot reload)
```

**Frontend:**
```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run preview # Preview production build
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

MIT License

## 👨‍💻 Author

Shubham
