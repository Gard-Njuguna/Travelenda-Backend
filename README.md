# Travelenda Backend

Backend API server for the Travelenda travel platform.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)
- `FIREBASE_PROJECT_ID`: Firebase project ID
- `FIREBASE_PRIVATE_KEY`: Firebase private key
- `FIREBASE_CLIENT_EMAIL`: Firebase client email
- `LITEAPI_KEY`: LiteAPI key for hotels
- `AMADEUS_API_KEY`: Amadeus API key for flights
- `AMADEUS_API_SECRET`: Amadeus API secret
- `OPENWEATHER_API_KEY`: OpenWeatherMap API key

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/hotels/search` - Search hotels
- `GET /api/flights/search` - Search flights
- `GET /api/weather/:city` - Get weather data
- `POST /api/booking/hotel` - Book hotel
- `POST /api/booking/flight` - Book flight
