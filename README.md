# Employee Location Tracker

A React application that displays the live locations of employees on a world map. The application uses PostgreSQL to store employee data and location coordinates.

## Features

- Interactive world map showing employee locations
- Employee list with details
- Ability to generate random locations for demo purposes
- Real-time location updates

## Technologies Used

- **Frontend**: React, react-simple-maps
- **Backend**: Node.js, Express
- **Database**: PostgreSQL

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

## Setup Instructions

### Database Setup

1. Make sure PostgreSQL is running
2. The application will automatically create the necessary tables on first run

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your PostgreSQL connection details:
   ```
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=postgres
   DB_PORT=5432
   PORT=5000
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. From the project root directory, install all dependencies (both client and server):
   ```
   npm run install-all
   ```
   
   This will install dependencies for both the client and server.

2. Start the React application:
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Running Both Frontend and Backend Together

You can now run both the client and server with a single command:

```bash
npm run dev
```

This will start:
- The React client on http://localhost:3000
- The Node.js server on http://localhost:5000

## API Endpoints

- `GET /api/employees` - Get all employees with their latest locations
- `POST /api/employees/:id/location` - Update an employee's location
- `POST /api/employees/random-locations` - Generate random locations for all employees

## Project Structure

- `/src` - React frontend code
- `/server` - Node.js backend code
  - `server.js` - Main server file
  - `.env` - Environment variables

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs both the frontend and backend concurrently in development mode.
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

### `npm start`

Runs only the frontend app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run start-server`

Runs only the backend server in development mode with nodemon for auto-reloading.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Deployment

### Deploying to Vercel

This project is configured for deployment on Vercel. Follow these steps:

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. For production deployment:
   ```
   vercel --prod
   ```

### Environment Variables on Vercel

Make sure to set these environment variables in your Vercel project settings:

- `DB_HOST` - PostgreSQL host
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
- `DB_PORT` - PostgreSQL port (default: 5432)

## License

This project is licensed under the MIT License.
