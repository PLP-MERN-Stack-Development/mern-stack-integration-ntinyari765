# MERN Blog — Week 4

This repository contains a simple MERN (MongoDB, Express, React, Node) blog application used for Week 4 assignments. It includes a backend API (Express + Mongoose) and a React frontend (Vite + Tailwind CSS) with a soft lilac theme.

## Repository layout

- `server/` — Express API, Mongoose models, controllers, routes, middleware.
- `client/` — React (Vite) frontend, Tailwind CSS, components and pages.
- `Week4-Assignment.md` — assignment brief.

## Requirements

- Node.js v18+ recommended
- npm (comes with Node)
- MongoDB (local or Atlas)

## Environment

Create `.env` in the `server/` folder with the following variables (or set them in your shell):

```
MONGO_URI=mongodb://localhost:27017/your-db-name
PORT=5000
JWT_SECRET=some_long_secret
```

On the client, you can configure the API base URL with a `.env` file in `client/` (Vite format):

```
VITE_API_URL=http://localhost:5000/api
```

There is a sample `.env.example` in `server/` and `client/` — copy them and fill values.

## Install

Install server dependencies:

```powershell
cd server
npm install
```

Install client dependencies:

```powershell
cd client
npm install
```

## Run (development)

1) Make sure nothing else is using port 5000. On Windows PowerShell you can stop the process with:

```powershell
#$p = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue; if ($p) { Stop-Process -Id $p.OwningProcess -Force; Write-Output "Stopped process $($p.OwningProcess)" } else { Write-Output "No process found on port 5000" }
```

2) Start the backend (from the `server/` folder):

```powershell
cd server
npm run dev
```

3) Start the client (from the `client/` folder) in a second terminal:

```powershell
cd client
npm run dev
```

Open the client URL printed by Vite (usually `http://localhost:5173`) and the frontend will use the API at `VITE_API_URL`.

## Seed data

To pre-populate categories and sample posts, run the seed script (server):

```powershell
cd server
node utils/seed.js
```

This will create a few categories and example posts for local development.

## API Endpoints (major)

- `POST /api/auth/register` — register user (body: username, password)
- `POST /api/auth/login` — login (body: username, password) → returns JWT
- `GET /api/posts` — list posts
- `GET /api/posts/:id` — get single post
- `POST /api/posts` — create post (protected — send Authorization: Bearer <token>)
- `PUT /api/posts/:id` — update post (protected)
- `DELETE /api/posts/:id` — delete post (protected)
- `GET /api/categories` — list categories
- `POST /api/categories` — create category (protected)

All responses are JSON. Errors come back with a consistent JSON shape via the error middleware.

## Frontend notes

- The client uses Tailwind CSS for styling and a small `theme.css` file for CSS tokens (lilac colors, radius, shadow).
- Shared axios instance is in `client/src/services/api.js` and uses `import.meta.env.VITE_API_URL`.

## Troubleshooting

- Port in use: If the server fails to start with `EADDRINUSE :::5000`, stop the process using the port or change `PORT` in `server/.env`.
- MongoDB connection errors: verify your `MONGO_URI` and that MongoDB is reachable (Atlas or local).
- Tailwind/PostCSS errors: ensure packages are installed in `client/` and run `npm run dev` from the `client/` folder.

## Next improvements (suggested)

- Add request validation (Joi/express-validator) for API endpoints.
- Add file uploads (images) with `multer` or Cloudinary.
- Add tests (Jest + Supertest for server, React Testing Library for client).
- Add ESLint/Prettier and GitHub Actions for CI.

## License

This repository is provided for learning and assignment purposes.

---

If you want, I can also add a small CONTRIBUTING.md or a one-line deploy guide (Dockerfile + docker-compose) — tell me which and I’ll add it.
# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 