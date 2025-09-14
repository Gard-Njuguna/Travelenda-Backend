const express = require('express');
const axios = require('axios');
const router = express.Router();

// @route   GET api/flights/search
// @desc    Search flights by origin and destination
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { origin, destination, departureDate, returnDate, adults, children, infants } = req.query;
    
    if (!origin || !destination) {
      return res.status(400).json({ message: 'Origin and destination are required' });
    }

    // Check if Amadeus API keys are available
    if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
      console.log('Amadeus API keys not found, using mock data');
      return res.json({
        message: `Flight search results from ${origin} to ${destination}`,
        results: getMockFlights(origin, destination)
      });
    }

    try {
      // First, get access token from Amadeus
      const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.AMADEUS_API_KEY,
          client_secret: process.env.AMADEUS_API_SECRET
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Search for flights
      const flightResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate || new Date().toISOString().split('T')[0],
          returnDate: returnDate,
          adults: adults || 1,
          children: children || 0,
          infants: infants || 0,
          max: 20
        }
      });

      // Transform Amadeus response to our format
      const flights = flightResponse.data.data?.map(offer => {
        const itinerary = offer.itineraries[0];
        const segments = itinerary.segments;
        const firstSegment = segments[0];
        const lastSegment = segments[segments.length - 1];
        
        return {
          id: offer.id,
          airline: firstSegment.carrierCode,
          airlineName: firstSegment.airline?.name || firstSegment.carrierCode,
          origin: firstSegment.departure.iataCode,
          destination: lastSegment.arrival.iataCode,
          departureTime: firstSegment.departure.at,
          arrivalTime: lastSegment.arrival.at,
          duration: itinerary.duration,
          price: offer.price.total,
          currency: offer.price.currency,
          ecoImpact: calculateEcoImpact(segments),
          carbonOffset: true, // We'll add this as a feature
          stops: segments.length - 1,
          segments: segments.map(segment => ({
            departure: segment.departure,
            arrival: segment.arrival,
            carrier: segment.carrierCode,
            flightNumber: segment.number
          }))
        };
      }) || [];

      res.json({
        message: `Found ${flights.length} flights from ${origin} to ${destination}`,
        results: flights
      });

    } catch (apiError) {
      console.error('Amadeus API error:', apiError.response?.data || apiError.message);
      // Fallback to mock data if API fails
      res.json({
        message: `Flight search results from ${origin} to ${destination}`,
        results: getMockFlights(origin, destination)
      });
    }
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ message: 'Error searching for flights' });
  }
});

// Calculate eco impact based on flight segments
function calculateEcoImpact(segments) {
  const totalDistance = segments.reduce((sum, segment) => sum + (segment.distance || 0), 0);
  
  if (totalDistance < 500) return 'low';
  if (totalDistance < 2000) return 'medium';
  return 'high';
}

// Mock data fallback
function getMockFlights(origin, destination) {
  return [
    {
      id: 'flight1',
      airline: 'EcoAir',
      airlineName: 'EcoAir Airlines',
      origin,
      destination,
      departureTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      arrivalTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000).toISOString(),
      duration: 'PT2H30M',
      price: 250,
      currency: 'USD',
      ecoImpact: 'low',
      carbonOffset: true,
      stops: 0
    },
    {
      id: 'flight2',
      airline: 'SkyWays',
      airlineName: 'SkyWays Airlines',
      origin,
      destination,
      departureTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
      arrivalTime: new Date(Date.now() + 25 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
      duration: 'PT3H',
      price: 180,
      currency: 'USD',
      ecoImpact: 'medium',
      carbonOffset: false,
      stops: 1
    },
    {
      id: 'flight3',
      airline: 'GreenJet',
      airlineName: 'GreenJet Airlines',
      origin,
      destination,
      departureTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
      arrivalTime: new Date(Date.now() + 26 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      duration: 'PT2H',
      price: 320,
      currency: 'USD',
      ecoImpact: 'low',
      carbonOffset: true,
      stops: 0
    }
  ];
}

module.exports = router;